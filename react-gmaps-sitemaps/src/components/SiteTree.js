import { Paper } from "@material-ui/core";
import React, { useContext, useState } from "react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { v4 as uuidv4 } from "uuid";
// import { faHome } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MapContext } from "./MapContext";
import { findNode } from "../utils/contextUtils";
import ModalDesignRework from "./ModalDesignRework";

const SiteTree = () => {
  const {
    checked,
    setChecked,
    shapes,
    setShapes,
    draw,
    setActiveNode,
    color,
    description,
    setCenter,
    nodes,
    icon,
  } = useContext(MapContext);
  const [expanded, setExpanded] = useState([]);
  const [label, setLabel] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [event, setEvent] = useState();

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
      <ModalDesignRework
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        label={label}
        setLabel={setLabel}
        addItem={addItem}
        event={event}
        setEvent={setEvent}
      />
    </Paper>
  );
};

export default SiteTree;
