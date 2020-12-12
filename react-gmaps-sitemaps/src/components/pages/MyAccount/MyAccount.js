import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import MailIcon from "@material-ui/icons/Mail";
import React, { useContext, useState } from "react";
import { MapContext } from "../../MapContext";
import AccountPage from "../../settings/accountSettings/AccountPage";
import TeamPage from "../../settings/teamSettings/TeamPage";

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
  //   color,
  //   setColor,
  //   findNode,
  //   removeNode,
  //   nodeType,
  //   setNodeType,
  //   disabled,
  //   setDisabled,
  //   editing,
  //   setEditing,
  //   editValue,
  //   setEditValue,
  //   replaceNode,
  //   editCleanup,
  //   changeIcons,
  //   description,
  //   setDescription,
  //   comment,
  //   setComment,
  //   label,
  //   setLabel,
  //   auth,
  //   setAuth,
  //   profileId,
  //   setProfileId,
  //   teams,
  //   setTeams,
  //   selectedTeams,
  //   setSelectedTeams,
  //   updateNodes,
  //   picture,
  //   setPicture,
  // ] = useContext(MapContext);
  const { profileId, teams, updateNodes } = useContext(MapContext);
  const classes = useStyles();
  const [picked, setPicked] = useState("account");

  const handleTabChange = (tab) => {
    setPicked(tab);
  };

  return (
    <>
      <div className={classes.root}>
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
            <AccountPage
              rendered={picked === "account" ? true : false}
              profileId={profileId}
            />
            <TeamPage
              rendered={picked === "teams" ? true : false}
              teams={teams}
              profileId={profileId}
              updateNodes={updateNodes}
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
