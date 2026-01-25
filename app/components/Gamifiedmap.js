// components/learning/GamifiedMap.jsx
"use client";

import { useState } from "react";
import {
  FaLock as Lock,
  FaCheck as Check,
  FaPlay as Play,
} from "react-icons/fa";

export default function GamifiedMap({ courseData }) {
  const [currentStageId, setCurrentStageId] = useState(courseData.userProgress);

  const handleStageClick = (stage) => {
    if (stage.id === currentStageId) {
      alert(`Starting Quiz: ${stage.title}`);
      // In real app: router.push(`/quiz/${stage.id}`)
      // For demo, we just advance the user:
      setCurrentStageId((prev) => prev + 1);
    }
  };

  return (
    <div className="max-w-md mx-auto relative pb-24 pt-10">
      {/* The Path Line */}
      <div className="absolute left-1/2 top-10 bottom-0 w-3 bg-white border-2 border-gray-100 -translate-x-1/2 rounded-full z-0" />

      <div className="space-y-16 relative z-10">
        {courseData.stages.map((stage, index) => {
          const isCompleted = stage.id < currentStageId;
          const isCurrent = stage.id === currentStageId;
          const isLocked = stage.id > currentStageId;

          // Alternating Left/Right alignment
          const alignClass =
            index % 2 === 0
              ? "md:pr-16 md:items-start"
              : "md:pl-16 md:items-end";

          return (
            <div
              key={stage.id}
              className={`flex flex-col items-center relative ${alignClass} transition-all`}
            >
              {/* Avatar for Current Stage */}
              {isCurrent && (
                <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-30 animate-bounce">
                  <div className="relative">
                    <img
                      src={courseData.avatar}
                      alt="Avatar"
                      className="w-16 h-16 rounded-full border-4 border-white shadow-xl bg-gray-100"
                    />
                    <div className="absolute -bottom-2 inset-x-0 bg-secondary text-white text-[10px] font-bold text-center py-0.5 rounded-full shadow-sm">
                      أنا!
                    </div>
                  </div>
                </div>
              )}

              {/* Stage Button */}
              <button
                disabled={isLocked}
                onClick={() => handleStageClick(stage)}
                className={`
                  w-20 h-20 rounded-full flex items-center justify-center border-b-4 shadow-lg z-20 transition-all duration-300
                  ${isCompleted ? "bg-main text-white border-green-600" : ""}
                  ${isCurrent ? "bg-secondary text-white border-orange-600 scale-110 ring-4 ring-orange-200" : ""}
                  ${isLocked ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed" : ""}
                `}
              >
                {isCompleted && <Check size={32} strokeWidth={3} />}
                {isCurrent && <Play size={32} fill="currentColor" />}
                {isLocked && <Lock size={28} />}
              </button>

              {/* Label */}
              <div
                className={`mt-3 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-100 text-center max-w-[120px] z-20 ${isCurrent ? "scale-105 ring-2 ring-main/20" : "opacity-80"}`}
              >
                <span
                  className={`text-xs ${isCurrent ? "font-bold text-secondary" : "font-regular text-thirdly"}`}
                >
                  {stage.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
