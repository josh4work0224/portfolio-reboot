"use client";

import HeroSection from "./section/homeHero";
import AboutSection from "./section/homeAbout";
import HomeContentful from "./section/homeContentful";
import { usePageReady } from "@/lib/usePageReady";

export default function Home() {
  usePageReady();

  return (
    <>
      <HeroSection />
      <AboutSection />
      <HomeContentful />
    </>
  );
}
