import React from "react";

const ComingSoon = ({ rendered, page }) => {
  return rendered ? (
    <div>
      <h4>{page} - In Progress</h4>
      <div>Coming Soon...</div>
    </div>
  ) : null;
};

export default ComingSoon;
