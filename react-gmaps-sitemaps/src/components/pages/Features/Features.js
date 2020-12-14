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

function Features() {
  return (
    <>
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
