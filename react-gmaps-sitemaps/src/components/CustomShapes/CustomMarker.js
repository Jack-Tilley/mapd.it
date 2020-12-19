import React, { useState, useEffect } from "react";
import { Marker } from "@react-google-maps/api";

const CustomMarker = ({ node, setSelected }) => {
  const [showTitle, setShowTitle] = useState(false);
  const [path, setPath] = useState("");

  useEffect(() => {
    // console.log("ICONVALUE", node.iconValue);
    fetch("/newIcons/" + node.iconValue + ".svg")
      // Get SVG response as text
      .then((response) => response.text())
      // Parse to a DOM tree using DOMParser
      .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
      // // Find path with id="myPath" and return the d attribute
      .then((data) => data.getElementsByTagName("path")[0].getAttribute("d"))
      .then((path) => setPath(path));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseOver = (e) => {
    setShowTitle(true);
  };
  const handleMouseOut = (e) => {
    setShowTitle(false);
  };
  return (
    <Marker
      position={{
        lat: parseFloat(node.latLngArr[0]),
        lng: parseFloat(node.latLngArr[1]),
      }}
      key={node.value}
      label={{
        color: node.color,
        text: showTitle === true ? node.label : " ",
      }}
      icon={{
        path: path,
        fillColor: node.color,
        fillOpacity: 1,
        strokeColor: node.color,
        strokeWeight: 0.5,
        scale: 1.2,
        anchor: new window.google.maps.Point(10, 10),
        labelOrigin: new window.google.maps.Point(10, -5),
        // url: "/newIcons/" + node.iconValue + ".svg",
        // scaledSize: new window.google.maps.Size(30, 30), // doesn't do anything for path
        // origin: new window.google.maps.Point(0, 0), // doesnt do anything for path
      }}
      animation={window.google.maps.Animation.DROP}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      //   label={showTitle === true ? node.label : null}
      //   label={{
      //     position: "absolute",
      //     top: "5em",
      //     color: "red",
      //     text: "Hello world",
      //   }}
      // onMouseOver={() => window.google.maps.Marker((title = "HELLO"))}
      // omMouseOut={() => handleMouseOut()}
      // onLoad={(marker) => {
      //   fetch("/newIcons/" + node.iconValue + ".svg")
      //     // Get SVG response as text
      //     .then((response) => response.text())
      //     // Parse to a DOM tree using DOMParser
      //     .then((str) =>
      //       new window.DOMParser().parseFromString(str, "text/xml")
      //     )
      //     // // Find path with id="myPath" and return the d attribute
      //     .then((data) =>
      //       data.getElementsByTagName("path")[0].getAttribute("d")
      //     )
      //     .then((path) => {
      //       const customIcon = (opts) =>
      //         Object.assign(
      //           {
      //             path: path,
      //             fillColor: node.color,
      //             fillOpacity: 1,
      //             strokeColor: node.color,
      //             strokeWeight: 1,
      //             // scaledSize: window.google.maps.Size(30, 30),
      //             origin: window.google.maps.Point(0, 0),
      //             anchor: window.google.maps.Point(15, 15),
      //             opacity: 1,
      //             scale: 1.5,
      //           },
      //           opts
      //         );
      //       marker.setIcon(customIcon({}));
      //     });
      // }}
      onClick={() => setSelected(node)}
    />
  );
};

export default CustomMarker;
