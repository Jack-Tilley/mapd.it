import { Paper } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import { makeStyles } from "@material-ui/core/styles";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import React, { useContext, useEffect, useState } from "react";
import { MapContext } from "./MapContext";

const useStyles = makeStyles({
  list: {
    width: 220,
  },
  fullList: {
    width: "auto",
  },
});

export default function HistoryDrawer() {
  const { teams } = useContext(MapContext);
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // console.log("teams", teams);
    // setHistory([]);
    // for (let team of teams) {
    //   axios
    //     .get(`http://localhost:8000/api/team_history/${team.id}`)
    //     .then((res) => {
    //       console.log(res.data);
    //       for (let i = 0; i < res.data.length; i++) {
    //         for (let j = 0; j < res.data[i].history.length; j++) {
    //           let tmp = {
    //             label: res.data[i].history[j].label,
    //             modified: res.data[i].history[j].modified,
    //           };
    //           let newHistory = history;
    //           newHistory.push(tmp);
    //           setHistory(newHistory);
    //         }
    //       }
    //     })
    //     .catch((err) => console.log(err));
    // }
    // console.log("history", history);
  }, []);

  const toggleDrawer = () => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(!open);
  };

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List
        subheader={<ListSubheader disableSticky={true}>History</ListSubheader>}
      >
        {history.map((node) => (
          <ListItem button key={node.modified}>
            <ListItemIcon>
              <InboxIcon /> :
            </ListItemIcon>
            <ListItemText
              primary={node.label}
              secondary={"modified at: " + node.modified}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div style={{ position: "absolute", right: "1em", top: "1em" }}>
      <Paper>
        <IconButton onClick={toggleDrawer(true)} size="small">
          <i className="material-icons icon-grey">{"event_note"}</i>
        </IconButton>
      </Paper>
      <Drawer anchor={"right"} open={open} onClose={toggleDrawer(false)}>
        {list()}
        <ListItem key={"coming soon"}>
          <ListItemText primary={"Coming Soon..."} />
        </ListItem>
      </Drawer>
    </div>
  );
}
