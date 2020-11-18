import React, { useState, useContext, useEffect } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

import IconContainer from "./IconContainer";
import ColorContainer from "./ColorContainer";

import { MapContext } from "./MapContext";

const AddNodeModal = ({
  modalOpen,
  setModalOpen,
  value,
  setValue,
  nodeType,
  setNodeType,
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
  ] = useContext(MapContext);

  const handleSubmit = (isDir) => {
    setDraw(true);
    addItem(event, isDir);
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
          <Button onClick={() => handleSubmit(true)} color="primary">
            Dir
          </Button>
          <Button onClick={() => handleSubmit(false)} color="primary">
            Leaf
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddNodeModal;
