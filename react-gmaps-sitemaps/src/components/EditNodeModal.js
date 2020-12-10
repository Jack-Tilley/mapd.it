import React, { useState, useContext, useEffect } from "react";

import axios from "axios";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";

import InputAdornment from "@material-ui/core/InputAdornment";

import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

import IconContainer from "./IconContainer";
import ColorContainer from "./ColorContainer";

// import ImageUpload from "./ImageUpload";

import { MapContext } from "./MapContext";

const EditNodeModal = ({ editOpen, setEditOpen, label, setLabel }) => {
  // const [
  //   myMap,
  //   setMyMap,
  //   center,
  //   setCenter,
  //   isLoaded,
  //   draw,
  //   setDraw,
  //   nodes,
  //   setNodes,
  //   activeNode,
  //   setActiveNode,
  //   icon,
  //   setIcon,
  //   shapes,
  //   setShapes,
  //   checked,
  //   setChecked,
  //   selected,
  //   setSelected,
  //   color,
  //   setColor,
  //   findNode,
  //   removeNode,
  //   nodeType,
  //   setNodeType,
  //   disabled,
  //   setDisabled,
  //   editing,
  //   setEditing,
  //   editValue,
  //   setEditValue,
  //   replaceNode,
  //   editCleanup,
  //   changeIcons,
  //   description,
  //   setDescription,
  //   comment,
  //   setComment,
  //   lab,
  //   setLab,
  //   auth,
  //   setAuth,
  //   profileId,
  //   setProfileId,
  //   teams,
  //   setTeams,
  //   selectedTeams,
  //   setSelectedTeams,
  //   updateNodes,
  //   picture,
  //   setPicture,
  // ] = useContext(MapContext);

  const {
    setDraw,
    setNodes,
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
    removeNode,
    setNodeType,
    setEditing,
    setEditValue,
    replaceNode,
    editCleanup,
    description,
    setDescription,
  } = useContext(MapContext);

  const handleSubmit = (needsLocationChange) => {
    if (needsLocationChange) {
      setEditValue(label);
      setNodeType(selected.nodeType);
      setEditing(true);
      setDraw(true);
    } else {
      axios
        .put(`http://localhost:8000/api/allNodes/${selected.id}/`, {
          label: label,
          color: color,
          iconValue: icon,
          description: description,
        })
        .then((res) => {
          if (res.data.parent === null) {
            // console.log("THIS IS A LONE NODE");
            let newNodes = replaceNode(selected.id, res.data);
            setNodes(newNodes);
          } else {
            axios
              .get(`http://localhost:8000/api/nodes/${res.data.parent}`)
              .then((result) => {
                let newNodes = replaceNode(res.data.parent, result.data);
                setNodes(newNodes);
              })
              .catch((err) => console.log(err));
          }
          editCleanup(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      // axios.put to api/node/<nodeid>
      // then update references to that node
    }
    setEditOpen(false);
    // console.log("selected", selected);
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
    // console.log("selected", selected);
    // warning confirmation then...
    axios
      .delete(`http://localhost:8000/api/allNodes/${selected.id}`)
      .then((res) => {
        setEditOpen(false);
        let newNodes = removeNode(selected.value);
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
        fullWidth={true}
        maxWidth={"md"}
        open={editOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Existing Node</DialogTitle>
        <DialogContent scroll="paper" dividers={true}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <i className={`material-icons icon-${color}`}>{icon}</i>
                    </InputAdornment>
                  ),
                }}
                autoFocus
                value={label}
                margin="dense"
                placeholder="Give your item a title"
                id="name"
                label="Node Name"
                type="text"
                onChange={(e) => setLabel(e.target.value)}
                fullWidth
              />
              <TextField
                id="multiline-flexible"
                margin="dense"
                label="Description..."
                multiline
                rows={6}
                value={description}
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
              />

              <Grid container spacing={1} style={{ paddingTop: "1em" }}>
                <Grid item xs={6}>
                  {/* <FormControl>
                    <Select
                      labelId="Label"
                      id="Label"
                      //   value={mapStyle}
                      //   onChange={(e) => changeOptions(e.target.value)}
                    >
                      <MenuItem value="INPROGRESS">
                        <em>In Progress</em>
                      </MenuItem>
                    </Select>
                    <FormHelperText>Label</FormHelperText>
                  </FormControl> */}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1} style={{ paddingRight: 0 }}>
              <Divider orientation="vertical" />
            </Grid>
            <Grid item xs={5} style={{ paddingLeft: 0 }}>
              <div>
                <IconContainer handleButtonClick={handleButtonClick} />
              </div>
              <div>
                <ColorContainer
                  handleColorChange={handleColorChange}
                  color={color}
                />
              </div>
            </Grid>
          </Grid>
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
