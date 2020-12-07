import React from "react";

import IconButton from "@material-ui/core/IconButton";
import { Paper } from "@material-ui/core";

import axios from "axios";

const RefreshChatButton = ({ setComments, selected, handleRefresh }) => {
  return (
    <div style={{ position: "absolute", top: "1em", right: "1em" }}>
      <Paper>
        <IconButton onClick={() => handleRefresh()} size="small">
          <i className="material-icons icon-grey">{"refresh"}</i>
        </IconButton>
      </Paper>
    </div>
  );
};
export default RefreshChatButton;
