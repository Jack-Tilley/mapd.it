import React, { useState, useContext, useEffect } from "react";
import { MapContext } from "./MapContext";

import { Marker, Polyline, InfoWindow } from "@react-google-maps/api";

const ShapeSetter = () => {
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
  ] = useContext(MapContext);

  // useEffect(() => {
  //   console.log("shapes", shapes);
  // }, [shapes]);

  return (
    <>
      {shapes.map((shape) => {
        // !!!this is crazy inefficient: O(n^2), n = total nodes!!!
        let node = findNode(shape.value);
        // console.log("NODE", node);
        // if a node has been deleted or is missing
        if (node === null) {
          return null;
        }
        if (node.nodeType === "marker") {
          return (
            <Marker
              position={{
                lat: parseFloat(node.latLngArr[0]),
                lng: parseFloat(node.latLngArr[1]),
              }}
              key={shape.value}
              // label={shape.label}
              icon={{
                url: "/newIcons/" + node.iconValue + ".svg",
                scaledSize: new window.google.maps.Size(30, 30),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
              }}
              onClick={() => setSelected(node)}
            />
          );
        } else if (node.nodeType === "polyline") {
          let path = [];
          for (let i = 0; i < node.latLngArr.length; i += 2) {
            path.push({
              lat: parseFloat(node.latLngArr[i]),
              lng: parseFloat(node.latLngArr[i + 1]),
            });
          }
          return (
            <Polyline
              path={path}
              key={shape.value}
              onClick={() => setSelected(node)}
              options={{ strokeColor: node.color }}
            />
          );
        } else {
          return null;
        }
      })}
    </>
  );
};
export default ShapeSetter;

{
  /* {console.log("YY", findNode("yy").latLngArr[0].substring(1, 17))}
      {console.log("YY", findNode("yy").latLngArr[0].substring(20, 37))} */
}
// let mi = new window.google.maps.MarkerImage(
//   "/newIcons/" + node.iconValue + ".svg",
//   null,
//   null,
//   null,
//   new window.google.maps.Size(64, 64)
// );
