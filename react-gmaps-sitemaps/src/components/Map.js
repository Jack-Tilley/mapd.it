import React, { useState, useContext } from "react";
import { MapContext } from "./MapContext";
import { GoogleMap, Marker } from "@react-google-maps/api";
import DrawingComponent from "./DrawingComponent";
import ShapeSetter from "./ShapeSetter";

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
    markers,
    setMarkers,
    polylines,
    setPolylines,
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
        <DrawingComponent />
        <ShapeSetter gm={new window.google.maps.Size(30, 30)} />
      </GoogleMap>
    </>
  );

  return isLoaded ? renderMap() : null;
};

export default Map;
