import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles({
  intro: {
    padding: "2rem",
    textAlign: "center",
  },
  profileDetail: {
    padding: "2rem",
    textAlign: "center",
  },
});

const AccountSettings = ({ rendered, profileId }) => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/profiles/${profileId}/`)
      .then((res) => {
        setEmail(res.data.user.email);
        setUsername(res.data.user.username);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [profileId]);
  return rendered ? (
    <div>
      <h4>My Account - In Progress</h4>
      <div className={classes.intro}>
        <h3>Signed in as {username}</h3>
      </div>
      <Divider />
      <div>
        <div>
          <h3>My mapd.it profile</h3>
          <div className={classes.profileDetail}>
            <p>Username: {username}</p>
            <p>Email: {email}</p>
            <p>First Name: None Provided</p>
            <p>Last Name: None Provided</p>
          </div>
          <Divider />
        </div>
      </div>
    </div>
  ) : null;
};

export default AccountSettings;
