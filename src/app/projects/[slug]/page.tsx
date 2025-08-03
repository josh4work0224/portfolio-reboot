"use client";

import { useEffect } from "react";
import ProjectSingleHero from "@/app/section/projectSingleHero";
import ProjectSingleContent from "@/app/section/projectSingleContent";

const ProjectPage = () => {
  useEffect(() => {
    document.body.classList.remove("theme-dark");
    document.body.classList.add("theme-light");
  }, []);

  return (
    <div>
      <ProjectSingleHero />
      <ProjectSingleContent />
    </div>
  );
};

export default ProjectPage;
