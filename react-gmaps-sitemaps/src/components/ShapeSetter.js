import React, { useState, useContext, useEffect } from "react";
import { MapContext } from "./MapContext";

import { Marker, Polyline } from "@react-google-maps/api";

const ShapeSetter = ({ gm }) => {
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
        console.log("NODEICON", node.iconValue);
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
              onClick={() => {
                console.log(shape.label);
              }}
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
              onClick={() => console.log("hello")}
            />
          );
        } else {
          return <></>;
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
