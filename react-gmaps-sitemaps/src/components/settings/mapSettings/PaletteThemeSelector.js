import React, { useEffect } from "react";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

import Switch from "@material-ui/core/Switch";

const PaletteThemeSelector = ({ darkMode, setDarkMode }) => {
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <FormControl>
      <Switch
        checked={darkMode}
        value={darkMode}
        onClick={(e) => setDarkMode(!darkMode)}
      />
      <FormHelperText>Dark Mode</FormHelperText>
    </FormControl>
  );
};
export default PaletteThemeSelector;
