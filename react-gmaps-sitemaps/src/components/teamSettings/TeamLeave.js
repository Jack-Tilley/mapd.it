import React, { useState, useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import clsx from "clsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";

import InputAdornment from "@material-ui/core/InputAdornment";

import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
    maxHeight: 100,
    overflow: "auto",
  },
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const TeamLeave = ({
  teams,
  leaveTeamId,
  setLeaveTeamId,
  profileId,
  updateNodes,
}) => {
  const classes = useStyles();

  const handleChange = (event) => {
    setLeaveTeamId(event.target.value);
  };

  const handleLeaveTeam = () => {
    if (
      leaveTeamId !== "" &&
      leaveTeamId !== null &&
      leaveTeamId !== undefined
    ) {
      axios
        .put(`http://localhost:8000/api/profiles/${profileId}/leave_team/`, {
          id: leaveTeamId,
        })
        .then((res) => {
          console.log(res.data);
          updateNodes();
          setLeaveTeamId("");
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <FormControl>
      <Select
        labelId="leave team"
        displayEmpty
        id="leaveteam"
        value={leaveTeamId}
        onChange={(e) => handleChange(e)}
      >
        <MenuItem key={"N/A"} value="">
          <em>NONE</em>
        </MenuItem>
        {teams.map((team) => (
          <MenuItem key={team.unique_key} value={team.id}>
            <ListItemText
              primary={team.name}
              secondary={"#" + team.unique_key}
            />
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Leave a team</FormHelperText>
      <IconButton onClick={() => handleLeaveTeam()} size="small">
        <i className="material-icons icon-red">{"delete"}</i>
      </IconButton>
    </FormControl>
  );
};
export default TeamLeave;

// const [
//     myMap,
//     setMyMap,
//     center,
//     setCenter,
//     isLoaded,
//     draw,
//     setDraw,
//     nodes,
//     setNodes,
//     activeNode,
//     setActiveNode,
//     icon,
//     setIcon,
//     shapes,
//     setShapes,
//     checked,
//     setChecked,
//     selected,
//     setSelected,
//     color,
//     setColor,
//     findNode,
//     removeNode,
//     nodeType,
//     setNodeType,
//     disabled,
//     setDisabled,
//     editing,
//     setEditing,
//     editValue,
//     setEditValue,
//     replaceNode,
//     editCleanup,
//     changeIcons,
//     description,
//     setDescription,
//     comment,
//     setComment,
//     label,
//     setLabel,
//     auth,
//     setAuth,
//     profileId,
//     setProfileId,
//     teams,
//     setTeams,
//     selectedTeams,
//     setSelectedTeams,
//   ] = useContext(MapContext);
