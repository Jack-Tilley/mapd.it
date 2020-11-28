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

const TeamCreate = ({ newTeam, setNewTeam, profileId, updateNodes }) => {
  const handleCreateTeam = () => {
    console.log(newTeam);
    if (newTeam !== "") {
      axios
        .post("http://localhost:8000/api/teams/", {
          name: newTeam,
          description: "",
        })
        .then((res) => {
          console.log("NEWTEAM", res.data);
          if (res.data.name === newTeam) {
            axios
              .put(
                `http://localhost:8000/api/profiles/${profileId}/join_team/`,
                res.data
              )
              .then((result) => {
                console.log("PUT RESULT", result.data);
                updateNodes();
                setNewTeam("");
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.log("ENTER A VALID TEAM NAME");
    }
  };
  return (
    <FormControl>
      <TextField
        value={newTeam}
        margin="dense"
        placeholder="Create a new team"
        id="name"
        label="Create a team"
        type="text"
        onChange={(e) => setNewTeam(e.target.value)}
        fullWidth
      />
      <FormHelperText>Create a team</FormHelperText>
      <IconButton onClick={() => handleCreateTeam()} size="small">
        <i className="material-icons icon-red">{"create"}</i>
      </IconButton>
    </FormControl>
  );
};
export default TeamCreate;
