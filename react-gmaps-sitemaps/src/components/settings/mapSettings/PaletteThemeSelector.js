import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Switch from "@material-ui/core/Switch";
import React, { useEffect } from "react";

const PaletteThemeSelector = ({ darkMode, setDarkMode }) => {
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleDarkModeChange = (e) => {
    e.preventDefault();
    setDarkMode(!darkMode);
  };

  return (
    <FormControl>
      <Switch
        checked={darkMode}
        value={darkMode}
        onClick={(e) => handleDarkModeChange(e)}
      />
      <FormHelperText>Dark Mode</FormHelperText>
    </FormControl>
  );
};
export default PaletteThemeSelector;
