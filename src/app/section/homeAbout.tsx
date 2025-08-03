"use client";

// components/HeroSection.tsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const headline = "Hi, I'm SHENG CHI — a Digital Designer who Builds.";

const AboutSection: React.FC = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headlineRef.current) return;
    const chars = headlineRef.current.querySelectorAll(".char");
    gsap.set(chars, { opacity: 0.2 });
    gsap.to(chars, {
      opacity: 1,
      stagger: 0.4,
      ease: "none",
      scrollTrigger: {
        trigger: headlineRef.current,
        start: "top 80%",
        end: "top 20%",
        scrub: true,
      },
    });

    // 卡片 slide in 動畫（trigger 用第一張卡片，三張卡 stagger 進場）
    if (cardsContainerRef.current) {
      const cards = cardsContainerRef.current.querySelectorAll(".about-card");
      gsap.set(cards, { y: 40, opacity: 0 });

      // 針對每一張卡片建立 ScrollTrigger
      cards.forEach((card, idx) => {
        const isXL = window.innerWidth >= 1280;
        ScrollTrigger.create({
          trigger: card,
          start: "top 80%",
          end: "bottom top",
          onEnter: () => {
            gsap.to(card, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              delay: isXL ? idx * 0.2 : 0,
            });
          },
          ...(isXL && {
            onLeave: () => {
              gsap.set(card, { y: 40, opacity: 0 });
            },
            onLeaveBack: () => {
              gsap.set(card, { y: 40, opacity: 0 });
            },
          }),
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      className="min-h-screen flex items-start justify-start relative z-10"
      id="about"
    >
      <div
        className="grid grid-cols-12 mx-auto px-4 py-64 sm:px-6 lg:px-48 justify-start items-start gap-4"
        ref={cardsContainerRef}
      >
        {/* 主標題 */}
        <div className="xl:col-span-10 col-span-12 relative h-[80vh]">
          <h2
            ref={headlineRef}
            className="sticky top-[calc(50%-96px)] lg:text-8xl md:text-6xl text-4xl font-bold text-white mb-6 tracking-tight leading-none"
            aria-label={headline}
          >
            {headline.split(" ").map((word, wi) => (
              <span key={wi} className="word inline-block mr-2 align-bottom">
                {word.split("").map((char, ci) => (
                  <span
                    key={ci}
                    className="char inline-block opacity-20 transition-opacity duration-300"
                    aria-hidden="true"
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h2>
        </div>
        <div className="col-span-2 xl:block hidden"></div>

        {/* 副標題 */}
        <p className="xl:col-span-6 col-span-12 text-xl text-white mb-8 max-w-xl">
          From interfaces to systems, I design and develop websites that are
          beautiful, functional, and scalable.
        </p>
        <div className="col-span-6"></div>
        <div className="xl:col-span-4 col-span-12 about-card flex flex-col gap-2 text-white border-t-2 py-4 mt-16">
          <h3 className="text-2xl font-bold">Product & UI/UX Design</h3>
          <p className="text-lg">
            Crafting intuitive user flows and clean interfaces that prioritize
            clarity and usability.
          </p>
          <div className="flex flex-row gap-2 mt-8 flex-wrap">
            <p className="px-0.5 bg-white text-black rounded-xs">UI Design</p>
            <p className="px-0.5 bg-white text-black rounded-xs">UX Design</p>
            <p className="px-0.5 bg-white text-black rounded-xs">
              Design Systems
            </p>
            <p className="px-0.5 bg-white text-black rounded-xs">Figma</p>
          </div>
        </div>
        <div className="xl:col-span-4 col-span-12 about-card flex flex-col gap-2 text-white border-t-2 py-4 mt-16">
          <h3 className="text-2xl font-bold">No-Code Development</h3>
          <p className="text-lg">
            Building scalable, responsive websites and web apps without code —
            fast and flexible.
          </p>
          <div className="flex flex-row gap-2 mt-8 flex-wrap">
            <p className="px-0.5 bg-white text-black rounded-xs">Webflow</p>
            <p className="px-0.5 bg-white text-black rounded-xs">Shopify</p>
            <p className="px-0.5 bg-white text-black rounded-xs">
              CMS Integration
            </p>
            <p className="px-0.5 bg-white text-black rounded-xs">Prototyping</p>
          </div>
        </div>
        <div className="xl:col-span-4 col-span-12 about-card flex flex-col gap-2 text-white border-t-2 py-4 mt-16">
          <h3 className="text-2xl font-bold">Creative Tech & Motion</h3>
          <p className="text-lg">
            Adding life to interfaces with motion and visual storytelling
            through animation and interaction.
          </p>
          <div className="flex flex-row gap-2 mt-8 flex-wrap">
            <p className="px-0.5 bg-white text-black rounded-xs">Spline</p>
            <p className="px-0.5 bg-white text-black rounded-xs">Rive</p>
            <p className="px-0.5 bg-white text-black rounded-xs">Lottie</p>
            <p className="px-0.5 bg-white text-black rounded-xs">
              Video Editing
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
