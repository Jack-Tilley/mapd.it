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

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import ImageUpload from "./ImageUpload";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import StarBorderIcon from "@material-ui/icons/StarBorder";

import { MapContext } from "./MapContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

const urlbase = "http://localhost:8000";
const ImageModal = ({
  imageOpen,
  setImageOpen,
  images,
  setImages,
  gatherImages,
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
    picture,
    setPicture,
  ] = useContext(MapContext);
  const classes = useStyles();

  const handleClose = () => {
    setImageOpen(false);
  };
  const handlePictureChange = (e) => {
    e.preventDefault();
    console.log("picture", e.target.files[0]);
    setPicture(e.target.files[0]);
  };
  const handleSubmit = () => {
    console.log("picFile", picture);
    let data = new FormData(); // creates a new FormData object
    data.append("image", picture);
    data.append("description", "hardcoded desription");
    data.append("node", selected.id);
    axios
      .post("http://localhost:8000/api/images/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res.data);
        gatherImages();
      })
      .catch((err) => console.log(err));
  };
  const renderImages = () => {
    console.log("images", images);
    return (
      <GridList cellHeight={300} className={classes.gridList} cols={2.5}>
        {images.map((image) => (
          <GridListTile key={image.id}>
            <img src={urlbase + image.image} alt={image.image} />
          </GridListTile>
        ))}
      </GridList>
    );
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
          {images.length > 0 ? renderImages() : null}
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
