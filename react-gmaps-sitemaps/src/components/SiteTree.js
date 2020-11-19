import React, { useState, useEffect, useContext } from "react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

// import { faHome } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { parse, stringify } from "flatted";

import AddRework from "./AddRework";
import { MapContext } from "./MapContext";
import { Paper } from "@material-ui/core";

const SiteTree = () => {
  const [
    myMap,
    setMyMap,
    center,
    setCenter,
    isLoaded,
    draw,
    setDraw,
    nodes,
    setNodes,
    activeNode,
    setActiveNode,
    icon,
    setIcon,
    shapes,
    setShapes,
    checked,
    setChecked,
    selected,
    setSelected,
    color,
    setColor,
    findNode,
    removeNode,
    nodeType,
    setNodeType,
  ] = useContext(MapContext);
  const [expanded, setExpanded] = useState([]);
  const [value, setValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [event, setEvent] = useState();

  const onCheck = (checked, targetNode) => {
    console.log("checkedlist", checked);
    setChecked(checked);
    console.log(targetNode);
    if (targetNode.checked === true) {
      console.log("CHECKED");
      setShapes([...shapes, targetNode]);
    } else {
      console.log("UNCHECKED");
      setShapes(shapes.filter((shape) => shape.value !== targetNode.value));
    }
  };

  const onExpand = (expanded) => {
    setExpanded(expanded);
    // console.log(expanded)
  };

  const onClick = (e) => {
    console.log(e);

    if (e.value.slice(-1) === "+" && !draw) {
      setEvent(e);
      setActiveNode(null);
      handleClickOpen();
    }
  };

  const handleClickOpen = () => {
    setModalOpen(true);
  };

  const addItem = (target, isDir, type) => {
    // updateDM()
    let newNode = {
      value: value,
      label: value,
      latLngArr: [],
      apiPath: "",
      parent_id: target.parent.id,
      nodeType: type,
      icon: <i className={`material-icons icon-${color}`}>{icon}</i>,
      color: color,
      isDir: isDir,
    };
    setActiveNode(newNode);
    setValue("");
    if (target.parent.children !== undefined) {
      setNodes(
        nodes.map((item) =>
          item.children === target.parent.children
            ? {
                ...item,
                children: target.parent.children.concat(newNode),
              }
            : item
        )
      );
    } else {
      newNode.parent = null;
      let newNodes = [...nodes];
      newNodes.push(newNode);
      setNodes(newNodes);
    }
  };

  return (
    <Paper>
      <CheckboxTree
        checked={checked}
        expanded={expanded}
        iconsClass="fa5"
        noCascade
        nodes={nodes}
        onCheck={onCheck}
        onExpand={onExpand}
        onClick={onClick}
      ></CheckboxTree>
      <AddRework
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        value={value}
        setValue={setValue}
        // nodeType={nodeType}
        // setNodeType={setNodeType}
        addItem={addItem}
        event={event}
        setEvent={setEvent}
      />
    </Paper>
  );
};

export default SiteTree;
