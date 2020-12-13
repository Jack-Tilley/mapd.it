import { useLoadScript } from "@react-google-maps/api";
import axios from "axios";
import React, { createContext, useEffect, useMemo, useState } from "react";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { changeIcons, addNode } from "../utils/contextUtils";

// let addNode = {
//   value: "/+",
//   // label: "Add a new item",
//   parent: null,
//   apiPath: "HI/there",
//   latLngArr: ["0", "0"],
//   nodeType: "ADD",
//   icon: <i className={`material-icons icon-${"blue"}`}>{"control_point"}</i>,
//   disabled: true,
// };

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
  const [color, setColor] = useState("black");
  const [nodeType, setNodeType] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [description, setDescription] = useState("");
  const [profileId, setProfileId] = useState(null);
  const [teams, setTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/profiles/${profileId}`)
      .then((res) => {
        let pteams = res.data.teams;
        let profileNodes = [];
        let profileTeams = [];
        // console.log("DATA", res.data);
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
        // console.log("newNodes", newNodes);
        changeIcons(newNodes);
        for (let i = 0; i < newNodes.length; i++) {
          if (newNodes[i].isDir) {
            newNodes[i].children.unshift({
              value: newNodes[i].value + "/+",
              // label: "Add a new item",
              apiPath: newNodes[i].value + "/+",
              latLngArr: ["0", "0"],
              nodeType: "ADD",
              icon: (
                <i className={`material-icons icon-${"blue"}`}>
                  {"control_point"}
                </i>
              ),
              disabled: true,
            });
          }
        }
        newNodes.unshift(addNode);
        // console.log("TEAMS", teams);
        setNodes(newNodes);
      })
      .catch((err) => console.log(err));
  }, [profileId]);

  const providerValue = useMemo(
    () => ({
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
      nodeType,
      setNodeType,
      // disabled,
      // setDisabled,
      editing,
      setEditing,
      editValue,
      setEditValue,
      changeIcons,
      description,
      setDescription,
      // comment,
      // setComment,
      // auth,
      // setAuth,
      profileId,
      setProfileId,
      teams,
      setTeams,
      selectedTeams,
      setSelectedTeams,
    }),
    [
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
      nodeType,
      setNodeType,
      // disabled,
      // setDisabled,
      editing,
      setEditing,
      editValue,
      setEditValue,
      description,
      setDescription,
      // comment,
      // setComment,
      // auth,
      // setAuth,
      profileId,
      setProfileId,
      teams,
      setTeams,
      selectedTeams,
      setSelectedTeams,
    ]
  );

  return (
    <MapContext.Provider
      value={providerValue}
      // value={[
      //   myMap,
      //   setMyMap,
      //   center,
      //   setCenter,
      //   isLoaded,
      //   draw,
      //   setDraw,
      //   nodes,
      //   setNodes,
      //   activeNode,
      //   setActiveNode,
      //   icon,
      //   setIcon,
      //   shapes,
      //   setShapes,
      //   checked,
      //   setChecked,
      //   selected,
      //   setSelected,
      //   color,
      //   setColor,
      //   findNode,
      //   removeNode,
      //   nodeType,
      //   setNodeType,
      //   // disabled,
      //   // setDisabled,
      //   editing,
      //   setEditing,
      //   editValue,
      //   setEditValue,
      //   replaceNode,
      //   editCleanup,
      //   changeIcons,
      //   description,
      //   setDescription,
      //   // comment,
      //   // setComment,
      //   label,
      //   setLabel,
      //   // auth,
      //   // setAuth,
      //   profileId,
      //   setProfileId,
      //   teams,
      //   setTeams,
      //   selectedTeams,
      //   setSelectedTeams,
      //   updateNodes,
      //   picture,
      //   setPicture,
      // ]}
    >
      {props.children}
    </MapContext.Provider>
  );
};
