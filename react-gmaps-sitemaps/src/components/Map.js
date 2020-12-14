import { GoogleMap } from "@react-google-maps/api";
import React, { useContext, useState } from "react";
import AutocompleteBox from "./AutocompleteBox";
import DrawingComponent from "./DrawingComponent";
import HistoryDrawer from "./HistoryDrawer";
import InfoContainer from "./InfoContainer";
import { MapContext, useMapContext, useSelectedContext } from "./MapContext";
import ToolContainer from "./mapTools/ToolContainer";
import SettingsModal from "./settings/SettingsModal";
import ShapeSetter from "./ShapeSetter";
import SiteTree from "./SiteTree";

const Map = ({ darkMode, setDarkMode }) => {
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
  // ] = useContext(MapContext);
  const { center, setCenter, setMyMap, isLoaded } = useMapContext();
  const { selected, setSelected } = useSelectedContext();
  // const [center, setCenter] = values.center;
  // const [myMap, setMyMap] = values.myMap;
  // const [selected, setSelected] = values.myMap;
  // const [isLoaded] = values.isLoaded;

  const [settingsOpen, setSettingsOpen] = useState(false);

  const options = {
    disableDefaultUI: true,
    // zoomControl: true,
  };

  const renderMap = () => (
    <>
      {/* 80 px is our view height of the navbar */}
      {console.log("Map updated")}
      <GoogleMap
        mapContainerStyle={{
          // paddingTop: "80px",
          // overflow: "hidden",
          width: "100%",
          height: "calc(100vh - 80px)",
          maxHeight: "calc(100vh - 80px)",
          position: "absolute",
          bottom: 0,
          margin: 0,
          // display: "flex",
          // bottom: 0,
        }}
        zoom={10}
        center={center}
        onLoad={(map) => setMyMap(map)}
        options={options}
        onRightClick={() => console.log("rightClick")}
        onClick={() => setSelected(null)}
      >
        <div className="treeContainer">
          <SiteTree className="treeContainer" />
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
        <ToolContainer />
      </GoogleMap>
    </>
  );

  return isLoaded ? renderMap() : null;
};

export default Map;
