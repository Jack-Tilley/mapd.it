import React, { useState, useContext } from "react";
import { MapContext } from "./MapContext";
import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
import DrawingComponent from "./DrawingComponent";
import ShapeSetter from "./ShapeSetter";

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = () => {
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
    markers,
    setMarkers,
    polylines,
    setPolylines,
  ] = useContext(MapContext);
  const [autocomplete, setAutocomplete] = useState(null);

  const renderMap = () => (
    <>
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "100%",
        }}
        zoom={10}
        center={center}
        onLoad={(map) => setMyMap(map)}
        options={options}
      >
        <Autocomplete
          onLoad={(autoc) => setAutocomplete(autoc)}
          onPlaceChanged={() => {
            if (autocomplete !== null) {
              setCenter({
                lat: autocomplete.getPlace().geometry.location.lat(),
                lng: autocomplete.getPlace().geometry.location.lng(),
              });
            }
          }}
        >
          <input
            type="text"
            placeholder="Find Someplace!"
            style={{
              top: "0rem",
              left: "50%",
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              marginLeft: "-120px",
            }}
          />
        </Autocomplete>
        <DrawingComponent />
        <ShapeSetter />
      </GoogleMap>
    </>
  );

  return isLoaded ? renderMap() : null;
};

export default Map;
