import React, { useState, useContext } from "react";
import { MapContext } from "./MapContext";
import { GoogleMap, InfoWindow } from "@react-google-maps/api";
import DrawingComponent from "./DrawingComponent";
import ShapeSetter from "./ShapeSetter";
import AutocompleteBox from "./AutocompleteBox";
import Directions from "./Directions";

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = () => {
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

  const renderMap = () => (
    <>
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "100%",
        }}
        zoom={10}
        center={center}
        onLoad={(map) => setMyMap(map)}
        options={options}
      >
        <AutocompleteBox center={center} setCenter={setCenter} />
        <DrawingComponent />
        <ShapeSetter />
        {/* <Directions /> */}
        {selected ? (
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
            </div>
          </InfoWindow>
        ) : null}
        }
      </GoogleMap>
    </>
  );

  return isLoaded ? renderMap() : null;
};

export default Map;
