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
import DirContainer from "./DirContainer";

import { MapContext } from "./MapContext";

const AddNodeModal = ({
  modalOpen,
  setModalOpen,
  value,
  setValue,
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
    disabled,
    setDisabled,
  ] = useContext(MapContext);

  const [isDir, setIsDir] = useState(true);

  const handleSubmit = (type) => {
    setNodeType(type);
    setDraw(true);
    addItem(event, isDir, type);
    setModalOpen(false);
    setEvent("");
    setIsDir(true);
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

  const handleDirChange = (event) => {
    console.log("event", event.target.value);
    setIsDir(event.target.value);
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
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <IconContainer handleButtonClick={handleButtonClick} />
            </Grid>
            <Grid item xs={2}>
              <ColorContainer
                handleColorChange={handleColorChange}
                color={color}
              />
            </Grid>
            <Grid item xs={1}>
              <DirContainer handleDirChange={handleDirChange} isDir={isDir} />
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
          <Button onClick={() => handleSubmit("marker")} color="primary">
            Marker
          </Button>
          <Button onClick={() => handleSubmit("polyline")} color="primary">
            Polyline
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddNodeModal;
