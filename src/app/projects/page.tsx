"use client";

// src/app/projects/page.tsx
import ProjectsArchive from "../section/projectArchive";
import { useEffect } from "react";
import { usePageReady } from "@/lib/usePageReady";

const ProjectsPage = () => {
  useEffect(() => {
    document.body.classList.remove("theme-dark");
    document.body.classList.add("theme-light");
  }, []);
  usePageReady();

  return <ProjectsArchive />;
};

export default ProjectsPage;
