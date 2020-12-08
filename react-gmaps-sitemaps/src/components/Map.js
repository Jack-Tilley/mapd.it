import React, { useState, useContext, useRef } from "react";
import { MapContext } from "./MapContext";
import { GoogleMap, InfoWindow, useGoogleMap } from "@react-google-maps/api";
import DrawingComponent from "./DrawingComponent";
import ShapeSetter from "./ShapeSetter";
import AutocompleteBox from "./AutocompleteBox";
import Directions from "./Directions";
import InfoContainer from "./InfoContainer";
import SettingsModal from "./settings/SettingsModal";
import HistoryDrawer from "./HistoryDrawer";
import DistanceFinder from "./mapTools/DistanceFinder";
import PanTool from "./mapTools/PanTool";
import RefreshButton from "./mapTools/RefreshButton";
import ToolContainer from "./mapTools/ToolContainer";
import SiteTree from "./SiteTree";

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
    // zoomControl: true,
  };

  const renderMap = () => (
    <>
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "90vh",
        }}
        zoom={10}
        center={center}
        onLoad={(map) => setMyMap(map)}
        options={options}
        onRightClick={() => console.log("rightClick")}
        onClick={() => setSelected(null)}
      >
        <div className="treeContainer">
          <SiteTree />
        </div>
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
        <HistoryDrawer />
        {/* <DistanceFinder />
        <PanTool />
        <RefreshButton /> */}
        <ToolContainer />
      </GoogleMap>
    </>
  );

  return isLoaded ? renderMap() : null;
};

export default Map;
