"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { projectData } from "../../lib/sanity.queries";
import Image from "next/image";
import { ProjectMain } from "../types/project";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ProjectSingleHero = () => {
  const [project, setProject] = useState<ProjectMain | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const slug = params?.slug as string;

  // 顏色格式處理函數
  const formatColor = (color: string | undefined): string => {
    if (!color) return "#f3f4f6";
    if (color.startsWith("#")) return color;
    if (/^[0-9A-Fa-f]{6}$/.test(color) || /^[0-9A-Fa-f]{3}$/.test(color)) {
      return `#${color}`;
    }
    return color;
  };

  useEffect(() => {
    const fetchProjectData = async () => {
      if (!slug) {
        setError("No project slug provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data = await projectData(slug);
        console.log("Project data:", data);
        console.log("Raw color:", data?.color);
        console.log("Formatted color:", formatColor(data?.color));

        if (!data) {
          setError("Project not found");
        } else {
          setProject(data);
        }
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [slug]);

  // 錯誤狀態
  if (error) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center transition-colors duration-500 relative">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-red-500">Error</h1>
            <p className="py-6 text-gray-700">{error}</p>
            <button
              onClick={() => window.history.back()}
              className="btn btn-primary"
            >
              Go Back
            </button>
          </div>
        </div>
      </section>
    );
  }

  // 載入狀態
  if (loading) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center transition-colors duration-500 relative">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <div className="loading loading-spinner loading-lg"></div>
            <p className="py-6 text-gray-700">Loading project...</p>
          </div>
        </div>
      </section>
    );
  }

  // 沒有項目數據
  if (!project) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center transition-colors duration-500 relative">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-gray-800">
              Project Not Found
            </h1>
            <p className="py-6 text-gray-600">
              The requested project could not be found.
            </p>
            <button
              onClick={() => window.history.back()}
              className="btn btn-primary"
            >
              Go Back
            </button>
          </div>
        </div>
      </section>
    );
  }

  // 正常顯示項目
  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center transition-colors duration-500 relative"
      style={{ backgroundColor: formatColor(project.color) }}
    >
      <div className="hero-content mx-auto px-4 py-16 sm:px-6 lg:pl-48 lg:pr-16 gap-8 grid grid-cols-12">
        {/* 左側內容 */}
        <div className="lg:col-span-10 col-span-12">
          <h1 className="project-main-title tracking-tight leading-none font-medium text-white order-1">
            {project.title}
          </h1>
        </div>
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-4 items-start order-last lg:order-2">
          <p className="py-6 text-white text-xl lg:text-2xl font-medium">
            {project.overview || "No description available"}
          </p>

          {/* 顯示客戶資訊 */}
          {project.client && (
            <div className="">
              <p className="text-white">
                <strong>Client:</strong> {project.client}
              </p>
            </div>
          )}

          {/* 顯示分類 */}
          {project.category && project.category.length > 0 && (
            <div className="">
              <p className="text-white">
                <strong>Categories:</strong>{" "}
                {project.category.map((cat) => cat.title).join(", ")}
              </p>
            </div>
          )}

          {/* 顯示工具 */}
          {project.tool && project.tool.length > 0 && (
            <div className="">
              <p className="text-white">
                <strong>Tools:</strong>{" "}
                {project.tool.map((tool) => tool.name).join(", ")}
              </p>
            </div>
          )}

          {/* 顯示角色 */}
          {project.myRole && project.myRole.length > 0 && (
            <div className="">
              <p className="text-white">
                <strong>My Role:</strong>{" "}
                {project.myRole.map((role) => role.name).join(", ")}
              </p>
            </div>
          )}

          {/* 專案網站連結 */}
          {project.websiteUrl && (
            <Link
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary pb-2 border-gray-300 flex flex-col gap-2 items-start group"
            >
              <div className="mt-6 flex flex-row items-center text-white">
                <strong>Visit Website</strong>
                <div className="w-5 ml-2 overflow-hidden">
                  <div className="flex flex-row gap-y-4 justify-end group-hover:translate-x-6 transition-transform duration-300">
                    <div className="h-4">
                      <ArrowRight size={20} color="white" />
                    </div>
                    <div className="h-4">
                      <ArrowRight size={20} color="white" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[2px] bg-gray-200 w-full group-hover:w-0 transition-all"></div>
            </Link>
          )}
        </div>

        {/* 右側圖片 */}
        <div className="hero-image lg:col-span-6 col-span-12 order-3">
          {project.hero?.asset?.url ? (
            <Image
              src={project.hero.asset.url}
              alt={project.title}
              className="w-full"
              width={500}
              height={500}
            />
          ) : project.hero?.asset?.url ? (
            <Image
              src={project.hero.asset.url}
              alt={project.title}
              className=""
            />
          ) : (
            <div className="max-w-sm h-64 bg-gray-200 rounded-lg shadow-2xl flex items-center justify-center">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectSingleHero;
