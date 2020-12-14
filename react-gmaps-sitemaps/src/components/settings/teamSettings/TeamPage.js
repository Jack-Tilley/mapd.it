import React, { useState } from "react";
import TeamCreate from "./TeamCreate";
import TeamJoin from "./TeamJoin";
import TeamLeave from "./TeamLeave";
import TeamViewer from "./TeamViewer";
import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  item: {
    display: "inline-block",
  },
});

const TeamPage = ({
  rendered,
  teams,
  profileId,
  updateNodes,
  setNodes,
  setTeams,
}) => {
  const classes = useStyles();
  const [newTeam, setNewTeam] = useState("");
  const [joinTeam, setJoinTeam] = useState("");
  const [leaveTeamId, setLeaveTeamId] = useState("");
  return rendered ? (
    <div>
      <h4>Team Settings</h4>
      <div className={classes.item}>
        <TeamViewer profileId={profileId} />
      </div>
      <Divider />
      <div className={classes.item}>
        <TeamJoin
          teams={teams}
          joinTeam={joinTeam}
          setJoinTeam={setJoinTeam}
          profileId={profileId}
          updateNodes={updateNodes}
          setNodes={setNodes}
          setTeams={setTeams}
        />
      </div>
      <Divider />
      <div>
        <TeamCreate
          newTeam={newTeam}
          setNewTeam={setNewTeam}
          profileId={profileId}
          updateNodes={updateNodes}
          setNodes={setNodes}
          setTeams={setTeams}
        />
      </div>
      <Divider />
      <div>
        <TeamLeave
          teams={teams}
          leaveTeamId={leaveTeamId}
          setLeaveTeamId={setLeaveTeamId}
          profileId={profileId}
          updateNodes={updateNodes}
          setNodes={setNodes}
          setTeams={setTeams}
        />
      </div>
    </div>
  ) : null;
};
export default TeamPage;
