import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import React from "react";

const DirContainer = ({ handleDirChange, isDir }) => {
  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">isDir?</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={isDir}
          onChange={handleDirChange}
          row
        >
          <FormControlLabel value="true" control={<Radio />} />
          <FormControlLabel value="false" control={<Radio />} />
        </RadioGroup>
      </FormControl>
    </>
  );
};
export default DirContainer;
