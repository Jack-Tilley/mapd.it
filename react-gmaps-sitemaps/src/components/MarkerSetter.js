import React, { useState, useContext, useEffect } from "react";
import { MapContext } from "./MapContext";

import { Marker } from "@react-google-maps/api";

const MarkerSetter = () => {
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

  useEffect(() => {
    console.log(markers);
  }, [markers, polylines]);

  return (
    <>
      {console.log(markers)}
      {markers.map((marker) => (
        <>
          {console.log("LATLNG", marker.latLngArr)}
          <Marker position={{ lat: marker.latLngArr }} key={marker.value} />
        </>
      ))}
    </>
  );
};
export default MarkerSetter;
