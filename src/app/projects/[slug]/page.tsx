"use client";

import { useState, useEffect } from "react";
import ProjectSingleHero from "@/app/section/projectSingleHero";
import ProjectSingleContent from "@/app/section/projectSingleContent";
import { usePageReady } from "@/lib/usePageReady";

const ProjectPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.classList.remove("theme-dark");
    document.body.classList.add("theme-light");
  }, []);
  useEffect(() => {
    // 模擬 fetch 資料
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  usePageReady(!isLoading); // 資料載入完畢才觸發 pageReady

  return (
    <div>
      <ProjectSingleHero />
      <ProjectSingleContent />
    </div>
  );
};

export default ProjectPage;
