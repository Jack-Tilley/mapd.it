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
  teamObjects,
  setTeamObjects,
}) => {
  const classes = useStyles();

  // converts ids back to the team object. is slow!
  const getTeams = (ids) => {
    let checkedTeams = [];
    for (let id of ids) {
      checkedTeams.push(teams.find((team) => team.id === id));
    }
    return checkedTeams;
  };

  return (
    <FormControl required className={classes.formControl}>
      <InputLabel id="team-mutiple-checkbox-label">Teams</InputLabel>
      <Select
        labelId="demo-mutiple-checkbox-label"
        id="team-mutiple-checkbox"
        multiple
        value={teamObjects}
        onChange={handleSelectedTeamChange}
        input={<Input />}
        MenuProps={MenuProps}
        renderValue={(checkedTeams) => (
          <List dense>
            {getTeams(checkedTeams).map((checkedTeam) => (
              <ListItemText
                primary={checkedTeam.name}
                key={checkedTeam.unique_key}
              ></ListItemText>
            ))}
          </List>
        )}
      >
        {teams.map((team) => (
          <MenuItem key={team.unique_key} value={team.id}>
            <Checkbox checked={teamObjects.indexOf(team.id) > -1} />
            <ListItemText
              primary={team.name}
              secondary={"#" + team.unique_key}
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default TeamContainer;
