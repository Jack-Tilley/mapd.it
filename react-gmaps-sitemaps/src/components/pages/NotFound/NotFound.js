import React from "react";
import HeroSection from "../../HeroSection";
import Footer from "../Footer/Footer";
import { notFound } from "./Data";

function NotFound() {
  return (
    <>
      <HeroSection {...notFound} />
      <Footer />
    </>
  );
}

export default NotFound;
