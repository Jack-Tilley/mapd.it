import React, { useState, useEffect, useContext } from "react";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import IconButton from "@material-ui/core/IconButton";
import { Paper } from "@material-ui/core";
import { MapContext } from "./MapContext";

import axios from "axios";
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
  ] = useContext(MapContext);

  const handleRefresh = () => {
    updateNodes();
  };
  return (
    <div style={{ position: "absolute", right: "1em", bottom: "1.5em" }}>
      <Paper>
        <IconButton onClick={() => handleRefresh()} size="small">
          <i className="material-icons icon-grey">{"refresh"}</i>
        </IconButton>
      </Paper>
    </div>
  );
};
export default RefreshButton;
