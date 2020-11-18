import React from "react";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import { withStyles } from "@material-ui/core/styles";
import {
  green,
  blue,
  red,
  orange,
  yellow,
  purple,
} from "@material-ui/core/colors";

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const BlueRadio = withStyles({
  root: {
    color: blue[400],
    "&$checked": {
      color: blue[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const RedRadio = withStyles({
  root: {
    color: red[400],
    "&$checked": {
      color: red[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const OrangeRadio = withStyles({
  root: {
    color: orange[400],
    "&$checked": {
      color: orange[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const YellowRadio = withStyles({
  root: {
    color: yellow[400],
    "&$checked": {
      color: yellow[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const PurpleRadio = withStyles({
  root: {
    color: purple[400],
    "&$checked": {
      color: purple[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const ColorContainer = ({ handleColorChange, color }) => {
  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">Colors</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={color}
          onChange={handleColorChange}
        >
          <FormControlLabel
            value="blue"
            control={<BlueRadio checked={color === "blue"} />}
          />
          <FormControlLabel
            value="red"
            control={<RedRadio checked={color === "red"} />}
          />
          <FormControlLabel
            value="green"
            control={<GreenRadio checked={color === "green"} />}
          />
          <FormControlLabel
            value="orange"
            control={<OrangeRadio checked={color === "orange"} />}
          />
          <FormControlLabel
            value="yellow"
            control={<YellowRadio checked={color === "yellow"} />}
          />
          <FormControlLabel
            value="purple"
            control={<PurpleRadio checked={color === "purple"} />}
          />
          <FormControlLabel
            value="black"
            control={<Radio color="default" checked={color === "black"} />}
          />
        </RadioGroup>
      </FormControl>
    </>
  );
};
export default ColorContainer;
