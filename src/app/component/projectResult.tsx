// Results 專用組件 (components/ResultsSection.tsx)
"use client";

import React, { useEffect, useRef } from "react";
import { PortableText } from "@portabletext/react";
import { RichTextBlock } from "../types/project";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProjectResultProps {
  data?: RichTextBlock[];
  backgroundColor?: string;
}

const ProjectResult: React.FC<ProjectResultProps> = ({
  data,
  backgroundColor = "#fefce8",
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  const wrapTextInWordChars = (element: HTMLElement) => {
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null
    );

    const textNodes: Text[] = [];
    let node;

    while ((node = walker.nextNode())) {
      if (
        node.textContent &&
        node.textContent.trim() !== "" &&
        node.parentElement?.tagName !== "SCRIPT"
      ) {
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
        wordSpan.className = "word inline-block align-bottom";
        wordSpan.style.display = "inline-block";

        word.split("").forEach((char) => {
          const charSpan = document.createElement("span");
          charSpan.className =
            "char inline-block opacity-20 transition-opacity duration-300";
          charSpan.textContent = char;
          wordSpan.appendChild(charSpan);
        });

        wrapper.appendChild(wordSpan);

        if (wordIndex < words.length - 1) {
          const space = document.createElement("span");
          space.style.display = "inline-block";
          space.style.width = "0.5rem";
          wrapper.appendChild(space);
        }
      });

      parent.replaceChild(wrapper, textNode);
    });
  };

  const setupScrollAnimation = () => {
    if (!contentRef.current) return;

    const chars = contentRef.current.querySelectorAll(".char");
    if (chars.length === 0) return;

    gsap.set(chars, { opacity: 0.4 });

    const trigger = ScrollTrigger.create({
      trigger: contentRef.current,
      start: "top 80%",
      end: "bottom 20%",
      scrub: true,
      animation: gsap.to(chars, {
        opacity: 1,
        stagger: 0.02,
        ease: "none",
      }),
    });

    scrollTriggersRef.current.push(trigger);
  };

  useEffect(() => {
    if (!data || !contentRef.current) return;

    // 清除舊的
    scrollTriggersRef.current.forEach((t) => t.kill());
    scrollTriggersRef.current = [];

    // 嘗試等 PortableText 渲染完成
    let attempts = 0;
    const maxAttempts = 10;

    const waitForText = () => {
      if (!contentRef.current) return;

      const hasParagraphs = contentRef.current.querySelector("p");
      if (hasParagraphs) {
        wrapTextInWordChars(contentRef.current);
        setupScrollAnimation();
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(waitForText, 100); // 再等一下
      }
    };

    waitForText();

    return () => {
      scrollTriggersRef.current.forEach((t) => t.kill());
    };
  }, [data]);

  if (!data || data.length === 0) return null;

  return (
    <section
      className="w-full mx-auto px-4 py-16 sm:px-6 lg:pl-48 lg:pr-16 gap-4 transition-colors duration-300 overflow-hidden"
      style={{ backgroundColor }}
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

export default ProjectResult;
