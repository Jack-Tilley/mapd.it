import "./App.css";
import { MapProvider } from "./components/MapContext";
import Map from "./components/Map";
import SiteTree from "./components/SiteTree";
import Login from "./components/accounts/Login";
import Register from "./components/accounts/Register";
import PrivateRoute from "./components/common/PrivateRoute";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import Home from "./components/pages/HomePage/Home";
import Services from "./components/pages/Services/Services";
import Features from "./components/pages/Features/Features";
import SignUp from "./components/pages/SignUp/SignUp";
import SignIn from "./components/pages/SignIn/SignIn";
import MyAccount from "./components/pages/MyAccount/MyAccount";
import Navbar from "./components/Navbar";
// import Footer from "./components/pages/Footer/Footer";

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
      {/* <Paper style={{ padding: 0, margin: 0 }}> */}
      <MapProvider>
        <Router>
          <Navbar />
          <Switch>
            <PrivateRoute
              exact
              path="/map"
              component={() => (
                <Map darkMode={darkMode} setDarkMode={setDarkMode} />
              )}
            />
            <PrivateRoute
              exact
              path="/account"
              component={() => <MyAccount />}
            />
            {/* <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} /> */}
            <Route exact path="/" component={Home} />
            <Route path="/services" component={Services} />
            <Route path="/features" component={Features} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/sign-in" component={SignIn} />
          </Switch>
        </Router>
      </MapProvider>
      {/* </Paper> */}
    </ThemeProvider>
  );
}

export default App;
