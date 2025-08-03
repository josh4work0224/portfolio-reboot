// Results 專用組件 (components/ResultsSection.tsx)
"use client";

import React, { useEffect, useRef } from "react";
import { PortableText } from "@portabletext/react";
import { RichTextBlock } from "../types/project";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ResultsSectionProps {
  data?: RichTextBlock[];
  backgroundColor?: string;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({
  data,
  backgroundColor = "#fefce8", // 淡黃色背景
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  // 將文字內容分解為字符的函數，正確處理空格
  const wrapTextInWordChars = (element: HTMLElement) => {
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null
    );

    const textNodes: Text[] = [];
    let node;

    // 收集所有文字節點
    while ((node = walker.nextNode())) {
      if (node.textContent && node.textContent.trim() !== "") {
        textNodes.push(node as Text);
      }
    }

    textNodes.forEach((textNode) => {
      const text = textNode.textContent || "";
      const parent = textNode.parentNode;
      if (!parent) return;

      const wrapper = document.createElement("span");
      wrapper.style.display = "inline";

      const words = text.split(" ");

      words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement("span");
        wordSpan.className = "word";
        wordSpan.style.display = "inline-block";
        wordSpan.style.whiteSpace = "nowrap";
        wordSpan.style.marginRight = "0.25em";

        word.split("").forEach((char) => {
          const charSpan = document.createElement("span");
          charSpan.className =
            "char transition-opacity duration-300 inline-block";
          charSpan.textContent = char;
          wordSpan.appendChild(charSpan);
        });

        wrapper.appendChild(wordSpan);
      });

      parent.replaceChild(wrapper, textNode);
    });
  };

  useEffect(() => {
    if (!data || data.length === 0 || !contentRef.current) return;

    // 清除之前的 ScrollTrigger 實例
    scrollTriggersRef.current.forEach((trigger) => trigger.kill());
    scrollTriggersRef.current = [];

    // 等待 PortableText 渲染完成
    const timer = setTimeout(() => {
      if (!contentRef.current) return;

      // 將文字分解為字符
      wrapTextInWordChars(contentRef.current);

      // 獲取所有字符元素
      const chars = contentRef.current.querySelectorAll(".char");

      if (chars.length === 0) return;

      // 設置初始狀態
      gsap.set(chars, { opacity: 0.2 });

      // 創建 ScrollTrigger 動畫
      const trigger = ScrollTrigger.create({
        trigger: contentRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
        animation: gsap.to(chars, {
          opacity: 1,
          stagger: 0.02, // 可以調整這個值來控制動畫速度
          ease: "none",
        }),
      });

      scrollTriggersRef.current.push(trigger);
    }, 100); // 給 PortableText 一點時間渲染

    return () => {
      clearTimeout(timer);
      scrollTriggersRef.current.forEach((trigger) => trigger.kill());
      scrollTriggersRef.current = [];
    };
  }, [data]);

  if (!data || data.length === 0) return null;

  const sectionStyle = backgroundColor ? { backgroundColor } : {};

  return (
    <section
      className="w-full mx-auto px-4 py-16 sm:px-6 lg:pl-48 lg:pr-16 gap-4 transition-colors duration-300"
      style={sectionStyle}
    >
      <div className="grid grid-cols-12">
        <div
          ref={contentRef}
          className="prose col-span-12 text-2xl font-medium text-black"
        >
          <PortableText value={data} />
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
