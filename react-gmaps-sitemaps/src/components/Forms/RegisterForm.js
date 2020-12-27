import React, { useState } from "react";
import FormSignup from "./FormSignup";
import FormSuccess from "./FormSuccess";
import axios from "axios";
import Footer from "../pages/Footer/Footer";

const RegisterForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const submitForm = (username, email, password) => {
    setIsSubmitted(true);
    const newUser = {
      username,
      password,
      email,
    };
    axios
      .post("https://backend-mapdit.herokuapp.com/api/register/", newUser)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="form-container">
        <div className="form-content-left">
          <img className="form-img" src="images/register.svg" alt="sign-in" />
        </div>
        {!isSubmitted ? (
          <FormSignup submitForm={submitForm} />
        ) : (
          <FormSuccess place="/sign-in" />
        )}
      </div>
      <Footer />
    </>
  );
};

export default RegisterForm;
