import React from "react";
import IconList from "./IconList";

import {
  AccessAlarm,
  AirportShuttle,
  Album,
  Archive,
  BatteryAlert,
  Brush,
  BusinessCenter,
} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";

const IconContainer = ({ handleButtonClick }) => {
  const getAllIcons = () => {};
  return (
    <>
      <IconList handleButtonClick={handleButtonClick} />
    </>
  );
};
export default IconContainer;
