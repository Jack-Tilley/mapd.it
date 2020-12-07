import React, { useState, useContext } from "react";

import IconButton from "@material-ui/core/IconButton";
import { MapContext } from "../MapContext";

import { Paper } from "@material-ui/core";

export default function PanTool({
  distanceToolRendered,
  setDistanceToolRendered,
}) {
  return (
    <>
      <div style={{ position: "absolute", left: "13em", top: "3em" }}>
        <Paper>
          <IconButton
            onClick={() => setDistanceToolRendered(false)}
            size="small"
          >
            <i className="material-icons icon-grey">{"pan_tool"}</i>
          </IconButton>
        </Paper>
      </div>
    </>
  );
}
