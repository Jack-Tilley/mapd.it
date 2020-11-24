import React, { useContext, useState } from "react";
import { MapContext } from "./MapContext";
import { InfoWindow, InfoBox } from "@react-google-maps/api";
import EditNodeModal from "./EditNodeModal";
import { AirlineSeatReclineNormalRounded } from "@material-ui/icons";
import { Paper } from "@material-ui/core";

const InfoContainer = () => {
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
  ] = useContext(MapContext);

  const [editOpen, setEditOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleEditClick = () => {
    setColor(selected.color);
    setIcon(selected.iconValue);
    setValue(selected.label);
    setDescription(selected.description);
    console.log("selected", selected);
    setEditOpen(true);
  };

  return selected ? (
    <InfoWindow
      position={{
        lat: parseFloat(selected.latLngArr[0]),
        lng: parseFloat(selected.latLngArr[1]),
      }}
      onCloseClick={() => {
        setSelected(null);
      }}
    >
      <Paper>
        <h4>{selected.label}</h4>
        <p>{selected.description}</p>
        <button onClick={handleEditClick}>EDIT</button>
        <EditNodeModal
          editOpen={editOpen}
          setEditOpen={setEditOpen}
          value={value}
          setValue={setValue}
        />
      </Paper>
    </InfoWindow>
  ) : null;
};

export default InfoContainer;
