import React, { useState, useContext, useEffect } from "react";

import axios from "axios";

import vibrant from "./mapStyles/vibrant";
import greyscale from "./mapStyles/greyscale";
import night from "./mapStyles/night";
import hopper from "./mapStyles/hopper";
import flatpale from "./mapStyles/flatpale";
import blackout from "./mapStyles/blackout";
import unsaturated from "./mapStyles/unsaturated";
import bluegray from "./mapStyles/bluegray";
import paledawn from "./mapStyles/paledawn";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";

import IconButton from "@material-ui/core/IconButton";

import InputAdornment from "@material-ui/core/InputAdornment";

import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

import IconContainer from "./IconContainer";
import ColorContainer from "./ColorContainer";

import { MapContext } from "./MapContext";
import { BorderAll } from "@material-ui/icons";

const SettingsModal = ({ settingsOpen, setSettingsOpen }) => {
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
  ] = useContext(MapContext);

  const handleClose = () => {
    setSettingsOpen(false);
  };

  //   const handleButtonClick = (btnIcon) => {
  //     setIcon(btnIcon);
  //   };

  //   const handleColorChange = (event) => {
  //     setColor(event.target.value);
  //   };

  return (
    <div>
      <IconButton
        onClick={() => setSettingsOpen(true)}
        size="small"
        style={{
          position: "absolute",
          bottom: "1.5em",
          left: "1em",
          border: "1px solid black",
          background: "white",
        }}
      >
        <i className="material-icons icon-grey">{"settings"}</i>
      </IconButton>
      <Dialog
        fullWidth={true}
        maxWidth={"xs"}
        open={settingsOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Settings</DialogTitle>
        <Divider />
        <DialogContent id="buttons">
          <FormControl>
            <InputLabel htmlFor="map-style-native-helper">Map Style</InputLabel>
            <NativeSelect
              value={mapStyle}
              onChange={(e) => setMapStyle(e.target.value)}
            >
              <option value={bluegray}>BlueGray</option>
              <option value={greyscale}>Greyscale</option>
              <option value={unsaturated}>Unsaturated</option>
            </NativeSelect>
            <FormHelperText>Map Style</FormHelperText>
          </FormControl>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SettingsModal;
