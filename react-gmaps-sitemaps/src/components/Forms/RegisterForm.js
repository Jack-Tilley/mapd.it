import React, { useState } from "react";
import FormSignup from "./FormSignup";
import FormSuccess from "./FormSuccess";
import axios from "axios";

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
      .post("http://localhost:8000/api/register/", newUser)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="form-container">
        <div className="form-content-left">
          <img className="form-img" src="images/svg-2.svg" alt="spaceship" />
        </div>
        {!isSubmitted ? (
          <FormSignup submitForm={submitForm} />
        ) : (
          <FormSuccess place="/login" />
        )}
      </div>
    </>
  );
};

export default RegisterForm;
