import { Paper } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import React, { useState } from "react";

export default function PersonalLocator({ setCenter }) {
  const handleClick = (e) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition((position) =>
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
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
