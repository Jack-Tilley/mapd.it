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

import CommentsList from "./CommentsList";

import axios from "axios";

import { MapContext } from "./MapContext";

const CommentModal = ({ commentOpen, setCommentOpen }) => {
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
  ] = useContext(MapContext);

  const [comments, setComments] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/allNodes/${selected.id}/comments/`)
      .then((res) => {
        console.log("comments", res.data);
        setComments(res.data);
      })
      .catch((err) => console.log(err));
  }, [selected.id]);

  const handleSubmit = () => {
    console.log("prof", profileId);
    axios
      .post(`http://localhost:8000/api/basecomments/`, {
        node: selected.id,
        content: value,
        profile: profileId,
      })
      .then((res) => {
        console.log(res.data);
        setValue("");
        axios
          .get(`http://localhost:8000/api/allNodes/${selected.id}/comments/`)
          .then((result) => {
            console.log("comments", result.data);
            setComments(result.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    console.log("submit clicked");
  };

  const handleClose = () => {
    setCommentOpen(false);
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <Dialog
        open={commentOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        scroll="paper"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Comments</DialogTitle>
        <DialogContent scroll="paper" dividers={true}>
          <CommentsList comments={comments} />
          <TextField
            id="comement-insert"
            label="Add a comment..."
            multiline
            fullWidth
            value={value}
            rows={4}
            placeholder="Add a comment..."
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default">
            Done
          </Button>
          <Button onClick={() => handleSubmit()} color="primary">
            Comment
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CommentModal;
