"use client";

import React from "react";

function LogoDotPattern() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  const logoPath =
    "M692 173H623.261V207.738H588.892V0L541.05 48.094L540.569 47.9556C488.672 32.4548 428.25 24.22 365.767 24.22C186.497 24.22 46.1333 89.5448 46.1333 173C46.1333 256.455 186.497 321.78 365.767 321.78C394.981 321.78 423.714 319.912 451.415 316.382V346H588.892V276.938H657.631V242.2H692V173ZM365.767 301.02C203.682 301.02 66.7548 242.408 66.7548 173C66.7548 103.592 203.682 44.98 365.767 44.98C422.201 44.98 476.642 51.9692 524.278 64.9788L313.938 276.8H451.415V295.484C423.782 299.152 395.05 301.02 365.767 301.02Z";

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const logoW = 692,
      logoH = 346;
    const path2d = new Path2D(logoPath);
    const mouse = { x: -1000, y: -1000 };
    let animationId: number;
    let t = 0;

    let isMobile: boolean,
      spacing: number,
      radius: number,
      scale: number,
      offsetX: number,
      offsetY: number;

    function updateParams() {
      if (!canvas || !ctx) return;

      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      isMobile = window.innerWidth < 768;
      spacing = isMobile ? 10 : 18;
      radius = isMobile ? 1.2 : 2;

      // 用「真正的視窗高度」當 80% 上限（iOS 用 visualViewport 較準）
      const viewportH = window.visualViewport?.height || window.innerHeight;

      const maxH = viewportH * 0.6; // 絕對不超過 80vh
      const maxW = width * 0.9; // 也可改成 viewport 寬度上限： (window.visualViewport?.width || window.innerWidth) * 0.9

      const scaleH = maxH / logoH;
      const scaleW = maxW / logoW;
      scale = Math.min(scaleH, scaleW);

      const scaledLogoW = logoW * scale;
      const scaledLogoH = logoH * scale;

      // 畫在目前這個 canvas 中置中（大小受 viewport 上限控制）
      offsetX = (width - scaledLogoW) / 2;
      offsetY = (height - scaledLogoH) / 2;
    }

    updateParams();

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      for (let screenY = 0; screenY < height; screenY += spacing) {
        for (let screenX = 0; screenX < width; screenX += spacing) {
          const logoX = (screenX - offsetX) / scale;
          const logoY = (screenY - offsetY) / scale;

          if (ctx.isPointInPath(path2d, logoX, logoY)) {
            let alpha = 0.18;
            if (isMobile) {
              const wave = Math.sin((screenX + screenY) / 30 + t) * 0.5 + 0.5;
              alpha += wave * 0.5;
            } else {
              const dist = Math.hypot(mouse.x - screenX, mouse.y - screenY);
              const featherRadius = 100;
              const tt = Math.min(dist / featherRadius, 1);
              alpha += (0.95 - 0.18) * Math.exp(-4 * tt * tt);
            }
            ctx.beginPath();
            ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${alpha})`;
            ctx.fill();
          }
        }
      }
      t += 0.03;
    }

    function animate() {
      draw();
      animationId = requestAnimationFrame(animate);
    }

    function onMouseMove(e: MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }

    function onResize() {
      setTimeout(() => {
        updateParams();
        draw();
      }, 100);
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

export default LogoDotPattern;
