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
  ] = useContext(MapContext);

  const options = {
    polylineOptions: {
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
    setDraw(false); // we do this instead of !draw because we want drawing component to leave when a new one is added
  };

  const onMarkerComplete = (marker) => {
    marker.title = activeNode.label;
    marker.label = activeNode.label;
    marker.icon = <i className="material-icons">{icon}</i>;
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
    await setActiveNode(newActiveNode);
    setShapes([...shapes, newActiveNode]);
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
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    // ADD API UPDATES HERE
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
