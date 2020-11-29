import React, { useState, useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { Paper } from "@material-ui/core";

import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import MenuItem from "@material-ui/core/MenuItem";

import IconButton from "@material-ui/core/IconButton";

import InputAdornment from "@material-ui/core/InputAdornment";

import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Switch from "@material-ui/core/Switch";
import axios from "axios";

const TeamJoin = ({ teams, joinTeam, setJoinTeam, profileId, updateNodes }) => {
  const handleJoinTeam = () => {
    console.log(joinTeam);
    const alreadyInTeam = teams.some((team) => team.unique_key === joinTeam);
    if (!alreadyInTeam && joinTeam !== "" && joinTeam.length === 5) {
      axios
        .put(`http://localhost:8000/api/profiles/${profileId}/join_team/`, {
          unique_key: joinTeam,
        })
        .then((result) => {
          console.log("PUT RESULT for JOIN", result.data);
          updateNodes();
          setJoinTeam("");
        })
        .catch((err) => console.log(err));
    } else {
      console.log("ENTER A VALID TEAM NAME OR ALREADY IN TEAM");
    }
  };
  return (
    <FormControl>
      <TextField
        value={joinTeam}
        margin="dense"
        placeholder="Enter a unique key"
        id="teamjoin"
        label="Join a team"
        type="text"
        onChange={(e) => setJoinTeam(e.target.value)}
        fullWidth
      />
      <FormHelperText>Join a team</FormHelperText>
      <IconButton onClick={() => handleJoinTeam()} size="small">
        <i className="material-icons icon-red">{"add"}</i>
      </IconButton>
    </FormControl>
  );
};
export default TeamJoin;
