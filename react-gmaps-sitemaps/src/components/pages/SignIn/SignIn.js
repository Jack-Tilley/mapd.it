import React from "react";
import LoginForm from "../../Forms/LoginForm";
import { Helmet } from "react-helmet";

function SignIn() {
  return (
    <>
      <Helmet>
        <title>Sign in | mapd.it</title>
        <meta
          name="description"
          content="Collaborate with your team no matter where you are on the map. Sign in to see the progress your teams are making."
        />
      </Helmet>
      <LoginForm />
    </>
  );
}

export default SignIn;
