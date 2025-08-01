"use client";

// components/HeroSection.tsx
import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowDown } from "lucide-react";

const LogoDotPattern = dynamic(() => import("../component/heroBackground"), {
  ssr: false,
});

const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center overflow-hidden">
      <div className="fixed w-screen h-screen top-0 left-[40vw]">
        <LogoDotPattern />
      </div>

      <div className="grid grid-cols-12 gap-4 mx-auto px-4 sm:px-6 lg:px-16 xl:px-36 justify-start justify-items-start">
        {/* 主標題 */}
        <h1 className="lg:col-span-10 lg:col-start-2 col-span-12 col-start-1 hero-main-heading font-bold text-white mb-6 tracking-tight leading-none">
          Creative thinking, <br />
          Smart solutions.
        </h1>

        {/* 副標題 */}
        <p className="lg:col-span-10 lg:col-start-2 col-span-12 col-start-1 row-star-2 text-xl sm:text-2xl text-white mb-8 max-w-xl">
          I turn complex ideas into clean, intuitive designs — built to solve
          problems and stand out.
        </p>

        <Link
          className="lg:col-span-10 lg:col-start-2 col-span-12 col-start-1 row-star-3 flex flex-col gap-2 group overflow-hidden "
          href="#about"
        >
          <div>
            <div className="flex flex-row gap-2">
              <p className="font-semibold transition-colors duration-300 text-white group-hover:text-gray-500">
                Scroll down to discover
              </p>
              <div className="flex flex-col gap-y-4 justify-end h-5 group-hover:translate-y-8 transition-transform duration-300">
                <div className="h-4">
                  <ArrowDown size={20} color="white" />
                </div>
                <div className="h-4">
                  <ArrowDown size={20} color="white" />
                </div>
              </div>
            </div>
          </div>

          <div className="h-[2px] bg-gray-200 w-full group-hover:w-0 transition-all"></div>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
