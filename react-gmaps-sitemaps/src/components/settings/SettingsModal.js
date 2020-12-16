import { Paper, Tooltip } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { useGoogleMap } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { useProfileContext, useTeamContext } from "../MapContext";
import { blackout } from "../mapStyles/blackout";
import { bluegray } from "../mapStyles/bluegray";
import { flatpale } from "../mapStyles/flatpale";
import { greyscale } from "../mapStyles/greyscale";
import { hopper } from "../mapStyles/hopper";
import { night } from "../mapStyles/night";
import { paledawn } from "../mapStyles/paledawn";
import { unsaturated } from "../mapStyles/unsaturated";
import { familiar } from "../mapStyles/familiar";
import AccountPage from "./accountSettings/AccountPage";
import MapPage from "./mapSettings/MapPage";
import TeamPage from "./teamSettings/TeamPage";
import { updateNodes } from "../../utils/contextUtils";

const SettingsModal = ({
  settingsOpen,
  setSettingsOpen,
  darkMode,
  setDarkMode,
}) => {
  const { profileId } = useProfileContext();
  const { teams } = useTeamContext();
  const [page, setPage] = useState("map");
  const [mapSettingsRendered, setMapSettingsRendered] = useState(true);
  const [teamSettingsRendered, setTeamSettingsRendered] = useState(false);
  const [accountSettingsRendered, setAccountSettingsRendered] = useState(false);
  const [mapColor, setMapColor] = useState("default");
  const [teamColor, setTeamColor] = useState("primary");
  const [accountColor, setAccountColor] = useState("primary");
  const map = useGoogleMap();

  const [mapStyle, setMapStyle] = useState(
    localStorage.getItem("mapStyle") || "bluegray"
  );
  const [mapTypes, setMapTypes] = useState("roadmap");

  useEffect(() => {
    // console.log("map or mapStyle has updated");
    if (mapStyle === "bluegray") {
      map.setOptions({ styles: bluegray });
    } else if (mapStyle === "greyscale") {
      map.setOptions({ styles: greyscale });
    } else if (mapStyle === "unsaturated") {
      map.setOptions({ styles: unsaturated });
    } else if (mapStyle === "flatpale") {
      map.setOptions({ styles: flatpale });
    } else if (mapStyle === "hopper") {
      map.setOptions({ styles: hopper });
    } else if (mapStyle === "night") {
      map.setOptions({ styles: night });
    } else if (mapStyle === "paledawn") {
      map.setOptions({ styles: paledawn });
    } else if (mapStyle === "familiar") {
      map.setOptions({ styles: familiar });
    } else if (mapStyle === "blackout") {
      map.setOptions({ styles: blackout });
    } else {
      map.setOptions({ styles: null });
    }
    localStorage.setItem("mapStyle", mapStyle);
  }, [mapStyle, map]);

  useEffect(() => {
    map.setOptions({ mapTypeId: mapTypes });
  }, [mapTypes, map]);

  const handleClose = () => {
    setSettingsOpen(false);
  };

  const changePage = (value) => {
    setPage(value);
    if (value === "map") {
      setMapSettingsRendered(true);
      setTeamSettingsRendered(false);
      setAccountSettingsRendered(false);
      setMapColor("default");
      setTeamColor("primary");
      setAccountColor("primary");
    } else if (value === "team") {
      setMapSettingsRendered(false);
      setTeamSettingsRendered(true);
      setAccountSettingsRendered(false);
      setMapColor("primary");
      setTeamColor("default");
      setAccountColor("primary");
    } else if (value === "account") {
      setMapSettingsRendered(false);
      setTeamSettingsRendered(false);
      setAccountSettingsRendered(true);
      setMapColor("primary");
      setTeamColor("primary");
      setAccountColor("default");
    } else {
      console.log("WE ARE NOT RENDERING THE CORRECT THING");
    }
    renderPage();
  };

  const renderPage = () => {
    if (page === "map") {
      return (
        <MapPage
          rendered={mapSettingsRendered}
          mapStyle={mapStyle}
          setMapStyle={setMapStyle}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          mapTypes={mapTypes}
          setMapTypes={setMapTypes}
        />
      );
    } else if (page === "team") {
      return (
        <TeamPage
          rendered={teamSettingsRendered}
          teams={teams}
          profileId={profileId}
          updateNodes={updateNodes}
        />
      );
    } else if (page === "account") {
      return (
        <AccountPage rendered={accountSettingsRendered} profileId={profileId} />
      );
    } else {
      return <div>RENDER ERROR</div>;
    }
  };

  return (
    <div>
      <Paper
        style={{
          position: "absolute",
          bottom: "1.5em",
          left: "1em",
        }}
      >
        <Tooltip title="Settings">
          <IconButton onClick={() => setSettingsOpen(true)} size="small">
            <i className="material-icons icon-grey">{"settings"}</i>
          </IconButton>
        </Tooltip>
      </Paper>
      <Dialog
        fullWidth={true}
        maxWidth={"xs"}
        open={settingsOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{`Settings - ${page}`}</DialogTitle>
        <DialogContent id="settings" dividers={true}>
          {renderPage()}
        </DialogContent>
        <DialogActions>
          <Button
            style={{ position: "absolute", left: "1.5em" }}
            onClick={() => handleClose()}
            color="secondary"
          >
            Done
          </Button>
          <Button onClick={() => changePage("map")} color={mapColor}>
            Map
          </Button>
          <Button onClick={() => changePage("team")} color={teamColor}>
            Team
          </Button>
          {/* <Button onClick={() => changePage("account")} color={accountColor}>
            Account
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SettingsModal;
