import React, { useState, useCallback, createContext, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";
import axios from "axios";
import { parse, stringify } from "flatted";
import { useHistory } from "react-router-dom";

import "react-checkbox-tree/lib/react-checkbox-tree.css";

import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BusinessCenter, Add } from "@material-ui/icons";

let addNode = {
  value: "/+",
  label: "Add a new item",
  parent: null,
  apiPath: "HI/there",
  latLngArr: ["0", "0"],
  nodeType: "ADD",
  icon: <i className={`material-icons icon-${"blue"}`}>{"add"}</i>,
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
  // const [shapes, setShapes] = useState(
  //   JSON.parse(localStorage.getItem("shapes")) || []
  // );
  // const [checked, setChecked] = useState(
  //   JSON.parse(localStorage.getItem("checked")) || []
  // );
  const [selected, setSelected] = useState(null);
  const [color, setColor] = useState("black");
  const [nodeType, setNodeType] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [label, setLabel] = useState("");
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: false,
    user: null,
  });
  const [profileId, setProfileId] = useState(null);
  const [teams, setTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // useEffect(() => {
  //   console.log("checked added to localStorage", checked);
  //   localStorage.setItem("checked", JSON.stringify(checked));
  // }, [checked]);
  // useEffect(() => {
  //   console.log("shapes added to localStorage", shapes);
  //   localStorage.setItem("shapes", JSON.stringify(shapes));
  // }, [shapes]);

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
        label: "Add a new item",
        apiPath: newNode.value + "/+",
        latLngArr: ["0", "0"],
        nodeType: "ADD",
        icon: <i className={`material-icons icon-${"blue"}`}>{"add"}</i>,
        disabled: true,
      });
    }
    return newNode;
  };

  const replaceNode = (nodeId, updatedNode) => {
    let newNodes = [...nodes];
    for (let i = 0; i < newNodes.length; i++) {
      if (newNodes[i].id === nodeId) {
        newNodes[i] = changeNodeIcons(updatedNode);
        return newNodes;
      }
    }
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
    setDescription("");
    setNodeType(null);
    setEditValue("");
  };

  const updateNodes = () => {
    axios
      .get(`http://localhost:8000/api/profiles/${profileId}`)
      .then((res) => {
        let pteams = res.data.teams;
        let profileNodes = [];
        let profileTeams = [];
        console.log("DATA", res.data);
        for (let team of pteams) {
          profileTeams.push({
            id: team.id,
            name: team.name,
            unique_key: team.unique_key,
          });
          for (let node of team.nodes) {
            profileNodes.push(node);
          }
        }
        setTeams(profileTeams);
        // this removes duplicate nodes, is basically a set for objects
        let newNodes = [...new Set(profileNodes.map(JSON.stringify))].map(
          JSON.parse
        );
        console.log("newNodes", newNodes);
        changeIcons(newNodes);
        for (let i = 0; i < newNodes.length; i++) {
          if (newNodes[i].isDir) {
            newNodes[i].children.unshift({
              value: newNodes[i].value + "/+",
              label: "Add a new item",
              apiPath: newNodes[i].value + "/+",
              latLngArr: ["0", "0"],
              nodeType: "ADD",
              icon: <i className={`material-icons icon-${"blue"}`}>{"add"}</i>,
              disabled: true,
            });
          }
        }
        newNodes.unshift(addNode);

        setNodes(newNodes);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/profiles/${profileId}`)
      .then((res) => {
        let pteams = res.data.teams;
        let profileNodes = [];
        let profileTeams = [];
        console.log("DATA", res.data);
        for (let team of pteams) {
          profileTeams.push({
            id: team.id,
            name: team.name,
            unique_key: team.unique_key,
          });
          for (let node of team.nodes) {
            profileNodes.push(node);
          }
        }
        setTeams(profileTeams);
        // this removes duplicate nodes, is basically a set for objects
        let newNodes = [...new Set(profileNodes.map(JSON.stringify))].map(
          JSON.parse
        );
        console.log("newNodes", newNodes);
        changeIcons(newNodes);
        for (let i = 0; i < newNodes.length; i++) {
          if (newNodes[i].isDir) {
            newNodes[i].children.unshift({
              value: newNodes[i].value + "/+",
              label: "Add a new item",
              apiPath: newNodes[i].value + "/+",
              latLngArr: ["0", "0"],
              nodeType: "ADD",
              icon: <i className={`material-icons icon-${"blue"}`}>{"add"}</i>,
              disabled: true,
            });
          }
        }
        newNodes.unshift(addNode);
        console.log("TEAMS", teams);
        setNodes(newNodes);
      })
      .catch((err) => console.log(err));
  }, [profileId]);

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
        description,
        setDescription,
        comment,
        setComment,
        label,
        setLabel,
        auth,
        setAuth,
        profileId,
        setProfileId,
        teams,
        setTeams,
        selectedTeams,
        setSelectedTeams,
        updateNodes,
      ]}
    >
      {props.children}
    </MapContext.Provider>
  );
};
