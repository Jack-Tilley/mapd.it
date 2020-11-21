import React, { useState, useCallback, createContext, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";
import axios from "axios";
import { parse, stringify } from "flatted";

import "react-checkbox-tree/lib/react-checkbox-tree.css";

import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BusinessCenter, Add } from "@material-ui/icons";

let addNode = {
  value: "/+",
  label: "+",
  parent: null,
  apiPath: "HI/there",
  latLngArr: ["0", "0"],
  nodeType: "ADD",
  icon: <Add />,
  disabled: true,
};

const libraries = ["drawing", "places", "directions"];

export const MapContext = createContext();

export const MapProvider = (props) => {
  const [myMap, setMyMap] = useState(null);
  const [center, setCenter] = useState({ lat: 39.9526, lng: -75.1652 });
  const [nodes, setNodes] = useState([]);
  const [activeNode, setActiveNode] = useState(null);
  const [draw, setDraw] = useState(false);
  const [icon, setIcon] = useState("search");
  const [shapes, setShapes] = useState(
    JSON.parse(localStorage.getItem("shapes")) || []
  );
  const [checked, setChecked] = useState(
    JSON.parse(localStorage.getItem("checked")) || []
  );
  const [selected, setSelected] = useState(null);
  const [color, setColor] = useState("black");
  const [nodeType, setNodeType] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState("");

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    console.log("checked added to localStorage", checked);
    localStorage.setItem("checked", JSON.stringify(checked));
  }, [checked]);
  useEffect(() => {
    console.log("shapes added to localStorage", shapes);
    localStorage.setItem("shapes", JSON.stringify(shapes));
  }, [shapes]);

  const updateAddButton = (parentVal, parentPath) => {
    addNode.value = parentVal + addNode.value;
    addNode.apiPath = parentPath.value + "/+";
    return addNode;
  };
  const changeIcons = (nodes) => {
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].icon = (
        <i className={`material-icons icon-${nodes[i].color}`}>
          {nodes[i].iconValue}
        </i>
      );
      for (let j = 0; j < nodes[i].children.length; j++) {
        nodes[i].children[j].icon = (
          <i className={`material-icons icon-${nodes[i].children[j].color}`}>
            {nodes[i].children[j].iconValue}
          </i>
        );
      }
    }
  };

  const findNode = (nodeValue) => {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].value === nodeValue) {
        return nodes[i];
      }
      if (nodes[i].children !== undefined) {
        for (let j = 0; j < nodes[i].children.length; j++) {
          if (nodes[i].children && nodes[i].children[j].value === nodeValue) {
            return nodes[i].children[j];
          }
        }
      }
    }
    return null;
  };

  const changeNodeIcons = (node) => {
    console.log("NODEINPROGRESS", node);
    let newNode = node;
    newNode.icon = (
      <i className={`material-icons icon-${node.color}`}>{node.iconValue}</i>
    );
    if (newNode.isDir && newNode.parent === null) {
      for (let i = 0; i < newNode.children.length; i++) {
        let child = newNode.children[i];
        child.icon = (
          <i className={`material-icons icon-${child.color}`}>
            {child.iconValue}
          </i>
        );
        newNode.children[i] = child;
      }
      newNode.children.unshift({
        value: newNode.value + "/+",
        label: "+",
        apiPath: newNode.value + "/+",
        latLngArr: ["0", "0"],
        nodeType: "ADD",
        icon: <Add />,
        disabled: true,
      });
    }

    return newNode;
  };

  const replaceNode = (nodeId, updatedNode) => {
    let newNodes = [...nodes];
    console.log("NODES AT THIS POINT", newNodes);
    for (let i = 0; i < newNodes.length; i++) {
      if (newNodes[i].id === nodeId) {
        // newNodes[i] = updatedNode;
        newNodes[i] = changeNodeIcons(updatedNode);
        // newNodes[i] = changeNodeIcons(updatedNode);
        // newNodes[i].icon = (
        //   <i className={`material-icons icon-${updatedNode.color}`}>
        //     {updatedNode.iconValue}
        //   </i>
        // );
        console.log("newNodes[i]", newNodes[i]);
        return newNodes;
      }
    }
    //   if (nodes[i].children !== undefined) {
    //     for (let j = 0; j < newNodes[i].children.length; j++) {
    //       if (newNodes[i].children && newNodes[i].children[j].id === nodeId) {
    //         let newNode = newNodes[i];
    //         let children = newNodes[i].children;
    //         children[j] = updatedNode;
    //         children[j].icon = (
    //           <i className={`material-icons icon-${children[j].color}`}>
    //             {children[j].iconValue}
    //           </i>
    //         );
    //         newNode.children = children;
    //         newNodes[i] = newNode;

    //         return newNodes;
    //       }
    //     }
    //   }
    // }
    // return newNodes;
  };

  const removeNode = (nodeValue) => {
    let newNodes = [...nodes];
    for (let i = 0; i < newNodes.length; i++) {
      if (newNodes[i].children !== undefined) {
        newNodes[i].children = newNodes[i].children.filter(
          (child) => child.value !== nodeValue
        );
      }
    }
    return newNodes.filter((node) => node.value !== nodeValue);
  };

  const editCleanup = (data) => {
    let newChecked = checked.filter((node) => node !== selected.value);
    newChecked.push(data.value);
    setChecked(newChecked);
    let newShapes = shapes.filter((node) => node.value !== selected.value);
    newShapes.push(data);
    setShapes(newShapes);
    setSelected(null);
    setIcon("search");
    setColor("black");
    setNodeType(null);
    setEditValue("");
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/nodes/")
      .then((res) => {
        changeIcons(res.data);
        console.log(res.data);
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].isDir) {
            res.data[i].children.unshift({
              value: res.data[i].value + "/+",
              label: "+",
              apiPath: res.data[i].value + "/+",
              latLngArr: ["0", "0"],
              nodeType: "ADD",
              icon: <Add />,
              disabled: true,
            });
          }
        }
        res.data.unshift(addNode);
        console.log("initial Nodes", res.data);

        setNodes(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <MapContext.Provider
      value={[
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
      ]}
    >
      {props.children}
    </MapContext.Provider>
  );
};
