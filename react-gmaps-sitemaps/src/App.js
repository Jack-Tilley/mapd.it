import "./App.css";
import { MapProvider } from "./components/MapContext";
import Map from "./components/Map";
import SiteTree from "./components/SiteTree";
import HistoryDrawer from "./components/HistoryDrawer";
import RefreshButton from "./components/RefreshButton";
import Login from "./components/accounts/Login";
import Register from "./components/accounts/Register";
import PrivateRoute from "./components/common/PrivateRoute";
import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

function App() {
  const [darkMode, setDarkMode] = useState(
    "true" === localStorage.getItem("darkMode") || false
  );
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ padding: 0, margin: 0 }}>
        <MapProvider>
          <Router>
            <Switch>
              <PrivateRoute
                exact
                path="/"
                component={() => (
                  <>
                    <Map darkMode={darkMode} setDarkMode={setDarkMode} />
                    <div className="treeContainer">
                      <SiteTree />
                    </div>
                  </>
                )}
              />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </Router>
        </MapProvider>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
