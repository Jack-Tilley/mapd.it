import React, { useState, useContext, useEffect } from "react";
import { useGoogleMap } from "@react-google-maps/api";

import axios from "axios";

import vibrant from "../../mapStyles/vibrant";
import greyscale from "../../mapStyles/greyscale";
import night from "../../mapStyles/night";
import hopper from "../../mapStyles/hopper";
import flatpale from "../../mapStyles/flatpale";
import blackout from "../../mapStyles/blackout";
import unsaturated from "../../mapStyles/unsaturated";
import bluegray from "../../mapStyles/bluegray";
import paledawn from "../../mapStyles/paledawn";

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

// import { MapContext } from "../../MapContext";
import { BorderAll } from "@material-ui/icons";

import TeamLeave from "./TeamLeave";
import TeamCreate from "./TeamCreate";
import TeamJoin from "./TeamJoin";

const TeamPage = ({ rendered, teams, profileId, updateNodes }) => {
  const [newTeam, setNewTeam] = useState("");
  const [joinTeam, setJoinTeam] = useState("");
  const [leaveTeamId, setLeaveTeamId] = useState("");
  return rendered ? (
    <div>
      <TeamJoin
        joinTeam={joinTeam}
        setJoinTeam={setJoinTeam}
        profileId={profileId}
        updateNodes={updateNodes}
      />
      <TeamCreate
        newTeam={newTeam}
        setNewTeam={setNewTeam}
        profileId={profileId}
        updateNodes={updateNodes}
      />
      <TeamLeave
        teams={teams}
        leaveTeamId={leaveTeamId}
        setLeaveTeamId={setLeaveTeamId}
        profileId={profileId}
        updateNodes={updateNodes}
      />
    </div>
  ) : null;
};
export default TeamPage;
