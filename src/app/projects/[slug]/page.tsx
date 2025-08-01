"use client";

import { useEffect } from "react";
import ProjectSingleHero from "@/app/section/projectSingleHero";
import ProjectSingleContent from "@/app/section/projectSingleContent";

const ProjectPage = () => {
  useEffect(() => {
    document.body.classList.remove("theme-light");
    document.body.classList.add("theme-dark");
  }, []);

  return (
    <div>
      <ProjectSingleHero />
      <ProjectSingleContent />
    </div>
  );
};

export default ProjectPage;
