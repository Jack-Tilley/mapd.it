import { Marker, Polyline } from "@react-google-maps/api";
import React, { useContext } from "react";
import { MapContext } from "./MapContext";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";

const ShapeSetter = () => {
  // const [
  //   myMap,
  //   setMyMap,
  //   center,
  //   setCenter,
  //   isLoaded,
  //   draw,
  //   setDraw,
  //   nodes,
  //   setNodes,
  //   activeNode,
  //   setActiveNode,
  //   icon,
  //   setIcon,
  //   shapes,
  //   setShapes,
  //   checked,
  //   setChecked,
  //   selected,
  //   setSelected,
  //   color,
  //   setColor,
  //   findNode,
  // ] = useContext(MapContext);
  const { shapes, setSelected, findNode } = useContext(MapContext);

  // useEffect(() => {
  //   console.log("shapes", shapes);
  // }, [shapes]);

  return (
    <>
      {shapes.map((shape) => {
        // TODO !!!this is crazy inefficient: O(n^2), n = total nodes!!!
        let node = findNode(shape.value);
        // console.log("NODE", node);
        // if a node has been deleted or is missing
        if (node === null) {
          return null;
        }
        console.log(<i className="material-icons icon-grey">{"refresh"}</i>);
        console.log(<AccessAlarmIcon />);
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

// let mi = new window.google.maps.MarkerImage(
//   "/newIcons/" + node.iconValue + ".svg",
//   null,
//   null,
//   null,
//   new window.google.maps.Size(64, 64)
// );
