// projectSingleContent.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { projectData } from "../../lib/sanity.queries";
import { ProjectContent } from "../types/project";

// 引入所有組件
import PainPointsSection from "../component/projectPainpoints";
import StrategySection from "../component/projectStrategy";
import SolutionSection from "../component/projectSolution";
import ResultsSection from "../component/projectResult";
import BackgroundSection from "../component/projectBackground";
import GalleryHolder from "../component/projectFullImage";
import GalleryCols from "../component/projectImage2Cols";
import NextProject from "../component/projectNextBtn";

const ProjectSingleContent = () => {
  const [project, setProject] = useState<ProjectContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("dark");

  const themeToggleRef = useRef<HTMLDivElement>(null);
  const hasTriggeredForward = useRef<boolean>(false);
  const hasTriggeredBackward = useRef<boolean>(false);

  const params = useParams();
  const slug = params?.slug as string;

  // 主題切換函數
  const toggleTheme = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add(`theme-${newTheme}`);
    window.dispatchEvent(new CustomEvent("themeChange", { detail: newTheme }));
    setCurrentTheme(newTheme);
  };

  useEffect(() => {
    if (!project || !themeToggleRef.current) return;

    const triggerElement = themeToggleRef.current;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;

      const rect = triggerElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // 計算元素在視窗中的位置百分比
      const elementCenter = rect.top + rect.height / 2;
      const windowCenter = windowHeight / 2;
      const distanceFromCenter = Math.abs(elementCenter - windowCenter);

      // 當元素接近視窗中心時才觸發（增加穩定性）
      const isNearCenter = distanceFromCenter < windowHeight * 0.1; // 10% 容差

      if (isNearCenter) {
        if (isScrollingDown && !hasTriggeredForward.current) {
          console.log("Trigger: Scrolling down");
          toggleTheme();
          hasTriggeredForward.current = true;
          hasTriggeredBackward.current = false;
        } else if (!isScrollingDown && !hasTriggeredBackward.current) {
          console.log("Trigger: Scrolling up");
          toggleTheme();
          hasTriggeredBackward.current = true;
          hasTriggeredForward.current = false;
        }
      }

      // 重置觸發狀態當元素完全離開視窗
      if (rect.bottom < 0 || rect.top > windowHeight) {
        hasTriggeredForward.current = false;
        hasTriggeredBackward.current = false;
      }

      lastScrollY = currentScrollY;
    };

    // 使用節流來提高性能
    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [project, currentTheme]);

  // fetchProject useEffect
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await projectData(slug);
        setProject(data);
      } catch (err) {
        console.error("Error fetching project content:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading || !project) return null;

  const galleryImages = project.gallery || [];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center transition-colors duration-500 relative">
      <div className="">
        {galleryImages[0] && (
          <GalleryHolder image={galleryImages[0]} backgroundColor="#f8fafc" />
        )}

        <BackgroundSection
          data={project.background}
          backgroundColor="#000000"
        />

        {/* 主題切換觸發點 */}

        <PainPointsSection data={project.painpoint} backgroundColor="#000000" />

        <div ref={themeToggleRef}>
          {galleryImages[1] && (
            <GalleryHolder image={galleryImages[1]} backgroundColor="#f8fafc" />
          )}
        </div>

        <StrategySection data={project.strategy} backgroundColor="#ffffff" />

        {galleryImages[2] && galleryImages[3] && (
          <GalleryCols
            image1={galleryImages[2]}
            image2={galleryImages[3]}
            backgroundColor="#f8fafc"
          />
        )}

        <SolutionSection data={project.solution} backgroundColor="#ffffff" />

        <ResultsSection data={project.result} backgroundColor="#f8fafc" />

        {galleryImages[4] && (
          <GalleryHolder image={galleryImages[4]} backgroundColor="#f8fafc" />
        )}
        <NextProject projects={project.nextProject} backgroundColor="#ffffff" />
      </div>
    </section>
  );
};

export default ProjectSingleContent;
