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

const TeamViewer = ({ profileId }) => {
  const [myTeams, setMyTeams] = useState([]);
  const [activeTeam, setActiveTeam] = useState("");

  const viewTeam = (e) => {
    setActiveTeam(e.target.value);
    console.log(activeTeam);
  };

  const renderTeam = () => {
    if (activeTeam !== "") {
      return (
        <div>
          <h4>{activeTeam.name}</h4>
          <p>{activeTeam.description}</p>
          <ul style={{ overflow: "auto" }}>
            {"members"}
            {activeTeam.members.map((member) => (
              <li>
                <p>{member.id}</p>
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <></>;
    }
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/profiles/${profileId}/view_teams/`)
      .then((res) => {
        console.log(res.data);
        setMyTeams(res.data);
      })
      .catch((err) => console.log(err));
  }, [profileId]);
  const classes = useStyles();
  return (
    <>
      <FormControl className={classes.formControl}>
        <Select
          labelId="view my teams"
          displayEmpty
          id="my teams"
          value={activeTeam}
          onChange={(e) => viewTeam(e)}
        >
          {myTeams.map((team) => (
            <MenuItem key={team.unique_key} value={team}>
              <ListItemText
                primary={team.name}
                secondary={"#" + team.unique_key}
              />
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>View a team</FormHelperText>
      </FormControl>
      <div>
        {console.log("activeTeam", activeTeam)}
        {renderTeam()}
      </div>
    </>
  );
};
export default TeamViewer;

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
