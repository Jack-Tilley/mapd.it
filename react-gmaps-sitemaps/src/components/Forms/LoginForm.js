import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
// import { MapContext } from "../MapContext";
import {
  // useAddEditContext,
  // useMapContext,
  // useNodeContext,
  // useDrawContext,
  useProfileContext,
  // useSelectedContext,
  // useTeamContext,
  // useTreeContext,
  // useAllContext,
} from "../MapContext";
import FormLogin from "./FormLogin";
import FormSuccess from "./FormSuccess";
import Footer from "../pages/Footer/Footer";

const LoginForm = () => {
  // const { profileId, setProfileId } = useContext(MapContext);
  const { profileId, setProfileId } = useProfileContext();
  console.log("VALUES", profileId);
  // const [profileId, setProfileId] = values.profileId;
  const [auth, setAuth] = useContext(AuthContext);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const submitForm = (username, password) => {
    axios
      .post("http://localhost:8000/api/login/", {
        username: username,
        password: password,
      })
      .then((res) => {
        // console.log(res.data);
        setProfileId(res.data.profile_id);
        localStorage.setItem("token", res.data.token);
        setAuth({
          token: res.data.token,
          isAuthenticated: true,
          isLoading: false,
        });
        setIsSubmitted(true);
        // return <Redirect to="/map" />;
      })

      .catch((err) => {
        console.log("Error logging in", err);
      });
  };
  return (
    <>
      <div className="form-container">
        <div className="form-content-left">
          <img className="form-img" src="images/svg-2.svg" alt="spaceship" />
        </div>
        {!isSubmitted ? (
          <FormLogin submitForm={submitForm} />
        ) : (
          <FormSuccess place="/map" />
        )}
      </div>
      <Footer />
    </>
  );
};

export default LoginForm;
