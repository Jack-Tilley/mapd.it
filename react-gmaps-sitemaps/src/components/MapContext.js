import React, { useState, useCallback, createContext, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";
import axios from "axios";

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
  const [shapes, setShapes] = useState([]);
  const [checked, setChecked] = useState([]);
  const [selected, setSelected] = useState(null);
  const [color, setColor] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
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
  // return nodes;

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
      ]}
    >
      {props.children}
    </MapContext.Provider>
  );
};
