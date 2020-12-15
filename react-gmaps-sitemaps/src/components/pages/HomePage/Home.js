import React from "react";
import HeroSection from "../../HeroSection";
import Footer from "../Footer/Footer";
import { homeObjFour, homeObjOne, homeObjThree, homeObjTwo } from "./Data";
import { Helmet } from "react-helmet";

function Home() {
  return (
    <>
      <Helmet>
        <title>Manage your team anywhere on the map | mapd.it</title>
        <meta
          name="description"
          content="Collaborate with your team no matter where you are on the map. Get updates on your teams progress and visualize your jobs. Manage your team from anywhere."
        />
      </Helmet>
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
