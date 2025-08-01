// Results 專用組件 (components/ResultsSection.tsx)
"use client";

import React from "react";
import { PortableText } from "@portabletext/react";
import { RichTextBlock } from "../types/project";

interface BackgroundSectionProps {
  data?: RichTextBlock[];
  backgroundColor?: string;
}

const BackgroundSection: React.FC<BackgroundSectionProps> = ({
  data,
  backgroundColor = "#000000", // 淡黃色背景
}) => {
  if (!data || data.length === 0) return null;

  const sectionStyle = backgroundColor ? { backgroundColor } : {};

  return (
    <section
      className="w-full mx-auto px-4 py-16 sm:px-6 lg:pl-48 lg:pr-16 gap-4 transition-colors duration-300"
      style={sectionStyle}
    >
      <div className="grid grid-cols-12">
        <h2 className="lg:col-span-6 col-span-12 text-3xl font-bold mb-6 text-white">
          Background
        </h2>
        <div className="lg:col-span-6 col-span-12 prose max-w-none text-white text-xl">
          <PortableText value={data} />
        </div>
      </div>
    </section>
  );
};

export default BackgroundSection;
