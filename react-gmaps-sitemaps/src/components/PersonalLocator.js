import { Paper } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import { useGoogleMap } from "@react-google-maps/api";

export default function PersonalLocator() {
  const map = useGoogleMap();
  const handleClick = (e) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(
      (position) =>
        map.panTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      //   setCenter({
      //     lat: position.coords.latitude,
      //     lng: position.coords.longitude,
      //   })
    );
    //   setCenter()
  };
  return (
    <div style={{ position: "absolute", bottom: "1.5em", right: "1em" }}>
      <Paper>
        <IconButton onClick={handleClick} size="small">
          <i className="material-icons icon-grey">{"explore"}</i>
        </IconButton>
      </Paper>
    </div>
  );
}
