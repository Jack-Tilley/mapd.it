import React, { useState } from "react";
import TeamCreate from "./TeamCreate";
import TeamJoin from "./TeamJoin";
import TeamLeave from "./TeamLeave";
import TeamViewer from "./TeamViewer";

const TeamPage = ({ rendered, teams, profileId, updateNodes }) => {
  const [newTeam, setNewTeam] = useState("");
  const [joinTeam, setJoinTeam] = useState("");
  const [leaveTeamId, setLeaveTeamId] = useState("");
  return rendered ? (
    <div>
      <TeamJoin
        teams={teams}
        joinTeam={joinTeam}
        setJoinTeam={setJoinTeam}
        profileId={profileId}
        updateNodes={updateNodes}
      />
      <TeamCreate
        newTeam={newTeam}
        setNewTeam={setNewTeam}
        profileId={profileId}
        updateNodes={updateNodes}
      />
      <TeamLeave
        teams={teams}
        leaveTeamId={leaveTeamId}
        setLeaveTeamId={setLeaveTeamId}
        profileId={profileId}
        updateNodes={updateNodes}
      />
      <TeamViewer profileId={profileId} />
    </div>
  ) : null;
};
export default TeamPage;
