// 通用的 Section 組件 (components/ProjectSection.tsx)
"use client";

import React, { useEffect, useRef } from "react";
import { PortableText } from "@portabletext/react";
import { SectionItem, RichTextBlock } from "../types/project";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 創建聯合類型來處理不同的 item 類型
type ProjectSectionItem = SectionItem | { description: RichTextBlock[] };

interface ProjectColumnComponentProps {
  title: string;
  items?: ProjectSectionItem[];
  showTitleField?: boolean;
  backgroundColor?: string;
  textColor?: string;
  className?: string;
}

const ProjectColumnComponent: React.FC<ProjectColumnComponentProps> = ({
  title,
  items,
  showTitleField = true,
  backgroundColor,
  textColor = "text-gray-900",
  className = "",
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]); // 存儲當前組件的 ScrollTrigger 實例

  useEffect(() => {
    if (!items || items.length === 0) return;

    // 清除當前組件的 ScrollTrigger 實例
    scrollTriggersRef.current.forEach((trigger) => trigger.kill());
    scrollTriggersRef.current = [];

    // 為每個 project-col-item 設置初始狀態和動畫
    itemsRef.current.forEach((item, index) => {
      if (!item) return;

      // 設置初始狀態
      gsap.set(item, {
        y: 60,
        opacity: 0,
      });

      // 創建 scroll trigger 動畫
      const trigger = ScrollTrigger.create({
        trigger: item,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse",
        animation: gsap.to(item, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: index * 0.1,
        }),
      });

      // 將 ScrollTrigger 實例存儲到 ref 中
      scrollTriggersRef.current.push(trigger);
    });

    // 清理函數
    return () => {
      scrollTriggersRef.current.forEach((trigger) => trigger.kill());
      scrollTriggersRef.current = [];
    };
  }, [items]);

  if (!items || items.length === 0) return null;

  const sectionStyle = backgroundColor ? { backgroundColor } : {};

  // 類型守衛函數來檢查是否有 title 屬性
  const hasTitle = (item: ProjectSectionItem): item is SectionItem => {
    return "title" in item && item.title !== undefined;
  };

  return (
    <section
      ref={sectionRef}
      className={`w-full mx-auto px-4 py-16 sm:px-6 lg:pl-48 lg:pr-16 grid grid-cols-12 gap-4 transition-colors duration-300 ${className}`}
      style={sectionStyle}
    >
      <h2 className={`text-3xl col-span-12 font-bold mb-2 ${textColor}`}>
        {title}
      </h2>
      {items.map((item: ProjectSectionItem, index: number) => (
        <div
          key={index}
          ref={(el) => {
            itemsRef.current[index] = el;
          }}
          className={`border-t-1 pt-2 col-span-12 lg:col-span-4 px-0 project-col-item
             ${textColor}`}
        >
          {showTitleField && hasTitle(item) && item.title && (
            <h3 className={`text-xl font-bold mb-2 ${textColor}`}>
              {item.title}
            </h3>
          )}
          <div className="prose max-w-none">
            <PortableText value={item.description} />
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProjectColumnComponent;
