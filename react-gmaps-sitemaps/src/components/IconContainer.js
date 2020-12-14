import FormLabel from "@material-ui/core/FormLabel";
import React from "react";
import IconList from "./IconList";

const IconContainer = ({ handleButtonClick }) => {
  return (
    <div style={{ overflow: "auto", maxHeight: "200px", marginBottom: "1em" }}>
      {console.log("Icons updated")}
      <FormLabel component="legend">Icons</FormLabel>
      <IconList handleButtonClick={handleButtonClick} />
    </div>
  );
};
export default IconContainer;
