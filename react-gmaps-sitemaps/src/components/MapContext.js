import { useLoadScript } from "@react-google-maps/api";
import axios from "axios";
import React, {
  createContext,
  useEffect,
  useMemo,
  useState,
  useContext,
} from "react";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { changeIcons, addNode } from "../utils/contextUtils";

const libraries = ["drawing", "places", "directions"];

export const MapContext = createContext();
const mapContext = createContext();
const nodeContext = createContext();
const drawContext = createContext();
const selectedContext = createContext();
const treeContext = createContext();
const profileContext = createContext();
const addEditContext = createContext();
const teamContext = createContext();
// const allContext = createContext();

export const useMapContext = () => {
  const store = useContext(mapContext);

  if (!store) {
    throw new Error("Cannot use `useMapContext` outside of MapProvider");
  }
  return store;
};

export const useNodeContext = () => {
  const store = useContext(nodeContext);

  if (!store) {
    throw new Error("Cannot use `useNodeContext` outside of NodeProvider");
  }
  return store;
};

export const useDrawContext = () => {
  const store = useContext(drawContext);

  if (!store) {
    throw new Error("Cannot use `useDrawContext` outside of DrawProvider");
  }
  return store;
};
export const useTreeContext = () => {
  const store = useContext(treeContext);

  if (!store) {
    throw new Error("Cannot use `useTreeContext` outside of TreeProvider");
  }
  return store;
};
export const useProfileContext = () => {
  const store = useContext(profileContext);

  if (!store) {
    throw new Error(
      "Cannot use `useProfileContext` outside of ProfileProvider"
    );
  }
  return store;
};
export const useAddEditContext = () => {
  const store = useContext(addEditContext);

  if (!store) {
    throw new Error(
      "Cannot use `useAddEditContext` outside of AddEditProvider"
    );
  }
  return store;
};
export const useSelectedContext = () => {
  const store = useContext(selectedContext);

  if (!store) {
    throw new Error(
      "Cannot use `useSelectedContext` outside of SelectedProvider"
    );
  }
  return store;
};
export const useTeamContext = () => {
  const store = useContext(teamContext);

  if (!store) {
    throw new Error("Cannot use `useTeamContext` outside of TeamProvider");
  }
  return store;
};

// export const useAllContext = () => {
//   const store = useContext(
//     mapContext,
//     nodeContext,
//     drawContext,
//     treeContext,
//     profileContext,
//     addEditContext,
//     selectedContext,
//     teamContext
//   );

//   if (!store) {
//     throw new Error("Cannot use `useAllContext` outside of AllProvider");
//   }
//   return store;
// };

const MapStore = () => {
  const [myMap, setMyMap] = useState(null);
  const [center, setCenter] = useState({ lat: 39.9526, lng: -75.1652 });
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  return {
    myMap,
    setMyMap,
    center,
    setCenter,
    isLoaded,
  };
};

const NodeStore = () => {
  const [nodes, setNodes] = useState([]);
  const [activeNode, setActiveNode] = useState(null);
  return {
    nodes,
    setNodes,
    activeNode,
    setActiveNode,
  };
};

const DrawStore = () => {
  const [draw, setDraw] = useState(false);

  return {
    draw,
    setDraw,
  };
};

const TreeStore = () => {
  const [checked, setChecked] = useState([]);
  const [shapes, setShapes] = useState([]);

  return {
    checked,
    setChecked,
    shapes,
    setShapes,
  };
};
const SelectedStore = () => {
  const [selected, setSelected] = useState(null);

  return {
    selected,
    setSelected,
  };
};

const ProfileStore = () => {
  const [profileId, setProfileId] = useState(null);

  return {
    profileId,
    setProfileId,
  };
};

const AddEditStore = () => {
  const [color, setColor] = useState("black");
  const [nodeType, setNodeType] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("search");

  return {
    color,
    setColor,
    nodeType,
    setNodeType,
    editing,
    setEditing,
    editValue,
    setEditValue,
    description,
    setDescription,
    icon,
    setIcon,
  };
};

const TeamStore = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  return { teams, setTeams, selectedTeams, setSelectedTeams };
};

export const MapProvider = (children) => {
  return <mapContext.Provider value={MapStore()} {...children} />;
};
export const NodeProvider = (children) => {
  return <nodeContext.Provider value={NodeStore()} {...children} />;
};
export const DrawProvider = (children) => {
  return <drawContext.Provider value={DrawStore()} {...children} />;
};
export const TreeProvider = (children) => {
  return <treeContext.Provider value={TreeStore()} {...children} />;
};
export const SelectedProvider = (children) => {
  return <selectedContext.Provider value={SelectedStore()} {...children} />;
};
export const AddEditProvider = (children) => {
  return <addEditContext.Provider value={AddEditStore()} {...children} />;
};
export const ProfileProvider = (children) => {
  return <profileContext.Provider value={ProfileStore()} {...children} />;
};
export const TeamProvider = (children) => {
  return <teamContext.Provider value={TeamStore()} {...children} />;
};

// export const AllProvider = (children) => {
//   return (
//     <allContext.Provider
//       value={[
//         MapStore(),
//         NodeStore(),
//         DrawStore(),
//         TreeStore(),
//         SelectedStore(),
//         AddEditStore(),
//         ProfileStore(),
//         TeamStore(),
//       ]}
//       {...children}
//     />
//   );
// };

