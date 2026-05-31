import { useRef, useLayoutEffect, useState, useEffect } from "react";
import { WrapperSC, CanvasSC } from "./ScratchCardSC";

export default function ScratchCard({ children, onProgress }) {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const [scratchPct, setScratchPct] = useState(0);

  useEffect(() => {
    onProgress?.(scratchPct);
  }, [scratchPct]);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    function init() {
      canvas.width = wrapper.offsetWidth;
      canvas.height = wrapper.offsetHeight;
      drawCoating(
        canvas.getContext("2d", { willReadFrequently: true }),
        canvas.width,
        canvas.height,
      );
    }

    const images = Array.from(wrapper.querySelectorAll("img"));
    const unloaded = images.filter((img) => !img.complete);

    if (unloaded.length === 0) {
      init();
    } else {
      let count = 0;
      unloaded.forEach((img) => {
        img.addEventListener("load", () => {
          if (++count === unloaded.length) init();
        });
      });
    }
  }, []);

  function drawCoating(ctx, w, h) {
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#9e9e9e");
    grad.addColorStop(0.5, "#c8c8c8");
    grad.addColorStop(1, "#8e8e8e");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < (w * h) / 25; i++) {
      const v = 100 + Math.floor(Math.random() * 80);
      ctx.fillStyle = `rgba(${v},${v},${v},0.2)`;
      ctx.fillRect(Math.random() * w, Math.random() * h, 2, 2);
    }

    ctx.fillStyle = "rgba(255,255,255,0.45)";
    ctx.font = `bold ${Math.max(9, Math.floor(h * 0.28))}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("SCRATCH", w / 2, h / 2);
  }

  function getPos(e) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    return {
      x: (src.clientX - rect.left) * (canvas.width / rect.width),
      y: (src.clientY - rect.top) * (canvas.height / rect.height),
    };
  }

  function doScratch(e) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { x, y } = getPos(e);

    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 16, 0, Math.PI * 2);
    ctx.fill();

    const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    for (let i = 3; i < d.length; i += 4) if (d[i] === 0) cleared++;
    const pct = cleared / (d.length / 4);
    setScratchPct(pct);
  }

  return (
    <WrapperSC ref={wrapperRef}>
      {children}
      <CanvasSC
        ref={canvasRef}
        onMouseMove={doScratch}
        onTouchMove={(e) => {
          e.preventDefault();
          doScratch(e);
        }}
      />
    </WrapperSC>
  );
}
