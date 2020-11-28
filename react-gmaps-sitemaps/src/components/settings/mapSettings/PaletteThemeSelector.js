import React, { useEffect } from "react";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

import Switch from "@material-ui/core/Switch";

const PaletteThemeSelector = ({ darkMode, setDarkMode }) => {
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const changeDarkMode = (e) => {
    setDarkMode(!e.target.value);
  };

  return (
    <FormControl>
      <Switch
        checked={darkMode}
        value={darkMode}
        onClick={(e) => changeDarkMode(e)}
      />
      <FormHelperText>Dark Mode</FormHelperText>
    </FormControl>
  );
};
export default PaletteThemeSelector;