// export const MapProvider = (props) => {
//   const [myMap, setMyMap] = useState(null); //
//   const [center, setCenter] = useState({ lat: 39.9526, lng: -75.1652 }); //
//   const [nodes, setNodes] = useState([]); //
//   const [activeNode, setActiveNode] = useState(null); //
//   const [draw, setDraw] = useState(false);
//   const [icon, setIcon] = useState("search");
//   const [shapes, setShapes] = useState([]);
//   const [checked, setChecked] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [color, setColor] = useState("black");
//   const [nodeType, setNodeType] = useState(null);
//   const [editing, setEditing] = useState(false);
//   const [editValue, setEditValue] = useState("");
//   const [description, setDescription] = useState("");
//   const [profileId, setProfileId] = useState(null);
//   const [teams, setTeams] = useState([]);
//   const [selectedTeams, setSelectedTeams] = useState([]);
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//     libraries,
//   });

//   useEffect(() => {
//     axios
//       .get(`http://localhost:8000/api/profiles/${profileId}`)
//       .then((res) => {
//         let pteams = res.data.teams;
//         let profileNodes = [];
//         let profileTeams = [];
//         // console.log("DATA", res.data);
//         for (let team of pteams) {
//           profileTeams.push({
//             id: team.id,
//             name: team.name,
//             unique_key: team.unique_key,
//           });
//           for (let node of team.nodes) {
//             profileNodes.push(node);
//           }
//         }
//         setTeams(profileTeams);
//         // this removes duplicate nodes, is basically a set for objects
//         let newNodes = [...new Set(profileNodes.map(JSON.stringify))].map(
//           JSON.parse
//         );
//         // console.log("newNodes", newNodes);
//         changeIcons(newNodes);
//         for (let i = 0; i < newNodes.length; i++) {
//           if (newNodes[i].isDir) {
//             newNodes[i].children.unshift({
//               value: newNodes[i].value + "/+",
//               // label: "Add a new item",
//               apiPath: newNodes[i].value + "/+",
//               latLngArr: ["0", "0"],
//               nodeType: "ADD",
//               icon: (
//                 <i className={`material-icons icon-${"blue"}`}>
//                   {"control_point"}
//                 </i>
//               ),
//               disabled: true,
//             });
//           }
//         }
//         newNodes.unshift(addNode);
//         // console.log("TEAMS", teams);
//         setNodes(newNodes);
//       })
//       .catch((err) => console.log(err));
//   }, [profileId]);

//   const providerValue = useMemo(
//     () => ({
//       myMap,
//       setMyMap,
//       center,
//       setCenter,
//       isLoaded,
//       draw,
//       setDraw,
//       nodes,
//       setNodes,
//       activeNode,
//       setActiveNode,
//       icon,
//       setIcon,
//       shapes,
//       setShapes,
//       checked,
//       setChecked,
//       selected,
//       setSelected,
//       color,
//       setColor,
//       nodeType,
//       setNodeType,
//       // disabled,
//       // setDisabled,
//       editing,
//       setEditing,
//       editValue,
//       setEditValue,
//       changeIcons,
//       description,
//       setDescription,
//       // comment,
//       // setComment,
//       // auth,
//       // setAuth,
//       profileId,
//       setProfileId,
//       teams,
//       setTeams,
//       selectedTeams,
//       setSelectedTeams,
//     }),
//     [
//       myMap,
//       setMyMap,
//       center,
//       setCenter,
//       isLoaded,
//       draw,
//       setDraw,
//       nodes,
//       setNodes,
//       activeNode,
//       setActiveNode,
//       icon,
//       setIcon,
//       shapes,
//       setShapes,
//       checked,
//       setChecked,
//       selected,
//       setSelected,
//       color,
//       setColor,
//       nodeType,
//       setNodeType,
//       // disabled,
//       // setDisabled,
//       editing,
//       setEditing,
//       editValue,
//       setEditValue,
//       description,
//       setDescription,
//       // comment,
//       // setComment,
//       // auth,
//       // setAuth,
//       profileId,
//       setProfileId,
//       teams,
//       setTeams,
//       selectedTeams,
//       setSelectedTeams,
//     ]
//   );

//   return (
//     <MapContext.Provider
//       value={providerValue}
//       // value={[
//       //   myMap,
//       //   setMyMap,
//       //   center,
//       //   setCenter,
//       //   isLoaded,
//       //   draw,
//       //   setDraw,
//       //   nodes,
//       //   setNodes,
//       //   activeNode,
//       //   setActiveNode,
//       //   icon,
//       //   setIcon,
//       //   shapes,
//       //   setShapes,
//       //   checked,
//       //   setChecked,
//       //   selected,
//       //   setSelected,
//       //   color,
//       //   setColor,
//       //   findNode,
//       //   removeNode,
//       //   nodeType,
//       //   setNodeType,
//       //   // disabled,
//       //   // setDisabled,
//       //   editing,
//       //   setEditing,
//       //   editValue,
//       //   setEditValue,
//       //   replaceNode,
//       //   editCleanup,
//       //   changeIcons,
//       //   description,
//       //   setDescription,
//       //   // comment,
//       //   // setComment,
//       //   label,
//       //   setLabel,
//       //   // auth,
//       //   // setAuth,
//       //   profileId,
//       //   setProfileId,
//       //   teams,
//       //   setTeams,
//       //   selectedTeams,
//       //   setSelectedTeams,
//       //   updateNodes,
//       //   picture,
//       //   setPicture,
//       // ]}
//     >
//       {props.children}
//     </MapContext.Provider>
//   );
// };
