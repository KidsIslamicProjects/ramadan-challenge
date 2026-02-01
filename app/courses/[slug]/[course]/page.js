"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowRight, FaPlay, FaCheck, FaStar, FaLock } from "react-icons/fa";

// --- STATIC DATA FOR THE VIDEOS (STAGES) ---
const COURSE_STAGES = [
  {
    id: 1,
    title: "الدرس الأول: ما دينك؟",
    description: "نتعرف على ديننا الإسلام وأركانه الخمسة العظيمة.",
    videoId: "7q28xjPFIl8", // First video provided
    duration: "15 دقيقة",
    isLocked: false,
    color: "bg-blue-700",
    shadow: "shadow-blue-200",
  },
  {
    id: 2,
    title: "الدرس الثاني: من نبيك؟",
    description: "قصة نبينا محمد ﷺ، نسبه، وولادته في مكة.",
    videoId: "hYfpprV4NVI", // Second video provided
    duration: "14 دقيقة",
    isLocked: false, // Unlocked for demo
    color: "bg-purple-700",
    shadow: "shadow-purple-200",
  },
  {
    id: 3,
    title: "الدرس الثالث: المراجعة النهائية",
    description: "مراجعة الأصول الثلاثة ومن هم المؤمنون؟",
    videoId: "E_cB7NHKC1g", // Third video provided
    duration: "15 دقيقة",
    isLocked: false, // Unlocked for demo
    color: "bg-green-700",
    shadow: "shadow-green-200",
  },
];

export default function CourseStagesPage({ params }) {
  const router = useRouter();

  // State to track which video is currently playing
  const [activeStage, setActiveStage] = useState(COURSE_STAGES[0]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans pb-12">
      {/* --- HEADER --- */}
      <header className="bg-main text-white p-6 rounded-b-[2.5rem] shadow-lg relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/20 rounded-full blur-xl -ml-5 -mb-5"></div>

        <div className="max-w-4xl mx-auto flex items-center justify-between relative z-10">
          <button
            onClick={() => router.back()}
            className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-all backdrop-blur-sm"
          >
            <FaArrowRight className="w-5 h-5" />
          </button>
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-1">منظومة الأصول الثلاثة</h1>
            <p className="text-white/80 text-xs">
              أكمل المراحل لتحصل على الكأس! 🏆
            </p>
          </div>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-8 space-y-8">
        {/* --- VIDEO PLAYER AREA --- */}
        <div className="bg-white p-4 rounded-3xl shadow-xl border-4 border-white ring-4 ring-gray-50/50">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-inner">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${activeStage.videoId}?rel=0&modestbranding=1`}
              title={activeStage.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0"
            ></iframe>
          </div>

          <div className="mt-4 px-2">
            <div className="flex items-center gap-3 mb-2">
              <span
                className={`px-3 py-1 rounded-full text-white text-xs font-bold ${activeStage.color}`}
              >
                المرحلة {activeStage.id}
              </span>
              <h2 className="text-xl font-bold text-gray-800">
                {activeStage.title}
              </h2>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              {activeStage.description}
            </p>
          </div>
        </div>

        {/* --- INTERACTIVE STAGES MAP (The Journey) --- */}
        <div className="relative pt-8 pb-12">
          {/* Connecting Line (The Road) */}
          <div className="absolute left-8 top-10 bottom-10 w-1 bg-gray-200 rounded-full md:left-1/2 md:-translate-x-1/2 z-0"></div>

          <div className="space-y-12 relative z-10">
            {COURSE_STAGES.map((stage, index) => {
              const isActive = activeStage.id === stage.id;

              return (
                <div
                  key={stage.id}
                  onClick={() => !stage.isLocked && setActiveStage(stage)}
                  className={`
                    relative flex items-center gap-6 transition-all duration-300 cursor-pointer group
                    ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}
                  `}
                >
                  {/* The Stage Node (Circle) */}
                  <div
                    className={`
                    relative shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border-4 border-white shadow-lg transition-transform duration-300
                    ${isActive ? `scale-110 ${stage.color} text-white ring-4 ring-offset-2 ring-opacity-50 ring-${stage.color.split("-")[1]}-400` : "bg-white text-gray-400 hover:scale-105"}
                    ${stage.isLocked ? "grayscale opacity-70" : ""}
                  `}
                  >
                    {stage.isLocked ? (
                      <FaLock className="w-6 h-6" />
                    ) : isActive ? (
                      <FaPlay className="w-6 h-6 ml-1 animate-pulse" />
                    ) : (
                      <span className="text-2xl font-bold">{stage.id}</span>
                    )}

                    {/* Star decoration for active stage */}
                    {isActive && (
                      <div className="absolute -top-2 -right-2 text-yellow-400 bg-white rounded-full p-1 shadow-sm">
                        <FaStar className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  {/* Stage Info Card */}
                  <div
                    className={`
                    flex-1 bg-white p-4 rounded-2xl shadow-md border-b-4 transition-all
                    ${isActive ? "border-main/50 translate-x-2" : "border-transparent hover:shadow-lg"}
                    ${stage.isLocked ? "opacity-60" : ""}
                  `}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <h3
                        className={`font-bold text-lg ${isActive ? "text-main" : "text-gray-700"}`}
                      >
                        {stage.title}
                      </h3>
                      <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500">
                        {stage.duration}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-2">
                      {stage.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Finish Line Flag */}
          <div className="flex justify-center mt-12 relative z-10">
            <div className="bg-secondary text-white px-6 py-2 rounded-full shadow-lg font-bold text-sm flex items-center gap-2 animate-bounce">
              <FaStar className="text-yellow-100" />
              نهاية المسار
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
