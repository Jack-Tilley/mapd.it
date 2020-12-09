import React, { useState, useEffect, useContext } from "react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { v4 as uuidv4 } from "uuid";

// import { faHome } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AddNodeModal from "./AddNodeModal";
import { MapContext } from "./MapContext";
import { Paper } from "@material-ui/core";
import ModalDesignRework from "./ModalDesignRework";

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
    disabled,
    setDisabled,
    editing,
    setEditing,
    editValue,
    setEditValue,
    replaceNode,
    editCleanup,
    changeIcons,
    description,
    setDescription,
    comment,
    setComment,
    la,
    setLa,
  ] = useContext(MapContext);
  const [expanded, setExpanded] = useState([]);
  const [label, setLabel] = useState("");
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
    } else if (!draw) {
      let node = findNode(e.value);
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
      apiPath: "",
      parent: target.parent,
      parent_id: target.parent.id,
      nodeType: type,
      icon: <i className={`material-icons icon-${color}`}>{icon}</i>,
      color: color,
      isDir: isDir,
      description: description,
    };
    if (
      isDir &&
      (newNode.parent === null ||
        newNode.parent === undefined ||
        Object.keys(newNode.parent).length === 0)
    ) {
      newNode.children = [
        {
          value: newNode.value + "/+",
          label: "Add a new item",
          apiPath: newNode.label + "/+",
          latLngArr: ["0", "0"],
          nodeType: "ADD",
          icon: <i className={`material-icons icon-${"blue"}`}>{"add"}</i>,
          disabled: true,
        },
      ];
    }
    setActiveNode(newNode);
    setLabel("");
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
