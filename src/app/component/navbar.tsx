"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import router, { useRouter } from "next/router";

gsap.registerPlugin(ScrollTrigger);

// 自定義 LinkedIn SVG 圖示組件
const LinkedInIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState<"text" | "logo">("text");
  const [isAnimating, setIsAnimating] = useState(false);
  const [targetContent, setTargetContent] = useState<"text" | "logo">("text");
  const [showHamburger, setShowHamburger] = useState(false);
  const [listSlidingOut, setListSlidingOut] = useState(false);
  const [listSlidingIn, setListSlidingIn] = useState(false); // 新增：控制 list 滑入
  const [showSlideOut, setShowSlideOut] = useState(false);
  const [showSlideIn, setShowSlideIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLight, setIsLight] = useState(false);

  // 初始載入動畫
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsMobileMenuOpen(false);
      setShouldShowMenu(false);
      setIsMenuAnimating(false);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  useEffect(() => {
    const handlePageTransitionStart = () => {
      setIsMobileMenuOpen(false);
      setShouldShowMenu(false);
      setMenuAnimationClass("menu-slide-out");
    };

    window.addEventListener("pageTransitionStart", handlePageTransitionStart);
    return () => {
      window.removeEventListener(
        "pageTransitionStart",
        handlePageTransitionStart
      );
    };
  }, []);

  // 監聽滾動事件
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 1024) return;

      const scrollTop = window.scrollY;
      const shouldBeScrolled = scrollTop > 100;

      if (shouldBeScrolled !== isScrolled && !isAnimating) {
        if (shouldBeScrolled) {
          startTransition("text", "logo", true);
        } else {
          startTransition("logo", "text", false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled, isAnimating]);

  // 監聽 body class 切換
  useEffect(() => {
    const handleThemeChange = (e: Event) => {
      const theme = (e as CustomEvent).detail;
      setIsLight(theme === "light");
    };

    window.addEventListener("themeChange", handleThemeChange);
    return () => window.removeEventListener("themeChange", handleThemeChange);
  }, []);

  const startTransition = (
    from: "text" | "logo",
    to: "text" | "logo",
    scrolled: boolean
  ) => {
    setIsAnimating(true);
    setTargetContent(to);
    setShowSlideOut(true);
    setShowSlideIn(true);

    if (scrolled && !isScrolled) {
      // 向下滾動：讓 list 滑出
      setListSlidingOut(true);
      setListSlidingIn(false);
    } else if (!scrolled && isScrolled) {
      // 回到頂部：讓 list 滑入
      setListSlidingOut(false);
      setListSlidingIn(true);
    }

    setTimeout(() => {
      setCurrentContent(to);
      setShowSlideOut(false);
      setShowSlideIn(false);
      setIsAnimating(false);

      if (scrolled) {
        setIsScrolled(true);
        setShowHamburger(true);
        setListSlidingOut(false);
      } else {
        setIsScrolled(false);
        setShowHamburger(false);
        // 稍後停止滑入動畫
        setTimeout(() => {
          setListSlidingIn(false);
        }, 600); // 等動畫完成後停止
      }
    }, 600);
  };

  // 每個 nav link 的自定義延遲時間（以毫秒為單位）
  const navLinks = [
    { name: "Projects", href: "/projects", delay: 0 }, // 無延遲
    { name: "About me", href: "/about", delay: 100 }, // 0.1秒延遲
    { name: "Contact", href: "#contact", delay: 200 }, // 0.2秒延遲
  ];

  const [isMenuAnimating, setIsMenuAnimating] = useState(false);
  const [shouldShowMenu, setShouldShowMenu] = useState(false);
  const [menuAnimationClass, setMenuAnimationClass] =
    useState("menu-slide-out");

  const toggleMobileMenu = () => {
    if (isMenuAnimating) return;

    if (isMobileMenuOpen) {
      setIsMenuAnimating(true);
      setMenuAnimationClass("menu-slide-out");

      setTimeout(() => {
        setIsMobileMenuOpen(false);
        setShouldShowMenu(false);
        setIsMenuAnimating(false);
      }, 300);
    } else {
      setIsMobileMenuOpen(true);
      setShouldShowMenu(true);
      setMenuAnimationClass("menu-slide-out");

      requestAnimationFrame(() => {
        setMenuAnimationClass("menu-slide-in");
      });
    }
  };

  const handleNavLinkClick = () => {
    // 關閉菜單
    setIsMobileMenuOpen(false);
    setShouldShowMenu(false);
    setIsMenuAnimating(false);
    setMenuAnimationClass("menu-slide-out");

    setShowHamburger(false);
    setListSlidingOut(false);
    setListSlidingIn(false);
    setShowSlideOut(false);
    setShowSlideIn(false);
  };

  const toggleLogoText = () => {
    if (isAnimating) return;

    const newTarget = currentContent === "text" ? "logo" : "text";
    setIsAnimating(true);
    setTargetContent(newTarget);
    setShowSlideOut(true);
    setShowSlideIn(true);

    setTimeout(() => {
      setCurrentContent(newTarget);
      setShowSlideOut(false);
      setShowSlideIn(false);
      setIsAnimating(false);
    }, 600);
  };

  const renderContent = (type: "text" | "logo") => {
    if (type === "text") {
      return (
        <div
          className={
            isLight
              ? "text-black"
              : "text-white" + " text-sm lg:text-base whitespace-nowrap"
          }
        >
          <strong>SHENG-CHI</strong> H.
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-start w-10 h-10">
          <Image
            src={
              isLight ? "/assets/chi4logo-black.svg" : "/assets/chi4logo.svg"
            }
            alt="Chi4 Logo"
            width={32}
            height={32}
            className="w-8 h-8 lg:w-10 lg:h-10"
            style={{
              width: "40px",
              height: "40px",
              maxWidth: "40px",
              maxHeight: "40px",
            }}
          />
        </div>
      );
    }
  };

  const renderLogoSection = () => (
    <Link
      href="/"
      className={`cursor-pointer relative overflow-hidden navbar-item-initial ${isLoaded ? "navbar-item-loaded" : ""}`}
    >
      <div
        onClick={toggleLogoText}
        className={` ${currentContent === "text" ? "logo-slide-in" : "navbar-item-initial"}`}
      >
        {renderContent("text")}
      </div>

      <div
        className={`logo-slide-base ${
          currentContent === "logo" ? "logo-slide-in" : "logo-slide-out"
        }`}
      >
        {renderContent("logo")}
      </div>
    </Link>
  );

  const renderNavLinks = (isMobile = false) => (
    <>
      {navLinks.map((link) => {
        const animateClass = isMobile
          ? `nav-item-animate ${
              isMobileMenuOpen ? "nav-item-in" : "nav-item-out"
            }`
          : `navbar-item-initial ${isLoaded ? "navbar-item-loaded" : ""}`;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={`
              block ${
                isLight
                  ? "text-black hover:text-gray-600"
                  : "text-gray-300 hover:text-white"
              } transition-colors duration-200
              ${isMobile ? "py-2" : "text-sm xl:text-base"}
              ${animateClass}
            `}
            style={{ transitionDelay: `${link.delay}ms` }}
            onClick={handleNavLinkClick}
          >
            {link.name}
          </Link>
        );
      })}
    </>
  );

  return (
    <nav
      className={`fixed z-50 lg:h-screen lg:w-auto w-full ${
        isLight ? "text-black" : "text-white"
      }${
        isMobileMenuOpen &&
        typeof window !== "undefined" &&
        window.innerWidth >= 1024
          ? ""
          : ""
      }`}
    >
      {/* 桌面版 - 垂直 Sidebar */}
      <div className="hidden lg:flex left-0 top-0 h-full flex-col w-auto pointer-events-none">
        {/* Logo/Text Section */}
        <div className="flex-shrink-0 p-4 xl:p-6 relative pointer-events-auto">
          {renderLogoSection()}
        </div>

        {/* Navigation Section */}
        <div className="flex-1 flex flex-col justify-center pointer-events-auto">
          <div className="px-4 xl:px-6">
            {/* 滾動後的佈局 */}
            {isScrolled && (
              <div className="flex flex-row items-center space-x-4">
                {/* Hamburger Icon with Slide-in */}
                {showHamburger && (
                  <div
                    className={`hamburger-slide-in relative ${
                      isMobileMenuOpen ? "z-90" : ""
                    }`}
                  >
                    <button
                      onClick={toggleMobileMenu}
                      className="hamburger"
                      aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                      <span
                        className={`${
                          isLight ? "bg-black" : "bg-white"
                        }  bar top ${isMobileMenuOpen ? "open" : ""}`}
                      ></span>
                      <span
                        className={`${
                          isLight ? "bg-black" : "bg-white"
                        } bar middle ${isMobileMenuOpen ? "open" : ""}`}
                      ></span>
                      <span
                        className={`${
                          isLight ? "bg-black" : "bg-white"
                        } bar bottom ${isMobileMenuOpen ? "open" : ""}`}
                      ></span>
                    </button>
                  </div>
                )}

                {/* Popup Menu & Overlay for Desktop */}
                {isMobileMenuOpen && (
                  <>
                    {/* Overlay */}
                    <div
                      className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 backdrop-blur-md"
                      style={{ pointerEvents: "auto" }}
                      onClick={toggleMobileMenu}
                    />
                    {/* Popup Menu */}
                    <div
                      className={`${
                        isLight ? "bg-white" : "bg-black"
                      }  fixed left-0 top-0 h-full w-[20rem] z-50 shadow-2xl flex flex-col justify-center px-24 py-12 popup-menu-slide-in`}
                      style={{ pointerEvents: "auto" }}
                    >
                      <nav className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                          <Link
                            key={link.name}
                            href={link.href}
                            className={`text-xl font-medium transition-colors duration-200 ${
                              isLight
                                ? "text-black hover:text-gray-600"
                                : "text-gray-300 hover:text-white"
                            }`}
                            onClick={toggleMobileMenu}
                          >
                            {link.name}
                          </Link>
                        ))}
                      </nav>
                      <div className="mt-12">
                        <a
                          href="https://linkedin.com/in/your-profile"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-3 text-lg transition-colors duration-200 ${
                            isLight
                              ? "text-black hover:text-gray-600"
                              : "text-gray-300 hover:text-white"
                          }`}
                        >
                          <LinkedInIcon size={28} />
                          <span>LinkedIn</span>
                        </a>
                      </div>
                    </div>
                  </>
                )}

                {/* Menu (滑入進場) */}
                {!isMobileMenuOpen && shouldShowMenu && showHamburger && (
                  <div
                    className={`space-y-3 menu-slide-base ${menuAnimationClass}`}
                  >
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={`
                          block ${
                            isLight
                              ? "text-black hover:text-gray-600"
                              : "text-gray-300 hover:text-white"
                          } transition-colors duration-200
                          text-sm xl:text-base
                          nav-item-animate ${
                            isMobileMenuOpen ? "nav-item-in" : "nav-item-out"
                          }
                        `}
                        style={{ transitionDelay: `${link.delay}ms` }}
                        onClick={handleNavLinkClick}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 未滾動時顯示完整選單 */}
            {!isScrolled && !listSlidingOut && (
              <div className="space-y-4 xl:space-y-4">
                {listSlidingIn
                  ? // 滑入動畫
                    navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={`
                        block ${
                          isLight
                            ? "text-black hover:text-gray-600"
                            : "text-gray-300 hover:text-white"
                        } transition-colors duration-200
                        text-sm xl:text-base
                        list-slide-in-item
                      `}
                        style={{ animationDelay: `${link.delay}ms` }}
                        onClick={handleNavLinkClick}
                      >
                        {link.name}
                      </Link>
                    ))
                  : // 正常顯示
                    renderNavLinks()}
              </div>
            )}

            {listSlidingOut && (
              <div className="space-y-4 xl:space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`
                      block ${
                        isLight
                          ? "text-black hover:text-gray-600"
                          : "text-gray-300 hover:text-white"
                      } transition-colors duration-200
                      text-sm xl:text-base
                      list-slide-out-item
                    `}
                    style={{ animationDelay: `${link.delay}ms` }}
                    onClick={handleNavLinkClick}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* LinkedIn Icon */}
        <div className="flex-shrink-0 p-4 xl:p-6 mt-auto pointer-events-auto">
          <div className="flex justify-start">
            <a
              href="https://linkedin.com/in/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors duration-200 navbar-item-initial ${
                isLoaded ? "navbar-item-loaded" : ""
              } ${
                isLight
                  ? "text-black hover:text-gray-600"
                  : "text-gray-300 hover:text-white"
              }`}
              aria-label="LinkedIn Profile"
            >
              <LinkedInIcon size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* 移動版 */}
      <div
        className={`lg:hidden top-0 left-0 right-0 ${
          isLight
            ? "bg-white border-b border-gray-200"
            : "bg-black border-b border-gray-800"
        } pointer-events-auto`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div
            className={`cursor-pointer navbar-item-initial ${
              isLoaded ? "navbar-item-loaded" : ""
            }`}
            onClick={toggleLogoText}
          >
            <div className="flex items-center h-8 relative">
              {!isAnimating && (
                <div className="flex items-center">
                  {renderContent(currentContent)}
                </div>
              )}

              {showSlideOut && (
                <div className="absolute slide-out-left">
                  {renderContent(currentContent)}
                </div>
              )}

              {showSlideIn && (
                <div className="absolute slide-in-left">
                  {renderContent(targetContent)}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={toggleMobileMenu}
            className={`transition-colors duration-200 navbar-item-initial ${
              isLoaded ? "navbar-item-loaded" : ""
            } ${
              isLight
                ? "text-black hover:text-gray-600"
                : "text-gray-300 hover:text-white"
            }`}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {(isMobileMenuOpen || shouldShowMenu) && (
          <div
            className={`border-t menu-slide-base ${
              isLight ? "bg-white border-gray-200" : "bg-black border-gray-800"
            }`}
          >
            <div className="px-4 py-4 space-y-3">
              {renderNavLinks(true)}

              <div
                className={`pt-4 border-t ${
                  isLight ? "border-gray-200" : "border-gray-800"
                } nav-item-animate ${
                  isMobileMenuOpen ? "nav-item-in" : "nav-item-out"
                }`}
                style={{ transitionDelay: "250ms" }}
              >
                <a
                  href="https://linkedin.com/in/your-profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center transition-colors duration-200 ${
                    isLight
                      ? "text-black hover:text-gray-600"
                      : "text-gray-300 hover:text-white"
                  }`}
                  aria-label="LinkedIn Profile"
                >
                  <LinkedInIcon size={20} />
                  <span className="ml-3">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
