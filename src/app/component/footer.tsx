// src/app/component/footer.tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer>
      <div className="grid grid-cols-12 mx-auto px-4 py-8 sm:px-6 lg:px-48 justify-start items-start gap-4">
        <Link
          href="mailto:josh4work0224@gmail.com"
          className=" flex flex-row items-center justify-start hover:justify-between group gap-2 text-6xl font-medium col-span-12 text-black hover:text-gray-500 transition-colors duration-300"
        >
          Get in touch{" "}
          <ArrowRight
            size={48}
            className="group-hover:translate-x-4 transition-transform duration-300"
          />
        </Link>
        <p className="text-sm text-gray-500 col-span-12">
          © {new Date().getFullYear()} SHENG-CHI H. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
