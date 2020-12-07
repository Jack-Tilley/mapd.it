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
  const bottomRef = React.useRef();

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  };

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
    scrollToBottom();
  };
  const handleRefresh = () => {
    axios
      .get(`http://localhost:8000/api/allNodes/${selected.id}/comments/`)
      .then((result) => {
        console.log("comments", result.data);
        setComments(result.data);
      })
      .catch((err) => console.log(err));
    scrollToBottom();
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
        <DialogTitle id="form-dialog-title">
          Comments
          <RefreshChatButton
            setComments={setComments}
            selected={selected}
            handleRefresh={handleRefresh}
          />
        </DialogTitle>
        <DialogContent scroll="paper" dividers={true}>
          <CommentsList comments={comments} bottomRef={bottomRef} />
          <div ref={bottomRef} />
        </DialogContent>
        <DialogActions style={{ overflow: "hidden" }}>
          <FormControl fullWidth>
            <TextField
              autoFocus
              id="comement-insert"
              label="Add a comment..."
              variant="outlined"
              multiline
              value={value}
              rows={4}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <Button
                    variant="contained"
                    style={{
                      position: "absolute",
                      bottom: 3,
                      right: 3,
                    }}
                    color="primary"
                    endIcon={<Icon>send</Icon>}
                    onClick={() => handleSubmit()}
                  >
                    Comment
                  </Button>
                ),
              }}
            />
          </FormControl>
          <div>
            <Button variant="contained" onClick={handleClose} color="default">
              Done
            </Button>
          </div>

          {/* <Button onClick={() => handleSubmit()} color="primary">
            Comment
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CommentModal;
