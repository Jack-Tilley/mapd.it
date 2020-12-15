import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import MailIcon from "@material-ui/icons/Mail";
import { Helmet } from "react-helmet";
import React, { useContext, useState } from "react";
import {
  MapContext,
  useTeamContext,
  useProfileContext,
  useNodeContext,
} from "../../MapContext";
import AccountPage from "../../settings/accountSettings/AccountPage";
import TeamPage from "../../settings/teamSettings/TeamPage";
import AccountSettings from "./AccountSettings";
import { updateNodes } from "../../../utils/contextUtils";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    zIndex: 10,
    flexShrink: 0,
    // color: theme.palette.text,
  },
  drawerPaper: {
    width: drawerWidth,
    color: "#f7f8fa",
    background: "#1c2237",
    // color: theme.palette.text,
  },
  drawerContainer: {
    overflow: "auto",
    // color: theme.palette.text,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const MyAccount = () => {
  const { profileId } = useProfileContext();
  const { teams, setTeams } = useTeamContext();
  const { setNodes } = useNodeContext();
  const classes = useStyles();
  const [picked, setPicked] = useState("account");

  const handleTabChange = (tab) => {
    setPicked(tab);
  };

  return (
    <>
      <div className={classes.root}>
        <Helmet>
          <title>Account | mapd.it</title>
          <meta
            name="description"
            content="Collaborate with your team no matter where you are on the map. See what your teams are up to anywhere on the map. View changes and statistics your team is making."
          />
        </Helmet>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List>
              <ListItem key={"initial"}></ListItem>
              <ListItem key={"SETTINGS"}>
                <ListItemText primary={"SETTINGS"} />
              </ListItem>
              <Divider light={true} />
              <ListItem
                button
                key={"account"}
                onClick={() => handleTabChange("account")}
              >
                <ListItemIcon>
                  <MailIcon style={{ color: "#f7f8fa" }} />
                </ListItemIcon>
                <ListItemText primary={"Account"} />
              </ListItem>
              <Divider light={true} />
              <ListItem
                button
                key={"teams"}
                onClick={() => handleTabChange("teams")}
              >
                <ListItemIcon>
                  <MailIcon style={{ color: "#f7f8fa" }} />
                </ListItemIcon>
                <ListItemText primary={"Teams"} />
              </ListItem>
              <Divider light={true} />
              <ListItem
                button
                key={"map"}
                onClick={() => handleTabChange("map")}
              >
                <ListItemIcon>
                  <MailIcon style={{ color: "#f7f8fa" }} />
                </ListItemIcon>
                <ListItemText primary={"Map - Coming Soon"} />
              </ListItem>
              <ListItem
                button
                key={"insights"}
                onClick={() => handleTabChange("insights")}
              >
                <ListItemIcon>
                  <MailIcon style={{ color: "#f7f8fa" }} />
                </ListItemIcon>
                <ListItemText primary={"Insights - Coming Soon"} />
              </ListItem>
              {/* <ListItem
                button
                key={"logout"}
                onClick={() => handleTabChange("logout")}
              >
                <ListItemIcon>
                  <MailIcon style={{ color: "#f7f8fa" }} />
                </ListItemIcon>
                <ListItemText primary={"Logout - Coming Soon"} />
              </ListItem> */}
            </List>
            <Divider light={true} />
          </div>
        </Drawer>
        <main className={classes.content}>
          <div>
            <AccountSettings
              rendered={picked === "account" ? true : false}
              profileId={profileId}
            />
            <TeamPage
              rendered={picked === "teams" ? true : false}
              teams={teams}
              profileId={profileId}
              updateNodes={updateNodes}
              setNodes={setNodes}
              setTeams={setTeams}
            />
            {/* <MapPage rendered={true} teams={teams} profileId={profileId} updateNodes={updateNodes}/> */}
            {/* <Logout rendered={picked === "logout" ? true : false} /> */}
          </div>
        </main>
      </div>
    </>
  );
};

export default MyAccount;
