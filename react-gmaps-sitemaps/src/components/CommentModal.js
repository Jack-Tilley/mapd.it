import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import CommentsList from "./CommentsList";
import { useSelectedContext, useProfileContext } from "./MapContext";
import RefreshChatButton from "./RefreshChatButton";

const CommentModal = ({ commentOpen, setCommentOpen }) => {
  const { selected } = useSelectedContext();
  const { profileId } = useProfileContext();

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
        // console.log("comments", res.data);
        setComments(res.data);
      })
      .catch((err) => console.log(err));
  }, [selected.id]);

  const handleSubmit = () => {
    // console.log("prof", profileId);
    axios
      .post(`http://localhost:8000/api/basecomments/`, {
        node: selected.id,
        content: value,
        profile: profileId,
      })
      .then((res) => {
        // console.log(res.data);
        setValue("");
        axios
          .get(`http://localhost:8000/api/allNodes/${selected.id}/comments/`)
          .then((result) => {
            // console.log("comments", result.data);
            setComments(result.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    // console.log("submit clicked");
    scrollToBottom();
  };
  const handleRefresh = () => {
    axios
      .get(`http://localhost:8000/api/allNodes/${selected.id}/comments/`)
      .then((result) => {
        // console.log("comments", result.data);
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
          Comments - {selected.label}
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
