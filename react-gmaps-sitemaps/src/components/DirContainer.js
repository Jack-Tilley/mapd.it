import React from "react";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

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
        >
          <FormControlLabel value="true" control={<Radio />} />
          <FormControlLabel value="false" control={<Radio />} />
        </RadioGroup>
      </FormControl>
    </>
  );
};
export default DirContainer;
