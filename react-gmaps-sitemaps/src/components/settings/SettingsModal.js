import React, { useState, useContext, useEffect } from "react";
import { useGoogleMap } from "@react-google-maps/api";

import axios from "axios";

import vibrant from "../mapStyles/vibrant";
import greyscale from "../mapStyles/greyscale";
import night from "../mapStyles/night";
import hopper from "../mapStyles/hopper";
import flatpale from "../mapStyles/flatpale";
import blackout from "../mapStyles/blackout";
import unsaturated from "../mapStyles/unsaturated";
import bluegray from "../mapStyles/bluegray";
import paledawn from "../mapStyles/paledawn";

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

import IconContainer from "../IconContainer";
import ColorContainer from "../ColorContainer";

import { MapContext } from "../MapContext";
import { BorderAll } from "@material-ui/icons";

import TeamPage from "./teamSettings/TeamPage";
import MapPage from "./mapSettings/MapPage";
import AccountPage from "./accountSettings/AccountPage";

const SettingsModal = ({
  settingsOpen,
  setSettingsOpen,
  darkMode,
  setDarkMode,
}) => {
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
  const [page, setPage] = useState("map");
  const [mapSettingsRendered, setMapSettingsRendered] = useState(true);
  const [teamSettingsRendered, setTeamSettingsRendered] = useState(false);
  const [accountSettingsRendered, setAccountSettingsRendered] = useState(false);
  const [mapColor, setMapColor] = useState("default");
  const [teamColor, setTeamColor] = useState("primary");
  const [accountColor, setAccountColor] = useState("primary");
  const map = useGoogleMap();

  const [mapStyle, setMapStyle] = useState(
    localStorage.getItem("mapStyle") || ""
  );
  const [mapTypes, setMapTypes] = useState("roadmap");

  useEffect(() => {
    console.log("map or mapStyle has updated");
    if (mapStyle === "bluegray") {
      map.setOptions({ styles: bluegray });
    } else if (mapStyle === "greyscale") {
      map.setOptions({ styles: greyscale });
    } else if (mapStyle === "unsaturated") {
      map.setOptions({ styles: unsaturated });
    } else if (mapStyle === "flatpale") {
      map.setOptions({ styles: flatpale });
    } else if (mapStyle === "hopper") {
      map.setOptions({ styles: hopper });
    } else if (mapStyle === "night") {
      map.setOptions({ styles: night });
    } else if (mapStyle === "paledawn") {
      map.setOptions({ styles: paledawn });
    } else if (mapStyle === "vibrant") {
      map.setOptions({ styles: vibrant });
    } else if (mapStyle === "blackout") {
      map.setOptions({ styles: blackout });
    } else {
      map.setOptions({ styles: null });
    }
    localStorage.setItem("mapStyle", mapStyle);
  }, [mapStyle, map]);

  useEffect(() => {
    map.setOptions({ mapTypeId: mapTypes });
  }, [mapTypes, map]);

  const handleClose = () => {
    setSettingsOpen(false);
  };

  const changePage = (value) => {
    setPage(value);
    if (value === "map") {
      setMapSettingsRendered(true);
      setTeamSettingsRendered(false);
      setAccountSettingsRendered(false);
      setMapColor("default");
      setTeamColor("primary");
      setAccountColor("primary");
    } else if (value === "team") {
      setMapSettingsRendered(false);
      setTeamSettingsRendered(true);
      setAccountSettingsRendered(false);
      setMapColor("primary");
      setTeamColor("default");
      setAccountColor("primary");
    } else if (value === "account") {
      setMapSettingsRendered(false);
      setTeamSettingsRendered(false);
      setAccountSettingsRendered(true);
      setMapColor("primary");
      setTeamColor("primary");
      setAccountColor("default");
    } else {
      console.log("WE ARE NOT RENDERING THE CORRECT THING");
    }
    renderPage();
  };

  const renderPage = () => {
    if (page === "map") {
      return (
        <MapPage
          rendered={mapSettingsRendered}
          mapStyle={mapStyle}
          setMapStyle={setMapStyle}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          mapTypes={mapTypes}
          setMapTypes={setMapTypes}
        />
      );
    } else if (page === "team") {
      return (
        <TeamPage
          rendered={teamSettingsRendered}
          teams={teams}
          profileId={profileId}
          updateNodes={updateNodes}
        />
      );
    } else if (page === "account") {
      return (
        <AccountPage rendered={accountSettingsRendered} profileId={profileId} />
      );
    } else {
      return <div>RENDER ERROR</div>;
    }
  };

  return (
    <div>
      <Paper
        style={{
          position: "absolute",
          bottom: "1.5em",
          left: "1em",
        }}
      >
        <IconButton onClick={() => setSettingsOpen(true)} size="small">
          <i className="material-icons icon-grey">{"settings"}</i>
        </IconButton>
      </Paper>
      <Dialog
        fullWidth={true}
        maxWidth={"xs"}
        open={settingsOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{`Settings - ${page}`}</DialogTitle>
        <DialogContent id="settings" dividers={true}>
          {renderPage()}
        </DialogContent>
        <DialogActions>
          <Button
            style={{ position: "absolute", left: "2em" }}
            onClick={() => handleClose()}
            color="secondary"
          >
            Cancel
          </Button>
          <Button onClick={() => changePage("map")} color={mapColor}>
            Map
          </Button>
          <Button onClick={() => changePage("team")} color={teamColor}>
            Team
          </Button>
          <Button onClick={() => changePage("account")} color={accountColor}>
            Account
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
{
  /* <DialogContent id="buttons">
            <FormControl>
              <Select
                labelId="Map Style"
                displayEmpty
                id="mapstyle"
                value={mapStyle}
                onChange={(e) => changeOptions(e.target.value)}
              >
                <MenuItem value="">
                  <em>Default</em>
                </MenuItem>
                <MenuItem value={"bluegray"}>BlueGray</MenuItem>
                <MenuItem value={"greyscale"}>Greyscale</MenuItem>
                <MenuItem value={"unsaturated"}>Unsaturated</MenuItem>
                <MenuItem value={"paledawn"}>Paledawn</MenuItem>
                <MenuItem value={"hopper"}>Hopper</MenuItem>
                <MenuItem value={"vibrant"}>Vibrant</MenuItem>
                <MenuItem value={"flatpale"}>FlatPale</MenuItem>
                <MenuItem value={"night"}>Night</MenuItem>
                <MenuItem value={"blackout"}>Blackout</MenuItem>
              </Select>
              <FormHelperText>Map Style</FormHelperText>
            </FormControl>
          </DialogContent>
          <DialogContent>
            <FormControl>
              <Switch
                checked={darkMode}
                value={darkMode}
                onClick={() => setDarkMode(!darkMode)}
              />
              <FormHelperText>Dark Mode</FormHelperText>
            </FormControl>
          </DialogContent>
          <DialogContent>
            <TeamLeave
              teams={teams}
              leaveTeamId={leaveTeamId}
              setLeaveTeamId={setLeaveTeamId}
              profileId={profileId}
              updateNodes={updateNodes}
            />
          </DialogContent>
          <DialogContent>
            <TeamCreate
              newTeam={newTeam}
              setNewTeam={setNewTeam}
              profileId={profileId}
              updateNodes={updateNodes}
            />
          </DialogContent>
          <DialogContent>
            <TeamJoin
              joinTeam={joinTeam}
              setJoinTeam={setJoinTeam}
              profileId={profileId}
              updateNodes={updateNodes}
            />
          </DialogContent> */
}

export default SettingsModal;
