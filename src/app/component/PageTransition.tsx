"use client";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
type TransitionPhase = "idle" | "sliding-in" | "covered" | "sliding-out";
// 定義頁面配置類型
interface PageConfig {
  type: "text" | "project";
  content: string;
  alt?: string;
  icon?: string;
}
// Portfolio頁面配置映射
const PAGE_CONFIGS: Record<string, PageConfig> = {
  "/": {
    type: "text",
    content: "Welcome...",
    icon: "🏠",
  },
  "/about": {
    type: "text",
    content: "About Me...",
    icon: "👋",
  },
  "/projects": {
    type: "text",
    content: "Loading Projects...",
    icon: "💼",
  },
};
// 從Sanity獲取project資料的函數
const getProjectImageFromSanity = async (
  slug: string
): Promise<string | null> => {
  try {
    // 這裡你需要根據你的Sanity配置調整
    const response = await fetch(`/api/project/${slug}?fields=thumbnail`);
    if (!response.ok) return null;
    const data = await response.json();
    // 假設你的project有coverImage或thumbnail欄位
    return data.coverImage?.asset?.url || data.thumbnail?.asset?.url || null;
  } catch (error) {
    console.error("Failed to fetch project image:", error);
    return null;
  }
};

// 根據路徑獲取配置
const getPageConfig = (path: string): PageConfig => {
  // 首先嘗試完全匹配
  if (PAGE_CONFIGS[path]) {
    return PAGE_CONFIGS[path];
  }
  // 檢查是否是project動態路由
  if (path.startsWith("/project/")) {
    return {
      type: "project",
      content: path.split("/project/")[1], // 取得slug
      alt: "Loading project...",
    };
  }
  // 預設配置
  return { type: "text", content: "Loading...", icon: "⚡" };
};
// Project載入內容組件
const ProjectLoadingContent = ({ slug }: { slug: string }) => {
  const [projectImage, setProjectImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchProjectImage = async () => {
      const imageUrl = await getProjectImageFromSanity(slug);
      setProjectImage(imageUrl);
      setIsLoading(false);
    };
    fetchProjectImage();
  }, [slug]);
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {/* Project 圖片區域 */}
      <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-gray-800">
        {isLoading ? (
          // 載入中的骨架屏
          <div className="w-full h-full bg-gray-700 animate-pulse flex items-center justify-center">
            <div className="text-gray-500 text-sm">📷</div>
          </div>
        ) : projectImage ? (
          <Image
            src={projectImage}
            alt={`${slug} project image`}
            fill
            className="object-cover animate-pulse"
            priority
          />
        ) : (
          // 沒有圖片時的fallback
          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
            <div className="text-gray-400 text-2xl">🎨</div>
          </div>
        )}
      </div>
      {/* 載入動畫 */}
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-white rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
      {/* 載入文字 */}
      <div className="text-center">
        <div className="text-white text-lg opacity-90">
          Loading {slug.replace("-", " ")}
        </div>
        <div className="text-gray-400 text-sm mt-1">
          Getting project details...
        </div>
      </div>
    </div>
  );
};
// Loading內容組件
const LoadingContent = ({ config }: { config: PageConfig }) => {
  // Project載入樣式 - 顯示該project的圖片
  if (config.type === "project") {
    return <ProjectLoadingContent slug={config.content} />;
  }
  // 文字載入樣式 (用於 home/about/projects)
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Icon */}
      {config.icon && (
        <motion.div
          className="text-4xl"
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          {config.icon}
        </motion.div>
      )}
      {/* 載入點動畫 */}
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-white rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
      <div className="text-white text-xl font-light">{config.content}</div>
    </div>
  );
};
export default function GlobalTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [transitionPhase, setTransitionPhase] =
    useState<TransitionPhase>("idle");
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [shouldPreventNavigation, setShouldPreventNavigation] = useState(false);
  // 獲取當前目標頁面的配置
  const currentConfig = getPageConfig(nextUrl || pathname);
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="/"]') as HTMLAnchorElement;
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || href === pathname || transitionPhase !== "idle") return;
      // 檢查是否是外部連結
      if (
        href.startsWith("http") ||
        href.startsWith("mailto") ||
        href.startsWith("tel")
      ) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      setNextUrl(href);
      setTransitionPhase("sliding-in");
      setShouldPreventNavigation(true);
    };
    // 攔截所有導航
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (shouldPreventNavigation) {
        e.preventDefault();
      }
    };
    document.addEventListener("click", handleLinkClick, true);
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      document.removeEventListener("click", handleLinkClick, true);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [pathname, transitionPhase, shouldPreventNavigation]);
  const handleSlideInComplete = () => {
    if (transitionPhase === "sliding-in" && nextUrl) {
      window.dispatchEvent(new Event("pageTransitionStart"));
      setTransitionPhase("covered");
      setShouldPreventNavigation(false);
      router.push(nextUrl);
    }
  };
  const handleSlideOutComplete = () => {
    if (transitionPhase === "sliding-out") {
      setTransitionPhase("idle");
      setNextUrl(null);
    }
  };
  // 監聽路由變化，當新頁面載入完成後開始滑出動畫
  useEffect(() => {
    if (transitionPhase === "covered" && nextUrl) {
      const timer = setTimeout(() => {
        setTransitionPhase("sliding-out");
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [pathname, transitionPhase, nextUrl]);
  return (
    <div className="relative">
      {/* 頁面內容 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      {/* 轉場 Overlay */}
      <AnimatePresence>
        {transitionPhase !== "idle" && (
          <motion.div
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            initial={{ x: "100%" }}
            animate={{
              x: transitionPhase === "sliding-out" ? "-100%" : "0%",
            }}
            exit={{ x: "-100%" }}
            transition={{
              duration: 0.6,
              ease: [0.76, 0, 0.24, 1],
            }}
            onAnimationComplete={() => {
              if (transitionPhase === "sliding-in") {
                handleSlideInComplete();
              } else if (transitionPhase === "sliding-out") {
                handleSlideOutComplete();
              }
            }}
          >
            {/* 動態載入內容 */}
            <LoadingContent config={currentConfig} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
