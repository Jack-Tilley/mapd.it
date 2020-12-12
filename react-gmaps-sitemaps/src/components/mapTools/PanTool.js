import { Paper } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import React from "react";

export default function PanTool({
  distanceToolRendered,
  setDistanceToolRendered,
}) {
  return (
    <>
      <div style={{ position: "absolute", left: "15em", top: "3em" }}>
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
