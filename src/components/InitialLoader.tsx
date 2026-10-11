"use client";

import { useEffect, useState } from "react";
import { toBengaliNumber } from "@/lib/utils";

export default function InitialLoader() {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsDone(true), 350);
          return 100;
        }
        const step = Math.floor(Math.random() * 4) + 3;
        return Math.min(prev + step, 100);
      });
    }, 60);

    return () => clearInterval(timer);
  }, []);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-9999 w-screen h-screen flex items-center justify-center bg-[#f4f6f2] transition-opacity duration-500 ease-out ${
        progress === 100 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-6 p-6 max-w-xs text-center select-none">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-20 h-20 rounded-2xl bg-[#107c41]/15 animate-ping" />
          <div className="relative w-16 h-16 rounded-2xl bg-[#107c41] flex items-center justify-center text-white text-3xl shadow-lg shadow-[#107c41]/25">
            🛒
          </div>
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-black text-[#1f2937] tracking-tight">
            বাজার দর
          </h2>
          <p className="text-xs font-semibold text-[#6b7280]">
            আজকের বাজার তথ্য লোড হচ্ছে...
          </p>
        </div>

        <div className="w-52 space-y-2.5">
          <div className="w-full h-2 bg-[#e5e9e2] rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-[#107c41] rounded-full transition-all duration-100 ease-out shadow-xs"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-xs font-bold text-gray-500 px-0.5">
            <span className="text-[11px] text-gray-400">অগ্রগতি</span>
            <span className="text-sm font-extrabold text-[#107c41]">
              {toBengaliNumber(progress)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
