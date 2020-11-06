import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const AddNodeForm = () => {
  const [value, setValue] = useState("NOPE");

  const handleChange = (e) => {
    console.log(e);
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Hello</p>
      <TextField value={value} onChange={handleChange} autoFocus />
      <Button label="Submit" type="submit" />
    </form>
  );
};

export default AddNodeForm;
