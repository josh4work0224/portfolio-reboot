// src/app/component/projectNextBtn.tsx
"use client";

import React from "react";
import { ProjectMain } from "@/app/types/project";
import Link from "next/link";
import Image from "next/image";

interface NextProjectProps {
  projects?: ProjectMain[];
  backgroundColor?: string;
}

const NextProject: React.FC<NextProjectProps> = ({
  projects,
  backgroundColor = "#f8fafc",
}) => {
  if (!projects || projects.length === 0) return null;

  const sectionStyle = backgroundColor ? { backgroundColor } : {};

  return (
    <section
      className="w-full mx-auto px-4 py-16 sm:px-6 lg:pl-48 lg:pr-16 transition-colors duration-300"
      style={sectionStyle}
    >
      <div className=" grid grid-cols-12 gap-4">
        <h2 className="text-3xl font-bold lg:col-span-4 col-span-12 text-black">
          Next Projects
        </h2>

        <div className="lg:col-span-8 col-span-12 gap-6">
          {projects.map((project) => (
            <Link
              key={project._id}
              href={`/projects/${project.slug.current}`}
              className="group block"
            >
              <div className="overflow-hidden duration-300 flex flex-col lg:grid lg:grid-cols-8 gap-4">
                {/* 項目信息 */}
                <div className=" col-span-4">
                  <h3 className="text-xl font-semibold mb-2 text-black group-hover:text-gray-600 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex flex-row gap-2">
                    {project.client && (
                      <p className="text-gray-600 font-semibold text-sm">
                        {project.client}
                      </p>
                    )}
                    {project.category && project.category.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.category.map((cat) => (
                          <span key={cat._id} className="text-gray-500 text-sm">
                            {cat.title}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {/* 項目縮圖 */}
                {project.thumbnail?.asset?.url && (
                  <div className="relative h-24 w-full col-span-4 overflow-hidden">
                    <Image
                      src={project.thumbnail.asset.url}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NextProject;
