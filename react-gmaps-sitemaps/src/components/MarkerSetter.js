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

  const findNode = (nodeValue) => {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].value === nodeValue) {
        return nodes[i];
      }
      if (nodes[i].children !== undefined) {
        for (let j = 0; j < nodes[i].children.length; j++) {
          if (nodes[i].children && nodes[i].children[j].value === nodeValue) {
            return nodes[i].children[j];
          }
        }
      }
    }
    return null;
  };

  let x;

  return (
    <>
      {markers.map((marker) => (
        <>
          <Marker
            position={{
              lat: parseFloat(
                findNode(marker.value).latLngArr[0].substring(1, 17)
              ),
              lng: parseFloat(
                findNode(marker.value).latLngArr[0].substring(20, 37)
              ),
            }}
            key={marker.value}
          />
        </>
      ))}
      {/* {console.log("YY", findNode("yy").latLngArr[0].substring(1, 17))}
      {console.log("YY", findNode("yy").latLngArr[0].substring(20, 37))} */}
    </>
  );
};
export default MarkerSetter;
