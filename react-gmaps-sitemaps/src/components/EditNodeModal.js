import React, { useState, useContext, useEffect } from "react";

import axios from "axios";

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

const EditNodeModal = ({ editOpen, setEditOpen, value, setValue }) => {
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

  const handleSubmit = (needsLocationChange) => {
    if (needsLocationChange) {
      setActiveNode(selected);
      setDraw(true);
    } else {
      axios
        .put(`http://localhost:8000/api/allNodes/${selected.id}/`, {
          value: value,
          label: value,
          color: color,
          iconValue: icon,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      // axios.put to api/node/<nodeid>
      // then update references to that node
    }
    setEditOpen(false);
    setSelected(null);
    console.log(selected);

    // setDraw(true);
    // addItem(event, isDir);
    // setModalOpen(false);
    // setEvent("");
  };

  const handleClose = () => {
    setEditOpen(false);
  };

  const handleButtonClick = (btnIcon) => {
    setIcon(btnIcon);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleDelete = () => {
    console.log("selected", selected);
    // warning confirmation then...
    axios
      .delete(`http://localhost:8000/api/allNodes/${selected.id}`)
      .then((res) => {
        setEditOpen(false);
        let newNodes = removeNode(selected.value);
        console.log("NEWNODES", newNodes);
        // this should be updated to not loop through each node multiple times
        setShapes(shapes.filter((node) => node.value !== selected.value));
        setChecked(checked.filter((check) => check !== selected.value));
        setNodes(newNodes);
        setSelected(null);
        //setShapes, setChecked, set others, set activeNode, setNodes()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Dialog
        open={editOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Existing Node</DialogTitle>
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
          <Button onClick={handleDelete} color="secondary">
            DELETE
          </Button>
          <Button onClick={handleClose} color="default">
            Cancel
          </Button>
          <Button onClick={() => handleSubmit(true)} color="primary">
            Update Location
          </Button>
          <Button onClick={() => handleSubmit(false)} color="primary">
            Keep Location
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditNodeModal;
