import React from "react";
import { Link } from "react-router-dom";
import "./Form.css";
import useLoginForm from "./useLoginForm";
import { validateLogin } from "./validateInfo";

const FormLogin = ({ submitForm }) => {
  const { handleChange, values, handleSubmit, errors } = useLoginForm(
    submitForm,
    validateLogin
  );
  return (
    <div className="form-content-right">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Login existing user</h1>
        <div className="form-inputs">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            className="form-input"
            placeholder="Enter your username"
            value={values.username}
            onChange={handleChange}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div className="form-inputs">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="form-input"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <button className="form-input-btn" type="submit">
          Login
        </button>
        <span className="form-input-login">
          Don't have an account yet? Sign up <Link to="/sign-up">here</Link>
        </span>
      </form>
    </div>
  );
};

export default FormLogin;
