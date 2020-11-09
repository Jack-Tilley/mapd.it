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
          <Marker position={{ lat: 40, lng: -75 }} key={marker.value} />
        </>
      ))}
    </>
  );
};
export default MarkerSetter;
