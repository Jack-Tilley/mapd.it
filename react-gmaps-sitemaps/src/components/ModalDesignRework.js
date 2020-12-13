import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import React, { useContext, useState } from "react";
import ColorContainer from "./ColorContainer";
import IconContainer from "./IconContainer";
import { MapContext } from "./MapContext";
import TeamContainer from "./TeamContainer";

const ModalDesignRework = ({
  modalOpen,
  setModalOpen,
  label,
  setLabel,
  addItem,
  event,
  setEvent,
}) => {
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
  //   la,
  //   setLa,
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
    icon,
    setIcon,
    color,
    setColor,
    setNodeType,
    description,
    setDescription,
    teams,
    selectedTeams,
    setSelectedTeams,
  } = useContext(MapContext);

  const [isDir, setIsDir] = useState(true);
  const [teamObjects, setTeamObjects] = useState([]);
  const [validationMessage, setValidationMessage] = useState("");
  const [nameError, setNameError] = useState(false);
  const [teamError, setTeamError] = useState(false);

  const handleValidation = () => {
    if (teamObjects.length < 1 && label === "") {
      setValidationMessage("- Please fill out the required fields!");
      setNameError(true);
      setTeamError(true);
    } else if (teamObjects.length < 1) {
      setValidationMessage("- Please assign this item to at least one team!");
      setNameError(false);
      setTeamError(true);
    } else if (label === "") {
      setValidationMessage("- Please give this item a name!");
      setNameError(true);
      setTeamError(false);
    } else {
      setValidationMessage("");
      setNameError(false);
      setTeamError(false);
    }
  };

  const handleSubmit = (type) => {
    if (teamObjects.length > 0 && label !== "") {
      setSelectedTeams(teamObjects);
      setNodeType(type);
      setDraw(true);
      addItem(event, isDir, type);
      setModalOpen(false);
      setEvent("");
      setIsDir(true);
      setValidationMessage("");
      setNameError(false);
      setTeamError(false);
    } else {
      handleValidation();
      // console.log("SELECT A TEAM FIRST");
    }
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleButtonClick = (btnIcon) => {
    setIcon(btnIcon);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleDirChange = (e) => {
    // console.log("event", e.target.value);
    setIsDir(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSelectedTeamChange = (e) => {
    setTeamObjects(e.target.value);
  };

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"md"}
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      scroll="paper"
    >
      {console.log("Add Modal Updated")}
      <DialogTitle id="form-dialog-title">
        Add New Node <span style={{ color: "red" }}>{validationMessage}</span>
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
              autoFocus
              error={nameError}
              autoComplete="off"
              value={label}
              margin="dense"
              placeholder="Give your item a title"
              id="name"
              label="Node Name"
              type="text"
              onChange={(e) => handleLabelChange(e)}
              inputProps={{ maxLength: 48 }}
              fullWidth
            />
            <TextField
              inputProps={{ maxLength: 250 }}
              id="description"
              margin="dense"
              label="Description..."
              placeholder="Description goes here..."
              multiline
              rows={5}
              value={description}
              type="text"
              onChange={(e) => handleDescriptionChange(e)}
              fullWidth
            />

            <Grid container spacing={10} style={{ paddingTop: "1em" }}>
              <Grid item xs={6}>
                <TeamContainer
                  teams={teams}
                  handleSelectedTeamChange={handleSelectedTeamChange}
                  teamObjects={teamObjects}
                  teamError={teamError}
                />
              </Grid>
              {/* <Grid item xs={6}>
                <DirContainer handleDirChange={handleDirChange} isDir={isDir} />
              </Grid> */}
            </Grid>
          </Grid>
          <Grid item xs={1} style={{ paddingRight: 0 }}>
            <Divider orientation="vertical" />
          </Grid>
          <Grid item xs={5} style={{ paddingLeft: 0 }}>
            <div style={{ overflow: "auto", maxHeight: "150px" }}></div>
            <IconContainer handleButtonClick={handleButtonClick} />
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
        <Button
          style={{
            position: "absolute",
            // bottom: "1.5em",
            left: "1em",
          }}
          onClick={handleClose}
          color="default"
        >
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
  );
};

export default ModalDesignRework;
