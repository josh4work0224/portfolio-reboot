// 4. Strategy 專用組件 (components/StrategySection.tsx)
"use client";

import React from "react";
import { PortableText } from "@portabletext/react";
import { SectionItem, RichTextBlock } from "../types/project";

interface StrategySectionProps {
  data?: SectionItem[];
  backgroundColor?: string;
}

const StrategySection: React.FC<StrategySectionProps> = ({
  data,
  backgroundColor = "#f0f9ff", // 淡藍色背景
}) => {
  return (
    <section
      style={{ backgroundColor }}
      className="w-full mx-auto px-4 py-32 sm:px-6 lg:pl-48 lg:pr-16 grid grid-cols-12 gap-4"
    >
      <h2 className="text-3xl font-bold text-black lg:col-span-4 col-span-12">
        Strategy
      </h2>
      <div className="lg:col-span-8 col-span-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {data?.map((item, index) => (
            <div key={index} className="border-t-1 border-black pt-2">
              <h3 className="text-black text-xl font-bold">{item.title}</h3>
              <div className="prose pt-1 text-black">
                {/* 假設 SectionItem 有 description 屬性 */}
                {item.description && <PortableText value={item.description} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StrategySection;
