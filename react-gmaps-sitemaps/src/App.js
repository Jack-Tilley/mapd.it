import "./App.css";
import { MapProvider } from "./components/MapContext";
import Map from "./components/Map";
import SiteTree from "./components/SiteTree";
import HistoryDrawer from "./components/HistoryDrawer";
import React, { useState } from "react";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <div style={{ height: "500px" }}>
          <MapProvider>
            <Map darkMode={darkMode} setDarkMode={setDarkMode} />
            <div className="treeContainer">
              <SiteTree />
            </div>
          </MapProvider>
          <HistoryDrawer />
        </div>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
