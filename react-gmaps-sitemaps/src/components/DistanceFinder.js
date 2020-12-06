import React, { useState, useContext } from "react";

import IconButton from "@material-ui/core/IconButton";
import { MapContext } from "./MapContext";

import { Paper } from "@material-ui/core";
import {
  Polyline,
  Marker,
  OverlayView,
  useGoogleMap,
} from "@react-google-maps/api";

const getDistance = (lat1, lon1, lat2, lon2) => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

const distanceConverter = (distance) => {
  if (distance > 1) {
    return distance.toFixed(2) + " km";
  } else {
    return (distance * 1000).toFixed(2) + " m";
  }
};

export default function DistanceFinder() {
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
    removeNode,
    nodeType,
    setNodeType,
    disabled,
    setDisabled,
    editing,
    setEditing,
    editValue,
    setEditValue,
    replaceNode,
    editCleanup,
    changeIcons,
    description,
    setDescription,
    comment,
    setComment,
    label,
    setLabel,
    auth,
    setAuth,
    profileId,
    setProfileId,
    teams,
    setTeams,
    selectedTeams,
    setSelectedTeams,
    updateNodes,
  ] = useContext(MapContext);
  const map = useGoogleMap();
  let lat = map.getCenter().lat();
  let lng = map.getCenter().lng();
  const [rendered, setRendered] = useState(false);
  const [m1, setM1] = useState({ lat: lat, lng: lng });
  const [m2, setM2] = useState({ lat: lat, lng: lng });
  const [distanceLabel, setDistanceLabel] = useState(
    distanceConverter(getDistance(m1.lat, m1.lng, m2.lat, m2.lng))
  );
  const [p, setP] = useState([
    { lat: m1.lat, lng: m1.lng },
    { lat: m2.lat, lng: m2.lng },
  ]);
  const [midpoint, setMidpoint] = useState({
    lat: (m1.lat + m2.lat) / 2,
    lng: (m1.lng + m2.lng) / 2,
  });

  const changePosition1 = (e) => {
    const elat = e.latLng.lat();
    const elng = e.latLng.lng();
    setM1({ lat: elat, lng: elng });
    setP([
      { lat: elat, lng: elng },
      { lat: m2.lat, lng: m2.lng },
    ]);
    setMidpoint({ lat: (elat + m2.lat) / 2, lng: (elng + m2.lng) / 2 });
    setDistanceLabel(
      distanceConverter(getDistance(elat, elng, m2.lat, m2.lng))
    );
  };
  const changePosition2 = (e) => {
    const elat = e.latLng.lat();
    const elng = e.latLng.lng();
    setM2({ lat: elat, lng: elng });
    setP([
      { lat: m1.lat, lng: m1.lng },
      { lat: elat, lng: elng },
    ]);
    setMidpoint({ lat: (elat + m1.lat) / 2, lng: (elng + m1.lng) / 2 });
    setDistanceLabel(
      distanceConverter(getDistance(m1.lat, m1.lng, elat, elng))
    );
  };

  const handleDistanceButtonClick = () => {
    lat = map.getCenter().lat();
    lng = map.getCenter().lng();
    setM1({ lat: lat, lng: lng });
    setM2({ lat: lat, lng: lng });
    setP([
      { lat: lat, lng: lng },
      { lat: lat, lng: lng },
    ]);
    setDistanceLabel(
      distanceConverter(getDistance(m1.lat, m1.lng, m2.lat, m2.lng))
    );
    setMidpoint({ lat: lat, lng: lng });
    setRendered(!rendered);
  };
  return (
    <>
      <div style={{ position: "absolute", right: "1em", top: "15em" }}>
        <Paper>
          <IconButton onClick={() => handleDistanceButtonClick()} size="small">
            <i className="material-icons icon-grey">{"measure"}</i>
          </IconButton>
        </Paper>
      </div>
      {rendered ? (
        <>
          <Marker
            position={m1}
            draggable={true}
            onDrag={(e) => changePosition1(e)}
            icon={{
              url: "/newIcons/room.svg",
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
          <Marker
            position={m2}
            draggable={true}
            onDrag={(e) => changePosition2(e)}
            icon={{
              url: "/newIcons/room.svg",
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
          <Polyline path={p} />
          <OverlayView
            position={{ lat: midpoint.lat, lng: midpoint.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div style={{ color: "black", background: "white" }}>
              {distanceLabel}
            </div>
          </OverlayView>
        </>
      ) : null}
    </>
  );
}
