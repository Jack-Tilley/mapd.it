import React from "react";

import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const MapTypeSelector = ({ mapTypes, setMapTypes }) => {
  const changeOptions = (value) => {
    setMapTypes(value);
  };
  return (
    <FormControl>
      <Select
        labelId="Map Types"
        id="mapTypes"
        value={mapTypes}
        onChange={(e) => changeOptions(e.target.value)}
      >
        <MenuItem value={"roadmap"}>Roadmap</MenuItem>
        <MenuItem value={"terrain"}>Roadmap-Terrain</MenuItem>
        <MenuItem value={"hybrid"}>Satellite-labels</MenuItem>
        <MenuItem value={"satellite"}>Satellite-no-labels</MenuItem>
      </Select>
      <FormHelperText>Map Types</FormHelperText>
    </FormControl>
  );
};
export default MapTypeSelector;
