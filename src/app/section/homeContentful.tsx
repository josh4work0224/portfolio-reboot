"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectData } from "../../lib/sanity.queries";
import Link from "next/link";
import { ProjectArchive } from "../types/project";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const HomeContentful: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const [projects, setProjects] = useState<ProjectArchive[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          document.body.classList.remove("theme-dark");
          document.body.classList.add("theme-light");
          window.dispatchEvent(
            new CustomEvent("themeChange", { detail: "light" })
          );
        } else {
          document.body.classList.remove("theme-light");
          document.body.classList.add("theme-dark");
          window.dispatchEvent(
            new CustomEvent("themeChange", { detail: "dark" })
          );
        }
      },
      {
        threshold: 0.3, // 進入畫面 30% 才觸發
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    projectData("")
      .then((data) => {
        console.log("Project Data:", data);
        setProjects(data);
      })
      .catch((err) => {
        console.error("Sanity fetch error:", err);
      });
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll(".project-card img");
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { scale: 1.05, y: 80, opacity: 0 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      card.parentElement?.addEventListener("mouseenter", () => {
        gsap.to(card, { scale: 1.05, duration: 0.3 });
      });
      card.parentElement?.addEventListener("mouseleave", () => {
        gsap.to(card, { scale: 1, duration: 0.3 });
      });
    });
  }, [projects]);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center transition-colors duration-500 relative"
      id="contentful"
    >
      <div className="grid grid-cols-12 mx-auto px-4 pt-64 pb-16 sm:px-6 lg:px-48 gap-8">
        <div className="text-black text-2xl font-medium col-span-12">
          Highlighted Project
        </div>
        {projects.length > 0 && (
          <>
            <div className="col-span-12 md:col-span-12 lg:col-span-12 group">
              <Link href={`/projects/${projects[0].slug.current}`}>
                <div className="project-card w-full aspect-[2/1] overflow-hidden">
                  {projects[0].thumbnail && (
                    <Image
                      src={projects[0].thumbnail.asset.url}
                      alt={projects[0].title}
                      width={1920}
                      height={1080}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="py-8">
                  <div className="flex flex-row gap-2 mb-1">
                    <p className="text-gray-600 font-semibold">
                      {projects[0].client}
                    </p>
                    <p className="text-gray-500">
                      {projects[0].category.map((cat) => cat.title).join(", ")}
                    </p>
                  </div>
                  <h3 className="text-black text-2xl font-medium">
                    {projects[0].title}
                  </h3>
                </div>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 col-span-12">
              {projects.slice(1, 3).map((project, index) => {
                const isHigher = index % 3 === 1;
                return (
                  <Link
                    href={`/projects/${project.slug.current}`}
                    key={project._id}
                    className="overflow-hidden project-card"
                  >
                    <div
                      className={`project-card w-full ${isHigher ? "aspect-[3/2]" : "aspect-[5/4]"} overflow-hidden`}
                    >
                      {project.thumbnail && (
                        <Image
                          src={project.thumbnail.asset.url}
                          alt={project.title}
                          width={1920}
                          height={1920}
                          className="w-full h-full object-cover"
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
          </>
        )}
        <div className="mt-4 col-span-12 flex justify-start items-start">
          <Link
            className="flex flex-col gap-2 group overflow-hidden"
            href="/projects"
          >
            <div>
              <div className="flex flex-row items-center gap-2">
                <p className="font-semibold transition-colors duration-300 text-black group-hover:text-gray-500">
                  View All Projects
                </p>
                <div className="w-5 ml-2 overflow-hidden">
                  <div className="flex flex-row gap-y-4 justify-end group-hover:translate-x-6 transition-transform duration-300">
                    <div className="h-4">
                      <ArrowRight size={20} color="black" />
                    </div>
                    <div className="h-4">
                      <ArrowRight size={20} color="black" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-[2px] bg-gray-800 w-full group-hover:w-0 transition-all"></div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeContentful;
