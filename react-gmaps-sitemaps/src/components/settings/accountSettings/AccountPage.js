import React from "react";
import TeamViewer from "../teamSettings/TeamViewer";

const AccountPage = ({ rendered, profileId }) => {
  return rendered ? (
    <div>
      <TeamViewer profileId={profileId} />
    </div>
  ) : null;
};
export default AccountPage;
