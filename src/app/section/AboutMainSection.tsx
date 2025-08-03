// components/AboutSection.tsx
"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  const subtitle =
    "I'm a digital designer and developer with a passion for creating beautiful, functional, and user-centered experiences. With over 5 years of experience in the industry, I've worked with startups and established companies to bring their visions to life.";

  // 將文字分解為字符的函數
  const wrapTextInWordChars = (element: HTMLElement, text: string) => {
    element.innerHTML = "";

    const words = text.split(" ");

    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement("span");
      wordSpan.className = "word-wrapper inline-block";
      wordSpan.style.display = "inline-block";
      wordSpan.style.marginRight = "0.25em";

      // 把每個字母變成 span.char
      word.split("").forEach((char) => {
        const charSpan = document.createElement("span");
        charSpan.className =
          "char inline-block transition-opacity duration-300";
        charSpan.textContent = char;
        wordSpan.appendChild(charSpan);
      });

      element.appendChild(wordSpan);
    });
  };

  useEffect(() => {
    if (!subtitleRef.current) return;

    // 清除之前的 ScrollTrigger 實例
    scrollTriggersRef.current.forEach((trigger) => trigger.kill());
    scrollTriggersRef.current = [];

    // 將副標題文字分解為字符
    wrapTextInWordChars(subtitleRef.current, subtitle);

    // 獲取所有字符元素
    const chars = subtitleRef.current.querySelectorAll(".char");

    if (chars.length === 0) return;

    // 設置初始狀態
    gsap.set(chars, { opacity: 0.3 });

    // 創建 ScrollTrigger 動畫
    const trigger = ScrollTrigger.create({
      trigger: subtitleRef.current,
      start: "top 50%",
      end: "bottom 30%",
      scrub: true,
      animation: gsap.to(chars, {
        opacity: 1,
        stagger: 0.01,
        ease: "none",
      }),
    });

    scrollTriggersRef.current.push(trigger);

    return () => {
      scrollTriggersRef.current.forEach((trigger) => trigger.kill());
      scrollTriggersRef.current = [];
    };
  }, []);

  return (
    <section className="w-full mx-auto px-4 py-16 sm:px-6 lg:pl-48 lg:pr-16">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8">
          {/* 主標題 - 無特效 */}
          <div className="h-[100vh] flex flex-col items-start justify-center relative">
            <div className="sticky top-[20vh]">
              <h1 className="text-6xl lg:text-8xl font-bold text-black mb-8">
                I&apos;m SHENGCHI
              </h1>
              {/* 副標題 - char by char 效果 */}
              <h2
                ref={subtitleRef}
                className="lg:text-4xl text-2xl font-medium text-black leading-tight tracking-tight mb-6"
              >
                {/* 文字會被 JavaScript 替換 */}
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-8 gap-4 mt-4 mb-8">
            <h3 className="text-xl font-semibold text-black col-span-8">
              Quick Facts
            </h3>
            <div className="lg:col-span-4 col-span-8 flex flex-col pt-2 gap-2 border-t-1 border-gray-700 text-lg">
              <p className="text-gray-500">
                <span className="text-black font-medium">Location:</span>{" "}
                Taipei, Taiwan
              </p>
            </div>
            <div className="lg:col-span-4 col-span-8 flex flex-col pt-2 gap-2 border-t-1 border-gray-700 text-lg">
              <p className="text-gray-500">
                <strong className="text-black font-medium">Experience:</strong>{" "}
                5+ Years
              </p>
            </div>
            <div className="lg:col-span-4 col-span-8 flex flex-col pt-2 gap-2 border-t-1 border-gray-700 text-lg">
              <p className="text-gray-500">
                <strong className="text-black font-medium">Focus:</strong> UI/UX
                Design & Development
              </p>
            </div>
            <div className="lg:col-span-4 col-span-8 flex flex-col pt-2 gap-2 border-t-1 border-gray-700 text-lg">
              <p className="text-gray-500">
                <strong className="text-black font-medium">Education:</strong>{" "}
                Design & Computer Science
              </p>
            </div>
          </div>
          <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
            <p>
              My approach combines strategic thinking with creative execution,
              ensuring that every project not only looks great but also serves
              its intended purpose effectively. I believe in the power of good
              design to solve complex problems and create meaningful connections
              between brands and their audiences.
            </p>
            <p>
              When I&apos;m not designing or coding, you can find me exploring
              new technologies, reading about design trends, or enjoying a good
              cup of coffee while sketching ideas for my next project.
            </p>
          </div>
        </div>
        <div className="none lg:block lg:col-span-1"></div>
        <div className="col-span-12 lg:col-span-3 relative flex flex-col items-end">
          <div className="lg:h-[30vh] lg:block none"></div>
          <Image
            className="sticky top-[20vh] object-cover aspect-square h-[30vh] align-end"
            src="/assets/personal-img.webp"
            alt="personal-potrait"
            width="1200"
            height="800"
          ></Image>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
