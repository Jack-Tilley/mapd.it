import React from "react";
import HeroSection from "../../HeroSection";
import Footer from "../Footer/Footer";
import { notFound } from "./Data";
import { Helmet } from "react-helmet";

function NotFound() {
  return (
    <>
      <Helmet>
        <title>Back to work | mapd.it</title>
        <meta
          name="description"
          content="Collaborate with your team no matter where you are on the map. This page has not been found. Get you and your team back on track."
        />
      </Helmet>
      <HeroSection {...notFound} />
      <Footer />
    </>
  );
}

export default NotFound;
