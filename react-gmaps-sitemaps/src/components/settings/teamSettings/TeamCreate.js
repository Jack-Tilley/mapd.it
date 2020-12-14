import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import React from "react";

const TeamCreate = ({
  newTeam,
  setNewTeam,
  profileId,
  updateNodes,
  setNodes,
  setTeams,
}) => {
  const handleCreateTeam = () => {
    // console.log(newTeam);
    if (newTeam !== "") {
      axios
        .post("http://localhost:8000/api/teams/", {
          name: newTeam,
          description: "",
        })
        .then((res) => {
          // console.log("NEWTEAM", res.data);
          if (res.data.name === newTeam) {
            axios
              .put(
                `http://localhost:8000/api/profiles/${profileId}/join_team/`,
                res.data
              )
              .then((result) => {
                // console.log("PUT RESULT", result.data);
                updateNodes(profileId, setNodes, setTeams);
                setNewTeam("");
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    } else {
      // console.log("ENTER A VALID TEAM NAME");
    }
  };
  return (
    <FormControl>
      <TextField
        value={newTeam}
        margin="dense"
        placeholder="Create a new team"
        id="teamcreate"
        label="Create a team"
        type="text"
        onChange={(e) => setNewTeam(e.target.value)}
        fullWidth
      />
      <FormHelperText>Create a team</FormHelperText>
      <IconButton onClick={() => handleCreateTeam()} size="small">
        <i className="material-icons icon-red">{"create"}</i>
      </IconButton>
    </FormControl>
  );
};
export default TeamCreate;
