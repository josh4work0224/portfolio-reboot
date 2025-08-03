// pages/about.tsx 或 app/about/page.tsx
"use client";

import React from "react";
import { useEffect } from "react";
import AboutSection from "../section/AboutMainSection";
import ExpertiseSection from "../section/AboutExpertiseSection";
import ExperienceSection from "../section/AboutExperienceSection";

const AboutPage: React.FC = () => {
  useEffect(() => {
    document.body.classList.remove("theme-dark");
    document.body.classList.add("theme-light");
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <AboutSection />
      <ExpertiseSection />
      <ExperienceSection />
    </div>
  );
};

export default AboutPage;
