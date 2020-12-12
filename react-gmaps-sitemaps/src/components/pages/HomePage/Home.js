import React from "react";
import HeroSection from "../../HeroSection";
import Footer from "../Footer/Footer";
import { homeObjFour, homeObjOne, homeObjThree, homeObjTwo } from "./Data";

function Home() {
  return (
    <>
      <HeroSection {...homeObjOne} />
      <HeroSection {...homeObjThree} />
      <HeroSection {...homeObjTwo} />
      {/* <Pricing /> */}
      <HeroSection {...homeObjFour} />
      <Footer />
    </>
  );
}

export default Home;
