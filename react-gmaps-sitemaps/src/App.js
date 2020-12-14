import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./components/AuthContext";
import PrivateRoute from "./components/common/PrivateRoute";
import Map from "./components/Map";
import {
  MapProvider,
  NodeProvider,
  DrawProvider,
  TreeProvider,
  SelectedProvider,
  AddEditProvider,
  ProfileProvider,
  TeamProvider,
} from "./components/MapContext";
import Navbar from "./components/Navbar";
import Features from "./components/pages/Features/Features";
import Home from "./components/pages/HomePage/Home";
import NotFound from "./components/pages/NotFound/NotFound";
import MyAccount from "./components/pages/MyAccount/MyAccount";
import Services from "./components/pages/Services/Services";
import SignIn from "./components/pages/SignIn/SignIn";
import SignUp from "./components/pages/SignUp/SignUp";
import About from "./components/pages/About/About";

// import Footer from "./components/pages/Footer/Footer";

function App() {
  // const [darkMode, setDarkMode] = useState(
  //   "true" === localStorage.getItem("darkMode") || false
  // );
  const [darkMode, setDarkMode] = useState(false);
  const theme = createMuiTheme({
    // palette: {
    //   type: darkMode ? "dark" : "light",
    // },
  });
  return (
    <ThemeProvider theme={theme}>
      {/* <Paper style={{ padding: 0, margin: 0 }}> */}
      <AuthProvider>
        <MapProvider>
          <NodeProvider>
            <DrawProvider>
              <TreeProvider>
                <SelectedProvider>
                  <AddEditProvider>
                    <ProfileProvider>
                      <TeamProvider>
                        <Router>
                          <Navbar />
                          <Switch>
                            <PrivateRoute
                              exact
                              path="/map"
                              component={() => (
                                <Map
                                  darkMode={darkMode}
                                  setDarkMode={setDarkMode}
                                />
                              )}
                            />
                            <PrivateRoute
                              exact
                              path="/account"
                              component={() => <MyAccount />}
                            />
                            <Route exact path="/" component={Home} />
                            <Route exact path="/about" component={About} />
                            <Route path="/services" component={Services} />
                            <Route path="/features" component={Features} />
                            <Route path="/sign-up" component={SignUp} />
                            <Route path="/sign-in" component={SignIn} />
                            <Route path="*" component={NotFound} />
                          </Switch>
                        </Router>
                      </TeamProvider>
                    </ProfileProvider>
                  </AddEditProvider>
                </SelectedProvider>
              </TreeProvider>
            </DrawProvider>
          </NodeProvider>
        </MapProvider>
      </AuthProvider>
      {/* </Paper> */}
    </ThemeProvider>
  );
}

export default App;
