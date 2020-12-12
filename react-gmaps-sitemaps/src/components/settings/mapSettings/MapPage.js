import React, { useState, useContext, useEffect } from "react";
import MapThemeSelector from "./MapThemeSelector";
import PaletteThemeSelector from "./PaletteThemeSelector";
import MapTypeSelector from "./MapTypeSelector";

const MapPage = ({
  rendered,
  mapStyle,
  setMapStyle,
  darkMode,
  setDarkMode,
  mapTypes,
  setMapTypes,
}) => {
  return rendered ? (
    <div>
      <MapThemeSelector mapStyle={mapStyle} setMapStyle={setMapStyle} />
      {/* <PaletteThemeSelector darkMode={darkMode} setDarkMode={setDarkMode} /> */}
      <MapTypeSelector mapTypes={mapTypes} setMapTypes={setMapTypes} />
    </div>
  ) : null;
};
export default MapPage;
