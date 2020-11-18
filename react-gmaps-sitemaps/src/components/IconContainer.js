import React from "react";
import IconList from "./IconList";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const IconContainer = ({ handleButtonClick, handleColorChange, color }) => {
  const getAllIcons = () => {};
  return (
    <>
      <IconList
        handleButtonClick={handleButtonClick}
        style={{ overflow: "auto" }}
      />
    </>
  );
};
export default IconContainer;
