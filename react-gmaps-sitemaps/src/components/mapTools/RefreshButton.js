import { Paper } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import React, { useContext } from "react";
import { MapContext } from "../MapContext";

let addNode = {
  value: "/+",
  label: "+",
  parent: null,
  apiPath: "HI/there",
  latLngArr: ["0", "0"],
  nodeType: "ADD",
  icon: <i className={`material-icons icon-${"blue"}`}>{"add"}</i>,
  disabled: true,
};

const RefreshButton = () => {
  // const [
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
  //   disabled,
  //   setDisabled,
  //   editing,
  //   setEditing,
  //   editValue,
  //   setEditValue,
  //   replaceNode,
  //   editCleanup,
  //   changeIcons,
  //   description,
  //   setDescription,
  //   comment,
  //   setComment,
  //   label,
  //   setLabel,
  //   auth,
  //   setAuth,
  //   profileId,
  //   setProfileId,
  //   teams,
  //   setTeams,
  //   selectedTeams,
  //   setSelectedTeams,
  //   updateNodes,
  // ] = useContext(MapContext);
  const { updateNodes } = useContext(MapContext);

  const handleRefresh = () => {
    updateNodes();
  };
  return (
    <div style={{ position: "absolute", left: "19.5em", top: "3em" }}>
      <Paper>
        <IconButton onClick={() => handleRefresh()} size="small">
          <i className="material-icons icon-grey">{"refresh"}</i>
        </IconButton>
      </Paper>
    </div>
  );
};
export default RefreshButton;
