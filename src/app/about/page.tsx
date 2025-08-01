// pages/about.tsx 或 app/about/page.tsx
"use client";

import React from "react";
import AboutSection from "../section/AboutMainSection";
import ExpertiseSection from "../section/AboutExpertiseSection";
import ExperienceSection from "../section/AboutExperienceSection";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <AboutSection />
      <ExpertiseSection />
      <ExperienceSection />
    </div>
  );
};

export default AboutPage;
