import React from "react";
import {
  About,
  Faq,
  Features,
  GreatDoctors,
  Hero,
  HeroContent,
  Services,
  Testinomial,
} from "../components";

function Home() {
  return (
    <>
      <Hero />
      <HeroContent />
      <About />
      <Services />
      <Features />
      <GreatDoctors />
      <Faq />
      <Testinomial />
    </>
  );
}

export default Home;
