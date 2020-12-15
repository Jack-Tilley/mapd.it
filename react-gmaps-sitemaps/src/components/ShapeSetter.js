import { Marker, Polyline } from "@react-google-maps/api";
import React from "react";
import {
  useTreeContext,
  useNodeContext,
  useSelectedContext,
} from "./MapContext";
import { findNode } from "../utils/contextUtils";
import CustomPolyline from "./CustomShapes/CustomPolyline";
import CustomMarker from "./CustomShapes/CustomMarker";

const ShapeSetter = () => {
  // const { shapes, nodes, setSelected } = useContext(MapContext);
  const { shapes } = useTreeContext();
  const { nodes } = useNodeContext();
  const { setSelected } = useSelectedContext();

  return (
    <>
      {shapes.map((shape) => {
        // TODO !!!this is crazy inefficient: O(n^2), n = total nodes!!!
        let node = findNode(shape.value, nodes);
        // console.log("NODE", node);
        // if a node has been deleted or is missing
        if (node === null) {
          return null;
        }
        // console.log(<i className="material-icons icon-grey">{"refresh"}</i>);
        // console.log(<AccessAlarmIcon />);
        if (node.nodeType === "marker") {
          // let marker = new window.google.maps.Marker();
          // marker.setIcon("/newIcons/" + node.iconValue + ".svg");
          // console.log(marker);
          return (
            <CustomMarker
              node={node}
              setSelected={setSelected}
              key={node.value}
            />
            // <Marker
            //   position={{
            //     lat: parseFloat(node.latLngArr[0]),
            //     lng: parseFloat(node.latLngArr[1]),
            //   }}
            //   key={node.value}
            //   // label={shape.label}
            //   icon={{
            //     url: "/newIcons/" + node.iconValue + ".svg",
            //     scaledSize: new window.google.maps.Size(30, 30),
            //     origin: new window.google.maps.Point(0, 0),
            //     anchor: new window.google.maps.Point(15, 15),
            //   }}
            //   animation={window.google.maps.Animation.DROP}
            //   // onMouseOver={() => window.google.maps.Marker((title = "HELLO"))}
            //   // omMouseOut={() => handleMouseOut()}
            //   // onLoad={(marker) => {
            //   //   fetch("/newIcons/" + node.iconValue + ".svg")
            //   //     // Get SVG response as text
            //   //     .then((response) => response.text())
            //   //     // Parse to a DOM tree using DOMParser
            //   //     .then((str) =>
            //   //       new window.DOMParser().parseFromString(str, "text/xml")
            //   //     )
            //   //     // // Find path with id="myPath" and return the d attribute
            //   //     .then((data) =>
            //   //       data.getElementsByTagName("path")[0].getAttribute("d")
            //   //     )
            //   //     .then((path) => {
            //   //       const customIcon = (opts) =>
            //   //         Object.assign(
            //   //           {
            //   //             path: path,
            //   //             fillColor: node.color,
            //   //             fillOpacity: 1,
            //   //             strokeColor: node.color,
            //   //             strokeWeight: 1,
            //   //             // scaledSize: window.google.maps.Size(30, 30),
            //   //             origin: window.google.maps.Point(0, 0),
            //   //             anchor: window.google.maps.Point(15, 15),
            //   //             opacity: 1,
            //   //             scale: 1.5,
            //   //           },
            //   //           opts
            //   //         );
            //   //       marker.setIcon(customIcon({}));
            //   //     });
            //   // }}
            //   onClick={() => setSelected(node)}
            // />
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
            <CustomPolyline
              node={node}
              setSelected={setSelected}
              path={path}
              key={node.value}
            />
          );
          /* <Polyline
              path={path}
              key={shape.value}
              onClick={() => setSelected(node)}
              options={{ strokeColor: node.color }}
            /> */
        } else {
          return null;
        }
      })}
    </>
  );
};
export default ShapeSetter;

// let mi = new window.google.maps.MarkerImage(
//   "/newIcons/" + node.iconValue + ".svg",
//   null,
//   null,
//   null,
//   new window.google.maps.Size(64, 64)
// );
