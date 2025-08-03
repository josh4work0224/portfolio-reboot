// Pain Points 專用組件 (components/PainPointsSection.tsx)
"use client";

import React from "react";
import ProjectColumnComponent from "./projectColumnComponent";
import { SectionItem } from "../types/project";

interface PainPointsSectionProps {
  data?: SectionItem[];
  backgroundColor?: string;
}

const PainPointsSection: React.FC<PainPointsSectionProps> = ({
  data,
  backgroundColor = "#fff5f5", // 淡紅色背景
}) => {
  return (
    <ProjectColumnComponent
      title="Pain Points"
      items={data}
      showTitleField={true}
      backgroundColor={backgroundColor}
      textColor="text-white"
      className=""
    />
  );
};

export default PainPointsSection;
