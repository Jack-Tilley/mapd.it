import React from "react";
import RegisterForm from "../../Forms/RegisterForm";
import { Helmet } from "react-helmet";

function SignUp() {
  return (
    <>
      <Helmet>
        <title>Sign up | mapd.it</title>
        <meta
          name="description"
          content="Collaborate with your team no matter where you are on the map. Sign up to get real time updates on your teams progress and visualize your jobs easier. Get started managing your team from anywhere."
        />
      </Helmet>
      <RegisterForm />
    </>
  );
}

export default SignUp;
