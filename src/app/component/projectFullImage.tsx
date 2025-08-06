// components/GalleryHolder.tsx
"use client";

import React from "react";
import Image from "next/image";
import { GalleryImage } from "../types/project"; // 直接導入 GalleryImage 類型

interface GalleryHolderProps {
  image?: GalleryImage; // 直接使用導入的類型
  backgroundColor?: string;
  className?: string;
}

const GalleryHolder: React.FC<GalleryHolderProps> = ({
  image,
  backgroundColor = "#ffffff",
  className = "",
}) => {
  if (!image?.asset?.url) return null;

  const sectionStyle = backgroundColor ? { backgroundColor } : {};

  return (
    <section
      className={`w-full transition-colors duration-300 ${className}`}
      style={sectionStyle}
    >
      <div className="flex justify-center">
        <div className="relative w-full aspect-video max-h-[80vh] overflow-hidden">
          <Image
            src={image.asset.url}
            alt="Project gallery image"
            width={1920}
            height={1080}
            className="sticky top-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default GalleryHolder;
