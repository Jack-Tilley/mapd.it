import React from "react";
import "./Form.css";
import { Redirect } from "react-router-dom";

const FormSuccess = (place) => {
  return place === "/login" ? <Redirect to="/login" /> : <Redirect to="/map" />;
};

export default FormSuccess;
