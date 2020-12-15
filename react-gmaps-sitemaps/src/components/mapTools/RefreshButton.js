import { Paper } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import {
  useNodeContext,
  useProfileContext,
  useTeamContext,
} from "../MapContext";
import { updateNodes } from "../../utils/contextUtils";

const RefreshButton = () => {
  const { profileId } = useProfileContext();
  const { setNodes } = useNodeContext();
  const { setTeams } = useTeamContext();

  const handleRefresh = () => {
    updateNodes(profileId, setNodes, setTeams);
  };
  return (
    <div style={{ position: "absolute", left: "19em", top: "3em" }}>
      <Paper>
        <IconButton onClick={() => handleRefresh()} size="small">
          <i className="material-icons icon-grey">{"refresh"}</i>
        </IconButton>
      </Paper>
    </div>
  );
};
export default RefreshButton;
