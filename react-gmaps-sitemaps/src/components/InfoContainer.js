import React, { useContext, useState } from "react";
import { MapContext } from "./MapContext";
import { InfoWindow } from "@react-google-maps/api";
import EditNodeModal from "./EditNodeModal";

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
  ] = useContext(MapContext);

  const [editOpen, setEditOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleEditClick = () => {
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
      <div>
        <h4>{selected.label}</h4>
        <p>{selected.latLngArr}</p>
        <button onClick={handleEditClick}>EDIT</button>
        <EditNodeModal
          editOpen={editOpen}
          setEditOpen={setEditOpen}
          value={value}
          setValue={setValue}
        />
      </div>
    </InfoWindow>
  ) : null;
};

export default InfoContainer;
