import React, { useState } from "react";
import { Polyline, OverlayView } from "@react-google-maps/api";

const CustomPolyline = ({ node, setSelected, path }) => {
  const [showTitle, setShowTitle] = useState(false);
  const [overlayPosition, setOverlayPosition] = useState({
    lat: parseFloat(path[0].lat),
    lng: parseFloat(path[0].lng),
  });

  const handleMouseOver = (e) => {
    setOverlayPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    setShowTitle(true);
  };
  const handleMouseOut = (e) => {
    setShowTitle(false);
  };
  return (
    <>
      <Polyline
        path={path}
        key={node.value}
        onClick={() => setSelected(node)}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        options={{ strokeColor: node.color }}
      />
      <OverlayView
        position={{
          lat: overlayPosition.lat,
          lng: overlayPosition.lng,
        }}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <div style={{ color: node.color }}>
          <h3 style={{ position: "absolute", top: "-20px", left: "-20px" }}>
            {showTitle === true ? node.label : null}
          </h3>
        </div>
      </OverlayView>
    </>
  );
};

export default CustomPolyline;
