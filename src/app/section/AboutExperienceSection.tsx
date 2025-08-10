// components/ExperienceSection.tsx
"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  const experienceData = [
    {
      title: "Senior UI/UX Designer",
      company: "Tenten.co",
      period: "2022 - Present",
      description:
        "Designed responsive websites using Webflow and Shopify, automated workflows with Make.com and Zapier, and developed digital prototypes to align with business objectives.",
      skills: ["Webflow", "Shopify", "Automation", "Prototyping"],
    },
    {
      title: "Product Designer",
      company: "Netigate",
      period: "2021 - 2022",
      description:
        "Designed and maintained industrial IoT product interfaces with a focus on usability and user-centered principles. Conducted user research and iterative prototyping to enhance product experience.",
      skills: ["UI Design", "User Research", "Prototyping"],
    },
    {
      title: "Master in Interaction Design",
      company: "Domus Academy",
      period: "2020 - 2021",
      description:
        "Earned a Master's degree in Interaction Design in Italy, collaborating on projects that integrated design thinking, digital innovation, and user experience strategy.",
      skills: ["Interaction Design", "Design Thinking", "UX Strategy"],
    },
    {
      title: "Exhibition Designer & Filmmaker",
      company: "Freelance",
      period: "Previous Experience",
      description:
        "Gained hands-on experience in spatial storytelling and visual communication through designing exhibitions and creating films.",
      skills: ["Exhibition Design", "Storytelling", "Film Production"],
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
      className="w-full mx-auto px-4 py-16 sm:px-6 lg:pl-48 lg:pr-16"
    >
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Experience
          </h2>
          <p className="text-lg text-black">
            My professional journey and key milestones in design and
            development.
          </p>
        </div>

        {experienceData.map((item, index) => (
          <div
            key={index}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className="col-span-12 lg:col-span-6"
          >
            <div className={`border-l-2 pl-6 pb-8`}>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-2">
                <h3 className="text-2xl font-semibold text-black">
                  {item.title}
                </h3>
                <span className="text-xl text-gray-500 lg:text-right">
                  {item.period}
                </span>
              </div>
              <p className={`text-gray-700 font-medium mb-4`}>{item.company}</p>
              <p className="text-gray-500 mb-4">{item.description}</p>
              <div className="flex flex-wrap gap-2">
                {item.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className={`px-0.5 bg-black text-white text-sm rounded-xs`}
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

export default ExperienceSection;
