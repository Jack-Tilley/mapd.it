import { Paper } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import Tooltip from "@material-ui/core/Tooltip";

export default function PanTool({
  distanceToolRendered,
  setDistanceToolRendered,
}) {
  return (
    <>
      <div style={{ position: "absolute", left: "14.5em", top: "3em" }}>
        <Paper>
          <Tooltip title="Pan Tool">
            <IconButton
              onClick={() => setDistanceToolRendered(false)}
              size="small"
            >
              <i className="material-icons icon-grey">{"pan_tool"}</i>
            </IconButton>
          </Tooltip>
        </Paper>
      </div>
    </>
  );
}
