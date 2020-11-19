import React, { useState, useContext } from "react";
import { MapContext } from "./MapContext";
import { GoogleMap, InfoWindow, useGoogleMap } from "@react-google-maps/api";
import DrawingComponent from "./DrawingComponent";
import ShapeSetter from "./ShapeSetter";
import AutocompleteBox from "./AutocompleteBox";
import Directions from "./Directions";
import InfoContainer from "./InfoContainer";
import SettingsModal from "./SettingsModal";

import { Paper } from "@material-ui/core";

const Map = ({ darkMode, setDarkMode }) => {
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
  ] = useContext(MapContext);

  const [settingsOpen, setSettingsOpen] = useState(false);

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  };

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
        <AutocompleteBox center={center} setCenter={setCenter} />
        <DrawingComponent />
        <ShapeSetter />
        {/* <Directions /> */}
        <InfoContainer />
        <SettingsModal
          settingsOpen={settingsOpen}
          setSettingsOpen={setSettingsOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      </GoogleMap>
    </>
  );

  return isLoaded ? renderMap() : null;
};

export default Map;
