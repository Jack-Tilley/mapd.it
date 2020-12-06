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

import { MapContext } from "./MapContext";

const ModalDesignRework = ({
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

  const [isDir, setIsDir] = useState(true);
  const [teamObjects, setTeamObjects] = useState([]);
  const [submitTeamDisabled, setSubmitTeamDisabled] = useState(true);
  const [submitValueDisabled, setSubmitValueDisabled] = useState(true);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleSubmit = (type) => {
    if (teamObjects.length < 1) {
      console.log("Fill in required");
    } else {
      setSelectedTeams(teamObjects);
      setNodeType(type);
      setDraw(true);
      addItem(event, isDir, type);
      setModalOpen(false);
      setEvent("");
      setIsDir(true);
    }
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

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleTeamSubmitEnable = (teamObjs) => {
    if (teamObjs.length > 0) {
      setSubmitTeamDisabled(false);
    } else {
      setSubmitTeamDisabled(true);
    }
    handleSubmitEnable();
  };
  const handleValueSubmitEnable = (val) => {
    if (val.length > 0) {
      setSubmitValueDisabled(false);
    } else {
      setSubmitValueDisabled(true);
    }
    handleSubmitEnable();
  };
  const handleSubmitEnable = () => {
    if (submitTeamDisabled && submitValueDisabled) {
      setSubmitDisabled(true);
    } else {
      setSubmitDisabled(false);
    }
  };

  const handleSelectedTeamChange = (event) => {
    setTeamObjects(event.target.value);
    handleTeamSubmitEnable(event.target.value);
    handleValueSubmitEnable(value);
    handleSubmitEnable();
  };

  const handleValueChange = (e) => {
    setValue(e.target.value);
    handleValueSubmitEnable(e.target.value);
    handleValueSubmitEnable(teamObjects);
    handleSubmitEnable();
  };

  return (
    <div>
      <Dialog
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        scroll="paper"
      >
        <DialogTitle id="form-dialog-title">Add New Node</DialogTitle>
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
                autoComplete="off"
                required
                value={value}
                margin="dense"
                placeholder="Give your item a title"
                id="name"
                label="Node Name"
                type="text"
                onChange={(e) => handleValueChange(e)}
                fullWidth
              />
              <TextField
                id="multiline-flexible"
                margin="dense"
                label="Description..."
                placeholder="Description goes here..."
                multiline
                rows={6}
                value={description}
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
              />

              <Grid container spacing={10} style={{ paddingTop: "1em" }}>
                <Grid item xs={6}>
                  <TeamContainer
                    teams={teams}
                    selectedTeams={selectedTeams}
                    setSelectedTeams={setSelectedTeams}
                    handleSelectedTeamChange={handleSelectedTeamChange}
                    teamObjects={teamObjects}
                    setTeamObjects={setTeamObjects}
                  />
                </Grid>
                {/* <Grid item xs={4}>
                  <FormControl>
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
                  </FormControl>
                </Grid> */}
                <Grid item xs={6}>
                  <DirContainer
                    handleDirChange={handleDirChange}
                    isDir={isDir}
                  />
                </Grid>
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
          <Button onClick={handleClose} color="default">
            Cancel
          </Button>
          <Button
            disabled={submitDisabled}
            onClick={() => handleSubmit("marker")}
            color="primary"
          >
            Marker
          </Button>
          <Button
            disabled={submitDisabled}
            onClick={() => handleSubmit("polyline")}
            color="primary"
          >
            Polyline
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalDesignRework;
