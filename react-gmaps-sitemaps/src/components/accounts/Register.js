import axios from "axios";
import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  let history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log("passwords dont match");
    } else {
      const newUser = {
        username,
        password,
        email,
      };
      axios
        .post("https://backend-mapdit.herokuapp.com/api/api/register/", newUser)
        .then((res) => {
          console.log(res.data);
          history.push("/");
        })
        .catch((err) => console.log(err));

      //   register(newUser);
    }
    return <Redirect to="/sign-in" />;
  };

  return (
    <div className="col-md-6 m-auto">
      <div className="card card-body mt-5">
        <h2 className="text-center">Register</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="password2"
              onChange={(e) => setPassword2(e.target.value)}
              value={password2}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
          <p>
            Already have an account? <Link to="/sign-in">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Register;
