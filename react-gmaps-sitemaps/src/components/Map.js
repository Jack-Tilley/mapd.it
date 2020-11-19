import React, { useState, useContext } from "react";
import { MapContext } from "./MapContext";
import { GoogleMap, InfoWindow } from "@react-google-maps/api";
import DrawingComponent from "./DrawingComponent";
import ShapeSetter from "./ShapeSetter";
import AutocompleteBox from "./AutocompleteBox";
import Directions from "./Directions";
import InfoContainer from "./InfoContainer";
import SettingsModal from "./SettingsModal";

import vibrant from "./mapStyles/vibrant";
import greyscale from "./mapStyles/greyscale";
import night from "./mapStyles/night";
import hopper from "./mapStyles/hopper";
import flatpale from "./mapStyles/flatpale";
import blackout from "./mapStyles/blackout";
import unsaturated from "./mapStyles/unsaturated";
import bluegray from "./mapStyles/bluegray";
import paledawn from "./mapStyles/paledawn";

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
    shapes,
    setShapes,
    checked,
    setChecked,
    selected,
    setSelected,
  ] = useContext(MapContext);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mapStyle, setMapStyle] = useState("");

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
    styles: { mapStyle },
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
        />
      </GoogleMap>
    </>
  );

  return isLoaded ? renderMap() : null;
};

export default Map;
