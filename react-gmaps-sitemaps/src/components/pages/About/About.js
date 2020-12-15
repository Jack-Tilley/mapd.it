import React from "react";
import HeroSection from "../../HeroSection";
import Footer from "../Footer/Footer";
import { homeObjThree } from "./Data";
import { Helmet } from "react-helmet";

function About() {
  return (
    <>
      <Helmet>
        <title>About us | mapd.it</title>
        <meta
          name="description"
          content="Collaborate with your team no matter where you are. Learn more about our real time communication, map updates, team planning, and much more."
        />
      </Helmet>
      <HeroSection {...homeObjThree} />
      <Footer />
    </>
  );
}
export default About;
