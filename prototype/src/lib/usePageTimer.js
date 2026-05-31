import { useRef } from "react";
export function usePageTimer() {
  const startTime = useRef(Date.now());

  const getElapsedTime = () => {
    return Math.round((Date.now() - startTime.current) / 1000);
  };

  const saveElapsedTime = (key) => {
    const elapsed = getElapsedTime();
    const existing = JSON.parse(localStorage.getItem("session_data") || "{}");
    existing[key] = (existing[key] || 0) + elapsed;
    localStorage.setItem("session_data", JSON.stringify(existing));
  };

  return { getElapsedTime, saveElapsedTime };
}
