import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";

const Logout = ({ rendered }) => {
  const [auth] = useContext(AuthContext);
  const handleLogout = () => {
    axios
      .get("http://localhost/api/logout/", {
        Authorization: auth.token,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return rendered ? <div>Coming Soon...</div> : null;
};

export default Logout;
