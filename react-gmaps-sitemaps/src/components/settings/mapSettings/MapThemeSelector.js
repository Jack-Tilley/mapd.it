import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React from "react";

const MapThemeSelector = ({ mapStyle, setMapStyle }) => {
  const changeOptions = (value) => {
    setMapStyle(value);
  };
  return (
    <FormControl>
      <Select
        labelId="Map Style"
        displayEmpty
        id="mapstyle"
        value={mapStyle}
        onChange={(e) => changeOptions(e.target.value)}
      >
        <MenuItem value="bluegray">
          <em>Default</em>
        </MenuItem>
        {/* <MenuItem value={"bluegray"}>BlueGray</MenuItem> */}
        <MenuItem value={"greyscale"}>Greyscale</MenuItem>
        <MenuItem value={"unsaturated"}>Unsaturated</MenuItem>
        <MenuItem value={"paledawn"}>Paledawn</MenuItem>
        <MenuItem value={"hopper"}>Hopper</MenuItem>
        <MenuItem value={"vibrant"}>Vibrant</MenuItem>
        <MenuItem value={"flatpale"}>FlatPale</MenuItem>
        <MenuItem value={"night"}>Night</MenuItem>
        <MenuItem value={"blackout"}>Blackout</MenuItem>
      </Select>
      <FormHelperText>Map Style</FormHelperText>
    </FormControl>
  );
};
export default MapThemeSelector;
