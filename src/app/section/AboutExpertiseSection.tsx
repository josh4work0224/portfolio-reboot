// components/ExpertiseSection.tsx
"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ExpertiseSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  const expertiseData = [
    {
      title: "UI/UX Design",
      description:
        "Creating intuitive and engaging user interfaces that prioritize user experience and accessibility.",
      icon: (
        <svg
          className="w-6 h-6 text-gray-700"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
        </svg>
      ),
      skills: ["Figma", "Sketch", "Prototyping"],
    },
    {
      title: "Frontend Development",
      description:
        "Building responsive and performant web applications using modern technologies and best practices.",
      icon: (
        <svg
          className="w-6 h-6 text-gray-700"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      ),
      skills: ["React", "Next.js", "TypeScript"],
    },
    {
      title: "Brand & Visual Design",
      description:
        "Developing cohesive brand identities and visual systems that communicate effectively across all touchpoints.",
      icon: (
        <svg
          className="w-6 h-6 text-gray-700"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
        </svg>
      ),
      skills: ["Branding", "Logo Design", "Typography"],
    },
    {
      title: "No-Code Solutions",
      description:
        "Rapid prototyping and development using no-code tools for quick iterations and client demonstrations.",
      icon: (
        <svg
          className="w-6 h-6 text-gray-700"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clipRule="evenodd"
          />
        </svg>
      ),
      skills: ["Webflow", "Framer", "Notion"],
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    // 清除之前的 ScrollTrigger 實例
    scrollTriggersRef.current.forEach((trigger) => trigger.kill());
    scrollTriggersRef.current = [];

    // 為每個 card 設置 slide in 動畫
    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      // 設置初始狀態
      gsap.set(card, {
        y: 60,
        opacity: 0,
      });

      // 創建 ScrollTrigger 動畫
      const trigger = ScrollTrigger.create({
        trigger: card,
        start: "top 85%",
        onEnter: () => {
          gsap.to(card, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: index * 0.15,
          });
        },
      });

      scrollTriggersRef.current.push(trigger);
    });

    return () => {
      scrollTriggersRef.current.forEach((trigger) => trigger.kill());
      scrollTriggersRef.current = [];
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full mx-auto px-4 py-16 sm:px-6 lg:pl-48 lg:pr-16 bg-gray-50"
    >
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Expertise
          </h2>
          <p className="text-lg text-gray-700">
            Areas where I excel and can help bring your projects to life.
          </p>
        </div>

        {expertiseData.map((item, index) => (
          <div
            key={index}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className="col-span-12 lg:col-span-3"
          >
            <div className=" pt-4 border-t-1 border-gray-700 h-full">
              <div className="flex flex-row justify-between">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <div
                  className={`w-6 h-6 flex items-center justify-center mb-4`}
                >
                  {item.icon}
                </div>
              </div>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="flex flex-wrap gap-2">
                {item.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-0.5 bg-gray-700 text-white text-sm rounded-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExpertiseSection;
