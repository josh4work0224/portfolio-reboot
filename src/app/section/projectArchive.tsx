// src/app/section/projectsArchive.tsx
"use client";

import React, { useEffect, useState } from "react";
import { projectData } from "../../lib/sanity.queries"; // 确保路径正确
import gsap from "gsap"; // 確保引入 gsap
import Link from "next/link";
import { ProjectArchive } from "../types/project";
import Image from "next/image";

const ProjectsArchive: React.FC = () => {
  const [projects, setProjects] = useState<ProjectArchive[]>([]);

  useEffect(() => {
    projectData("")
      .then((data) => {
        console.log("Project Archive Data:", data);
        setProjects(data);
      })
      .catch((err) => {
        console.error("Sanity fetch error:", err);
      });
  }, []);

  useEffect(() => {
    // 為每個卡片添加動畫
    const cards = document.querySelectorAll(".project-card img");
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { scale: 1.05, y: 80, opacity: 0 }, // 初始狀態
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%", // 當卡片進入視口時
            toggleActions: "play none none none",
          },
        }
      );

      // 添加懸停效果
      card.parentElement?.addEventListener("mouseenter", () => {
        gsap.to(card, { scale: 1.05, duration: 0.3 });
      });
      card.parentElement?.addEventListener("mouseleave", () => {
        gsap.to(card, { scale: 1, duration: 0.3 });
      });
    });
  }, [projects]); // 依賴於 projects

  return (
    <section className="min-h-screen flex flex-col items-center justify-center transition-colors duration-500 relative">
      <div className="flex flex-col mx-auto px-4 lg:py-32 pt-32 pb-8 sm:px-6 lg:px-48 gap-8">
        <h1 className="text-black text-6xl font-bold">
          All Projects(<span>{projects.length}</span>)
        </h1>
        <div className="grid grid-cols-12 mx-auto py-8 gap-8 w-full">
          {projects.map((project, index) => {
            const isFullWidth = index % 3 === 0; // 每三個項目中的第一個為全寬
            const isThird = index % 3 === 2; // 每三個項目中的第二和第三個為 1/2 寬

            return (
              <Link
                href={`/projects/${project.slug.current}`}
                key={project._id}
                className={` ${
                  isFullWidth
                    ? "col-span-12 w-full"
                    : "col-span-12 md:col-span-6 lg:col-span-6"
                }`}
              >
                <div
                  className={`overflow-hidden project-card ${
                    isFullWidth
                      ? "w-full aspect-[2/1] max-h-[60vh]"
                      : isThird
                        ? "aspect-[3/2]"
                        : "aspect-[5/4]"
                  }`}
                >
                  {project.thumbnail && (
                    <Image
                      src={project.thumbnail.asset.url}
                      alt={project.title}
                      width={1920}
                      height={1080}
                      className={`w-full h-full object-cover `}
                    />
                  )}
                </div>
                <div className="py-8">
                  <div className="flex flex-row gap-2 mb-1">
                    <p className="text-gray-600 font-semibold">
                      {project.client}
                    </p>
                    <p className="text-gray-500">
                      {project.category.map((cat) => cat.title).join(", ")}
                    </p>
                  </div>
                  <h2 className="text-black text-2xl font-medium">
                    {project.title}
                  </h2>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsArchive;
