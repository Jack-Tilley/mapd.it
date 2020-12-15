import React from "react";
import HeroSection from "../../HeroSection";
import Footer from "../Footer/Footer";
import {
  homeObjOne,
  homeObjTwo,
  homeObjThree,
  homeObjFour,
  homeObjFive,
} from "./Data";
import { Helmet } from "react-helmet";

function Features() {
  return (
    <>
      <Helmet>
        <title>Features | mapd.it</title>
        <meta
          name="description"
          content="Collaborate with your team no matter where you are. Real time communication, Map updates, Team planning, and much more."
        />
      </Helmet>
      <HeroSection {...homeObjFive} />
      <HeroSection {...homeObjTwo} />
      <HeroSection {...homeObjFour} />
      <HeroSection {...homeObjThree} />
      <HeroSection {...homeObjOne} />

      <Footer />
    </>
  );
}

export default Features;
