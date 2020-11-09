import React, { useState, useContext, useEffect } from "react";
import { MapContext } from "./MapContext";

import { Marker, Polyline } from "@react-google-maps/api";

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
    shapes,
    setShapes,
  ] = useContext(MapContext);

  useEffect(() => {
    console.log(shapes);
  }, [shapes]);

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

  return (
    <>
      {shapes.map((shape) => {
        let node = findNode(shape.value);
        if (node.nodeType === "marker") {
          return (
            <Marker
              position={{
                lat: parseFloat(node.latLngArr[0].substring(1, 17)),
                lng: parseFloat(node.latLngArr[0].substring(20, 37)),
              }}
              key={shape.value}
            />
          );
        } else if (node.nodeType === "polyline") {
          return (
            <Polyline
              path={[
                { lat: 40, lng: -75 },
                { lat: 39.9, lng: -74.9 },
                { lat: 39.9, lng: -75.1 },
                { lat: 40, lng: -75 },
              ]}
              key={shape.value}
            />
          );
        } else {
          return <></>;
        }
      })}
    </>
  );
};
export default MarkerSetter;

{
  /* {console.log("YY", findNode("yy").latLngArr[0].substring(1, 17))}
      {console.log("YY", findNode("yy").latLngArr[0].substring(20, 37))} */
}
