import { Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { v4 as uuidv4 } from "uuid";
import { updateNodes } from "../utils/contextUtils";
import {
  useTreeContext,
  useDrawContext,
  useNodeContext,
  useAddEditContext,
  useMapContext,
  useTeamContext,
  useProfileContext,
} from "./MapContext";
import { findNode } from "../utils/contextUtils";
import AddNodeModal from "./AddNodeModal";

const SiteTree = () => {
  const { checked, setChecked, shapes, setShapes } = useTreeContext();
  const { draw } = useDrawContext();
  const { nodes, setNodes, setActiveNode } = useNodeContext();
  const { setTeams } = useTeamContext();
  const { profileId } = useProfileContext();
  const { color, description, icon } = useAddEditContext();
  const { setCenter } = useMapContext();
  useEffect(() => {
    updateNodes(profileId, setNodes, setTeams);
  }, [profileId, setTeams]);
  // const {
  //   checked,
  //   setChecked,
  //   shapes,
  //   setShapes,
  //   draw,
  //   setActiveNode,
  //   color,
  //   description,
  //   setCenter,
  //   nodes,
  //   icon,
  // } = useContext(MapContext);
  const [expanded, setExpanded] = useState([]);
  const [label, setLabel] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [event, setEvent] = useState();
  const [isParent, setIsParent] = useState(true);

  const onCheck = (checked, targetNode) => {
    // console.log("checkedlist", checked);
    setChecked(checked);
    // console.log(targetNode);
    if (targetNode.checked === true) {
      // console.log("CHECKED");
      setShapes([...shapes, targetNode]);
    } else {
      // console.log("UNCHECKED");
      setShapes(shapes.filter((shape) => shape.value !== targetNode.value));
    }
  };

  const onExpand = (expanded) => {
    setExpanded(expanded);
    // console.log(expanded)
  };

  const onClick = (e) => {
    // console.log(e);

    if (e.value.slice(-1) === "+" && !draw) {
      setEvent(e);
      setIsParent(e.value.slice(-2) === "0+");
      setActiveNode(null);
      handleClickOpen();
    } else if (!draw) {
      let node = findNode(e.value, nodes);
      setCenter({
        lat: parseFloat(node.latLngArr[0]),
        lng: parseFloat(node.latLngArr[1]),
      });
    }
  };

  const handleClickOpen = () => {
    setModalOpen(true);
  };

  const addItem = (target, isDir, type) => {
    // updateDM()
    let newNode = {
      value: uuidv4(),
      label: label,
      latLngArr: [],
      parent: target.parent,
      parent_id: target.parent.id,
      nodeType: type,
      icon: <i className={`material-icons icon-${color}`}>{icon}</i>,
      color: color,
      isDir: isDir,
      description: description,
    };
    setActiveNode(newNode);
    setLabel("");
  };

  return (
    <Paper>
      <CheckboxTree
        style={{ wordWrap: "break-word" }}
        checked={checked}
        expanded={expanded}
        iconsClass="fa5"
        noCascade
        nodes={nodes}
        onCheck={onCheck}
        onExpand={onExpand}
        onClick={onClick}
      ></CheckboxTree>
      <AddNodeModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        label={label}
        setLabel={setLabel}
        addItem={addItem}
        event={event}
        setEvent={setEvent}
        isParent={isParent}
        setIsParent={setIsParent}
      />
    </Paper>
  );
};

export default SiteTree;
