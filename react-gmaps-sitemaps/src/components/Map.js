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
import PersonalLocator from "./PersonalLocator";
import { Helmet } from "react-helmet";

const Map = ({ darkMode, setDarkMode }) => {
  const { center, setCenter, setMyMap, isLoaded } = useMapContext();
  const { setSelected } = useSelectedContext();

  const [settingsOpen, setSettingsOpen] = useState(false);

  const options = {
    disableDefaultUI: true,
    // zoomControl: true,
  };

  const renderMap = () => (
    <>
      <Helmet>
        <title>Map | mapd.it</title>
        <meta
          name="description"
          content="Collaborate with your team no matter where you are. Use the map to plan and organize your jobs."
        />
      </Helmet>
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
        <PersonalLocator setCenter={setCenter} />
      </GoogleMap>
    </>
  );

  return isLoaded ? renderMap() : null;
};

export default Map;
