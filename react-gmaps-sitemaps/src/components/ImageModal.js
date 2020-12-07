import React, { useState, useContext, useEffect } from "react";

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
import DirContainer from "./DirContainer";
import TeamContainer from "./TeamContainer";

import RefreshChatButton from "./RefreshChatButton";

import CommentsList from "./CommentsList";
import { IconButton } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import axios from "axios";

import ImageUpload from "./ImageUpload";

import { MapContext } from "./MapContext";

const ImageModal = ({ imageOpen, setImageOpen }) => {
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
    picture,
    setPicture,
  ] = useContext(MapContext);

  const handleClose = () => {
    setImageOpen(false);
  };
  const handlePictureChange = (e) => {
    e.preventDefault();
    console.log("picture", e.target.files[0]);
    setPicture(e.target.files[0]);
  };
  const handleSubmit = () => {
    console.log("picFile", picture["FILES"]);
    let data = new FormData(); // creates a new FormData object
    data.append("image", picture);
    data.append("description", "hello");
    data.append("node", "205");
    // let form_data = new FormData();
    // form_data.append("image", picture, "imgname");
    // form_data.append("description", "hello this is desc");
    // form_data.append("node", selected.id);
    // axios
    //   .post("http://localhost:8000/api/images/", form_data, {
    //     headers: {
    //       "content-type": "multipart/form-data",
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => console.log(err));
    ////
    axios
      .post("http://localhost:8000/api/images/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Dialog
        open={imageOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        scroll="paper"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Images</DialogTitle>
        <DialogContent scroll="paper" dividers={true}>
          <ImageUpload handlePictureChange={handlePictureChange} />
        </DialogContent>
        <DialogActions style={{ overflow: "hidden" }}>
          <div>
            <Button variant="contained" onClick={handleClose} color="default">
              Done
            </Button>
            <Button variant="contained" onClick={handleSubmit} color="default">
              Submit
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ImageModal;
