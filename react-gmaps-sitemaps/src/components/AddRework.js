import React, { useState, useContext, useEffect } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import InputAdornment from "@material-ui/core/InputAdornment";

import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

import IconContainer from "./IconContainer";
import ColorContainer from "./ColorContainer";

import { MapContext } from "./MapContext";

const AddRework = ({
  modalOpen,
  setModalOpen,
  value,
  setValue,
  //   nodeType,
  //   setNodeType,
  addItem,
  event,
  setEvent,
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
  ] = useContext(MapContext);

  const handleSubmit = (isDir, type) => {
    setNodeType(type);
    setDraw(true);
    addItem(event, isDir, type);
    setModalOpen(false);
    setEvent("");
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleButtonClick = (btnIcon) => {
    setIcon(btnIcon);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  return (
    <div>
      <Dialog
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Node</DialogTitle>
        <DialogContent id="buttons">
          <Grid container spacing={3}>
            <Grid item xs={9}>
              <IconContainer handleButtonClick={handleButtonClick} />
            </Grid>
            <Grid item xs={3}>
              <ColorContainer
                handleColorChange={handleColorChange}
                color={color}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogContent id="text">
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <i className={`material-icons icon-${color}`}>{icon}</i>
                </InputAdornment>
              ),
            }}
            autoFocus
            value={value}
            margin="dense"
            placeholder="Give your item a title"
            id="name"
            label="Node Name"
            type="text"
            onChange={(e) => setValue(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default">
            Cancel
          </Button>
          <Button onClick={() => handleSubmit(true, "marker")} color="primary">
            DirMarker
          </Button>
          <Button onClick={() => handleSubmit(false, "marker")} color="primary">
            LeafMarker
          </Button>
          <Button
            onClick={() => handleSubmit(true, "polyline")}
            color="primary"
          >
            DirPoly
          </Button>
          <Button
            onClick={() => handleSubmit(false, "polyline")}
            color="primary"
          >
            LeafPoly
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddRework;
