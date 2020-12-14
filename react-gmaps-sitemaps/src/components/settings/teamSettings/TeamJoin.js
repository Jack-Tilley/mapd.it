import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import { updateNodes } from "../../../utils/contextUtils";
import axios from "axios";
import React from "react";

const TeamJoin = ({
  teams,
  joinTeam,
  setJoinTeam,
  profileId,
  setNodes,
  setTeams,
}) => {
  const handleJoinTeam = () => {
    // console.log(joinTeam);
    const alreadyInTeam = teams.some((team) => team.unique_key === joinTeam);
    if (!alreadyInTeam && joinTeam !== "" && joinTeam.length === 5) {
      axios
        .put(`http://localhost:8000/api/profiles/${profileId}/join_team/`, {
          unique_key: joinTeam,
        })
        .then((result) => {
          // console.log("PUT RESULT for JOIN", result.data);
          updateNodes(profileId, setNodes, setTeams);
          setJoinTeam("");
        })
        .catch((err) => console.log(err));
    } else {
      // console.log("ENTER A VALID TEAM NAME OR ALREADY IN TEAM");
    }
  };
  return (
    <FormControl>
      <TextField
        value={joinTeam}
        margin="dense"
        placeholder="Enter a unique key"
        id="teamjoin"
        label="Join a team"
        type="text"
        onChange={(e) => setJoinTeam(e.target.value)}
        fullWidth
      />
      <FormHelperText>Join a team</FormHelperText>
      <IconButton onClick={() => handleJoinTeam()} size="small">
        <i className="material-icons icon-red">{"add"}</i>
      </IconButton>
    </FormControl>
  );
};
export default TeamJoin;
