"use client";

// src/app/projects/page.tsx
import ProjectsArchive from "../section/projectArchive";
import { useEffect } from "react";

const ProjectsPage = () => {
  useEffect(() => {
    document.body.classList.remove("theme-dark");
    document.body.classList.add("theme-light");
  }, []);

  return <ProjectsArchive />;
};

export default ProjectsPage;
