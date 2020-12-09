import React, { useState, useContext } from "react";
import FormLogin from "./FormLogin";
import FormSuccess from "./FormSuccess";
import axios from "axios";
import { MapContext } from "../MapContext";
import { Redirect } from "react-router-dom";

const LoginForm = () => {
  const [
    myMap,
    setMyMap,
    center,
    setCenter,
    isLoaded,
    draw,
    setDraw,
    nodes,
    setNodes,
    activeNode,
    setActiveNode,
    icon,
    setIcon,
    shapes,
    setShapes,
    checked,
    setChecked,
    selected,
    setSelected,
    color,
    setColor,
    findNode,
    removeNode,
    nodeType,
    setNodeType,
    disabled,
    setDisabled,
    editing,
    setEditing,
    editValue,
    setEditValue,
    replaceNode,
    editCleanup,
    changeIcons,
    description,
    setDescription,
    comment,
    setComment,
    label,
    setLabel,
    auth,
    setAuth,
    profileId,
    setProfileId,
    teams,
    setTeams,
    selectedTeams,
    setSelectedTeams,
    updateNodes,
    picture,
    setPicture,
  ] = useContext(MapContext);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const submitForm = (username, password) => {
    axios
      .post("http://localhost:8000/api/login/", {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
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
    </>
  );
};

export default LoginForm;