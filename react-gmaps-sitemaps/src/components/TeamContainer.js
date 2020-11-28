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

import InputAdornment from "@material-ui/core/InputAdornment";

import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

import IconContainer from "./IconContainer";
import ColorContainer from "./ColorContainer";
import DirContainer from "./DirContainer";

import { MapContext } from "./MapContext";

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
const TeamContainer = ({
  teams,
  selectedTeams,
  setSelectedTeams,
  handleSelectedTeamChange,
  teamName,
  setTeamName,
}) => {
  const classes = useStyles();
  //   const teamVals = teams.map((team) => team.teamName);

  const handleChange = (event) => {
    setTeamName(event.target.value);
    console.log(selectedTeams);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-mutiple-checkbox-label">Teams</InputLabel>
      <Select
        labelId="demo-mutiple-checkbox-label"
        id="demo-mutiple-checkbox"
        multiple
        value={teamName}
        onChange={handleChange}
        input={<Input />}
        MenuProps={MenuProps}
        renderValue={(checkedTeams) => (
          <List dense>
            {checkedTeams.map((checkedTeam) => (
              <ListItemText primary={checkedTeam} key={checkedTeam} />
            ))}
          </List>
        )}
      >
        {teams.map((team) => (
          <MenuItem key={team.teamId} value={team.teamId}>
            <Checkbox checked={teamName.indexOf(team.teamId) > -1} />
            <ListItemText primary={team.teamId} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default TeamContainer;
