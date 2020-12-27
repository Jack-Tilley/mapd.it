import React from "react";
import "./Form.css";
import { Redirect } from "react-router-dom";

const FormSuccess = (place) => {
  return place === "/sign-in" ? (
    <Redirect to="/sign-in" />
  ) : (
    <Redirect to="/map" />
  );
};

export default FormSuccess;
