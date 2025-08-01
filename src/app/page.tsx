"use client";

import Image from "next/image";
import HeroSection from "./section/homeHero";
import AboutSection from "./section/homeAbout";
import HomeContentful from "./section/homeContentful";
import { useEffect } from "react";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <HomeContentful />
    </>
  );
}
