import React from "react";
import HeroSection from "../../HeroSection";
import Footer from "../Footer/Footer";
import { homeObjThree } from "./Data";

function About() {
  return (
    <>
      <HeroSection {...homeObjThree} />>
      <Footer />
    </>
  );
}
export default About;
