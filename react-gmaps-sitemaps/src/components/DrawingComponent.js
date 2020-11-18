import React, { useState, useContext } from "react";
import { MapContext } from "./MapContext";
import { DrawingManager } from "@react-google-maps/api";
import axios from "axios";
import { parse, stringify } from "flatted";

const DrawingComponent = () => {
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
  ] = useContext(MapContext);

  const options = {
    polylineOptions: {
      strokeColor: color,
      // strokeWeight: 0.01,
      // editable : true,
    },
    markerOptions: {
      title: "Hello",
      label: "hi",
    },
  };

  const onPolylineComplete = (polyline) => {
    let roughPath = polyline.getPath().getArray().toString().split(",");
    let path = [];
    for (let i = 0; i < roughPath.length; i += 2) {
      path.push(roughPath[i].slice(1), roughPath[i + 1].slice(0, -1));
    }
    handleActiveNodeChange(path, "polyline", polyline, icon);
    console.log(polyline);

    polyline.setMap(null); // makes polyline invisible
    setDraw(false); // we do this instead of !draw because we want drawing component to leave when a new one is added
  };

  const onMarkerComplete = (marker) => {
    marker.title = activeNode.label;
    marker.label = activeNode.label;
    marker.icon = <i className={`material-icons icon-${color}`}>{icon}</i>;
    console.log("marker", marker);
    // marker.icon = icon // need to figure out how to get custom icon
    let position = [marker.position.lat(), marker.position.lng()];
    console.log("POSITION", position);
    handleActiveNodeChange(position, "marker", marker, icon);
    setDraw(false); // we do this instead of !draw because we want drawing component to leave when a new one is added
  };

  const onOverlayComplete = (e) => {
    // add overlay to nodes
    console.log("Drawing component unmounted");
  };

  const handleActiveNodeChange = async (
    position,
    nodeType,
    nodeReference,
    icon
  ) => {
    let newActiveNode = activeNode;
    newActiveNode.latLngArr = position;
    newActiveNode.nodeType = nodeType;
    newActiveNode.iconValue = icon;
    nodeReference.visible = false;
    // newActiveNode.nodeReference.visible = false;
    // newActiveNode.parent_id = activeNode.parent_id;
    setChecked([...checked, newActiveNode.value]);
    axios
      .post("http://localhost:8000/api/nodes/", {
        label: newActiveNode.label,
        nodeType: newActiveNode.nodeType,
        nodeReference: stringify(newActiveNode.nodeReference),
        value: newActiveNode.value,
        parent: newActiveNode.parent_id,
        apiPath: newActiveNode.apiPath,
        latLngArr: newActiveNode.latLngArr,
        isDir: newActiveNode.isDir,
        iconValue: icon,
        color: color,
      })
      .then((res) => {
        newActiveNode.id = res.data.id;
        setActiveNode(newActiveNode);
        setShapes([...shapes, newActiveNode]);
        console.log("RESPOST", res);
      })
      .catch((err) => console.log(err));
  };

  const renderDrawingComponent = () => (
    <>
      <DrawingManager
        onOverlayComplete={onOverlayComplete}
        onPolylineComplete={onPolylineComplete}
        onMarkerComplete={onMarkerComplete}
        options={{ options }}
      ></DrawingManager>
    </>
  );
  return draw ? renderDrawingComponent() : null;
};
export default DrawingComponent;
