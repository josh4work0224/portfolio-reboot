// components/GalleryHolder.tsx
"use client";

import React from "react";
import Image from "next/image";
import { ProjectImageDetailsProps } from "../types/project"; // 直接導入 GalleryImage 類型

const ProjectImageDetails: React.FC<ProjectImageDetailsProps> = ({
  image1,
  image2,
  image3,
  backgroundColor = "#ffffff",
  className = "",
}) => {
  if (!image1?.asset?.url || !image2?.asset?.url || !image3?.asset?.url)
    return null;

  const sectionStyle = backgroundColor ? { backgroundColor } : {};

  return (
    <section
      className={`w-full transition-colors duration-300 ${className}`}
      style={sectionStyle}
    >
      <div className="w-full mx-auto px-4 py-16 sm:px-6 lg:pl-48 lg:pr-16 grid grid-cols-12 gap-4 transition-colors duration-300">
        <div className="relative w-full h-auto max-h-[100rem] overflow-hidden col-span-12 aspect-[24/9]">
          <Image
            src={image1.asset.url}
            alt="Project gallery image"
            width={1200}
            height={800}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative w-full h-auto max-h-[100rem] overflow-hidden col-span-12 lg:col-span-6 aspect-[3/2]">
          <Image
            src={image2.asset.url}
            alt="Project gallery image"
            width={1200}
            height={800}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative w-full  h-auto max-h-[100rem] overflow-hidden col-span-12 lg:col-span-6  aspect-[3/2]">
          <Image
            src={image3.asset.url}
            alt="Project gallery image"
            width={1200}
            height={800}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectImageDetails;
