import React, { useState, useContext, useEffect } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import IconContainer from "./IconContainer";

import { MapContext } from "./MapContext";
import { Brush } from "@material-ui/icons";

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
  ] = useContext(MapContext);

  const handleSubmit = () => {
    setDraw(true);
    addItem(event);
    setModalOpen(false);
    setEvent("");
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleButtonClick = (btnIcon) => {
    setIcon(btnIcon);
    //   console.log(icon)
    //   console.log(btnIcon)
  };

  return (
    <div>
      <Dialog
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Node</DialogTitle>
        <DialogContent>
          <IconContainer handleButtonClick={handleButtonClick} />
          <DialogContentText>Add a new Node here</DialogContentText>
          <TextField
            autoFocus
            value={value}
            margin="dense"
            id="name"
            label="Node Name"
            type="text"
            onChange={(e) => setValue(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Go
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddNodeModal;
