// Solution 專用組件 (components/SolutionSection.tsx)
"use client";

import React from "react";
import ProjectColumnComponent from "./projectColumnComponent";
import { RichTextBlock } from "../types/project";

interface SolutionSectionProps {
  data?: { description: RichTextBlock[] }[];
  backgroundColor?: string;
}

const SolutionSection: React.FC<SolutionSectionProps> = ({
  data,
  backgroundColor = "#f0fdf4", // 淡綠色背景
}) => {
  return (
    <ProjectColumnComponent
      title="Solution"
      items={data}
      showTitleField={false}
      backgroundColor={backgroundColor}
      textColor="text-black"
      className=""
    />
  );
};

export default SolutionSection;
