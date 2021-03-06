import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import React, { useState } from "react";
import ColorContainer from "./ColorContainer";
import IconContainer from "./IconContainer";
// import { Icon } from "@material-ui/core";
// import ImageUpload from "./ImageUpload";
import { replaceNode, editCleanup, removeNode } from "../utils/contextUtils";
import {
  useAddEditContext,
  useSelectedContext,
  useTreeContext,
  useNodeContext,
  useDrawContext,
} from "./MapContext";

const EditNodeModal = ({ editOpen, setEditOpen, label, setLabel }) => {
  const {
    icon,
    setIcon,
    color,
    setColor,
    setNodeType,
    setEditing,
    setEditValue,
    description,
    setDescription,
  } = useAddEditContext();
  const { selected, setSelected } = useSelectedContext();
  const { shapes, setShapes, checked, setChecked } = useTreeContext();
  const { nodes, setNodes } = useNodeContext();
  const { setDraw } = useDrawContext();

  // const [validationMessage, setValidationMessage] = useState("");
  const [nameError, setNameError] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleValidation = () => {
    if (label === "") {
      // setValidationMessage("- Please give this item a name!");
      setNameError(true);
    } else {
      // setValidationMessage("");
      setNameError(false);
    }
  };

  const handleSubmit = (needsLocationChange) => {
    if (label === "") {
      handleValidation();
      return;
    }
    if (needsLocationChange) {
      setEditValue(label);
      setNodeType(selected.nodeType);
      setEditing(true);
      setDraw(true);
    } else {
      axios
        .put(
          `https://backend-mapdit.herokuapp.com/api/allNodes/${selected.id}/`,
          {
            label: label,
            color: color,
            iconValue: icon,
            description: description,
          }
        )
        .then((res) => {
          if (res.data.parent === null) {
            // console.log("THIS IS A LONE NODE");
            let newNodes = replaceNode(selected.id, res.data, nodes);
            setNodes(newNodes);
          } else {
            axios
              .get(
                `https://backend-mapdit.herokuapp.com/api/nodes/${res.data.parent}`
              )
              .then((result) => {
                let newNodes = replaceNode(res.data.parent, result.data, nodes);
                setNodes(newNodes);
              })
              .catch((err) => console.log(err));
          }
          editCleanup(
            res.data,
            checked,
            shapes,
            selected,
            setChecked,
            setShapes,
            setSelected,
            setIcon,
            setNodeType,
            setColor,
            setDescription,
            setEditValue
          );
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
    setConfirmDelete(false);
    // setValidationMessage("");
    setNameError(false);
    editCleanup(
      null,
      checked,
      shapes,
      selected,
      setChecked,
      setShapes,
      () => {},
      setIcon,
      setNodeType,
      setColor,
      setDescription,
      setEditValue
    );
    setEditOpen(false);
  };

  const handleButtonClick = (btnIcon) => {
    setIcon(btnIcon);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };
  // const handleDeleteClicked = (e) => {
  //   e.preventDefault();
  //   setConfirmDelete(true);
  // };
  const handleDelete = () => {
    // console.log("selected", selected);
    // warning confirmation then...
    axios
      .delete(
        `https://backend-mapdit.herokuapp.com/api/allNodes/${selected.id}`
      )
      .then((res) => {
        setEditOpen(false);
        let newNodes = removeNode(selected.value, nodes);
        // this should be updated to not loop through each node multiple times
        setShapes(shapes.filter((node) => node.value !== selected.value));
        setChecked(checked.filter((check) => check !== selected.value));
        setNodes(newNodes);
        setSelected(null);
        editCleanup(
          null,
          checked,
          shapes,
          selected,
          setChecked,
          setShapes,
          setSelected,
          setIcon,
          setNodeType,
          setColor,
          setDescription,
          setEditValue
        );
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
        <DialogTitle id="form-dialog-title">
          Edit Existing Item
          {/* <span style={{ color: "red" }}>{validationMessage}</span> */}
          <Button
            style={{ position: "absolute", top: "1em", right: "1em" }}
            onClick={handleClose}
            color="default"
            variant="contained"
          >
            Cancel
          </Button>
        </DialogTitle>
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
                error={nameError}
                autoFocus
                value={label}
                margin="dense"
                placeholder="Give your item a title"
                id="name"
                label="Node Name"
                type="text"
                onChange={(e) => setLabel(e.target.value)}
                fullWidth
                inputProps={{ maxLength: 48 }}
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
                inputProps={{ maxLength: 250 }}
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
          {confirmDelete === false ? (
            <Button
              style={{
                position: "absolute",
                // bottom: "1.5em",
                left: "1em",
                marginRight: "20px",
              }}
              onClick={() => setConfirmDelete(true)}
              variant="contained"
              color="secondary"
            >
              DELETE
            </Button>
          ) : (
            <Button
              style={{
                position: "absolute",
                // bottom: "1.5em",
                left: "1em",
                marginRight: "20px",
              }}
              onClick={handleDelete}
              variant="contained"
              color="secondary"
              endIcon={<i className="material-icons">{"delete"}</i>}
            >
              CONFIRM
            </Button>
          )}
          <Button
            style={{
              height: "50px",
              width: "80px",
            }}
            onClick={() => handleSubmit(true)}
            color="primary"
            variant="contained"
          >
            Update Location
          </Button>
          <Button
            style={{
              height: "50px",
              width: "80px",
            }}
            onClick={() => handleSubmit(false)}
            color="primary"
            variant="contained"
          >
            Keep Location
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditNodeModal;
