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
  latLngArr: ["40"],
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
              latLngArr: [["40", "-70"]],
              nodeType: "ADD",
              icon: <Add />,
              disabled: true,
            });
          }
        }
        res.data.unshift(addNode);

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
      ]}
    >
      {props.children}
    </MapContext.Provider>
  );
};
