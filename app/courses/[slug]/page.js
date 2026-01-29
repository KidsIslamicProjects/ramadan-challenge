"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  FaArrowRight,
  FaPlayCircle,
  FaCheckCircle,
  FaStar,
  FaLock,
} from "react-icons/fa";

// --- MOCK DATA (Simulating your Database) ---
// In a real app, you would fetch this data based on the params.slug
const TRACK_DATA = {
  title: "المساق العقدي",
  slug: "aqeedah",
  description: "رحلة ممتعة نتعلم فيها أصول ديننا ومن هو ربنا ولماذا نعبده.",
  progress: 15, // Total track progress
  totalCourses: 3,
  completedCourses: 0,
  courses: [
    {
      id: 1,
      title: "لبنات العقيدة",
      slug: "building-blocks-aqeedah",
      img: "https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?q=80&w=1000&auto=format&fit=crop", // Placeholder
      description: "مدخل ميسر وسهل لفهم العقيدة الإسلامية",
      duration: "20 دقيقة",
      isLocked: false, // First one is open
      rating: 5.0,
    },
    {
      id: 2,
      title: "منظومة أحسن الإيمان",
      slug: "ahsan-al-iman",
      img: "https://images.unsplash.com/photo-1542816323-d154da4fc07c?q=80&w=1000&auto=format&fit=crop", // Placeholder
      description: "قصيدة جميلة نحفظ بها أسماء الله الحسنى",
      duration: "35 دقيقة",
      isLocked: true, // Locked until previous is done (Gamification)
      rating: 4.9,
    },
    {
      id: 3,
      title: "منظومة الأصول الثلاثة",
      slug: "usool-thalatha",
      img: "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1000&auto=format&fit=crop", // Placeholder
      description: "نظم شعري يسهل حفظ الأصول الثلاثة",
      duration: "40 دقيقة",
      isLocked: true,
      rating: 4.8,
    },
  ],
};

export default function TrackPage({ params }) {
  const router = useRouter();
  // In real app, fetch data using params.slug
  const data = TRACK_DATA;

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-24">
      {/* --- HERO SECTION --- */}
      <div className="relative bg-main rounded-b-[3rem] px-6 pt-12 pb-16 shadow-xl overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-48 h-48 bg-secondary/20 rounded-full blur-2xl" />

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-6 right-6 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all backdrop-blur-sm"
        >
          <FaArrowRight className="w-5 h-5" />
        </button>

        <div className="relative z-10 text-center space-y-4">
          <span className="inline-block bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
            المسار الحالي
          </span>
          <h1 className="title text-4xl text-white drop-shadow-sm">
            {data.title}
          </h1>
          <p className="regular text-white/90 text-lg max-w-md mx-auto leading-relaxed">
            {data.description}
          </p>

          {/* Overall Track Progress */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 max-w-sm mx-auto mt-6 border border-white/20">
            <div className="flex justify-between text-white text-xs font-bold mb-2">
              <span>نسبة إنجاز المساق</span>
              <span>{data.progress}%</span>
            </div>
            <div className="h-3 w-full bg-black/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary rounded-full transition-all duration-1000"
                style={{ width: `${data.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* --- COURSES LIST (The Journey) --- */}
      <div className="max-w-3xl mx-auto px-4 -mt-8 relative z-20 space-y-6">
        {data.courses.map((course, index) => (
          <div
            key={course.id}
            onClick={() =>
              !course.isLocked &&
              router.push(`/courses/${data.slug}/${course.slug}`)
            }
            className={`
              group relative flex items-center gap-4 bg-white p-4 rounded-[2rem] 
              border-2 transition-all duration-300
              ${
                course.isLocked
                  ? "border-gray-100 opacity-80 cursor-not-allowed grayscale-[0.5]"
                  : "border-transparent shadow-lg hover:shadow-2xl hover:-translate-y-1 cursor-pointer hover:border-main/30"
              }
            `}
          >
            {/* Number Badge (The "Step" visual) */}
            <div
              className={`
               absolute -top-3 -right-3 w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold border-4 border-white shadow-md z-30
               ${course.isLocked ? "bg-gray-200 text-gray-400" : "bg-thirdly text-white"}
            `}
            >
              {index + 1}
            </div>

            {/* Image */}
            <div className="shrink-0 relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-inner bg-gray-100">
              <Image
                src={course.img}
                alt={course.title}
                fill
                className="object-cover"
              />
              {/* Play Icon Overlay if active */}
              {!course.isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-all">
                  <FaPlayCircle className="text-white w-10 h-10 opacity-80 group-hover:scale-110 transition-transform" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 py-1">
              <div className="flex justify-between items-start">
                <h3
                  className={`title text-lg sm:text-xl mb-1 ${course.isLocked ? "text-gray-400" : "text-main"}`}
                >
                  {course.title}
                </h3>
                {course.isLocked && (
                  <FaLock className="text-gray-300 w-4 h-4 mt-1" />
                )}
              </div>

              <p className="regular text-xs sm:text-sm text-gray-400 line-clamp-2 mb-3">
                {course.description}
              </p>

              {/* Footer Metadata */}
              <div className="flex items-center gap-3">
                <span className="bg-main/10 text-main text-[10px] font-bold px-2 py-1 rounded-lg">
                  {course.duration}
                </span>
                {!course.isLocked && (
                  <div className="flex items-center gap-1 text-yellow-400 text-xs">
                    <FaStar />{" "}
                    <span className="text-gray-400 font-bold">
                      {course.rating}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Checkmark for finished courses (Optional visual) */}
            {/* <div className="absolute top-1/2 -left-3 -translate-y-1/2 bg-white rounded-full p-1 shadow-sm">
                <FaCheckCircle className="text-green-400 w-6 h-6" />
            </div> */}
          </div>
        ))}
      </div>

      {/* Decorative End Element */}
      <div className="text-center mt-12 opacity-50">
        <p className="title text-gray-400 text-sm">
          أكمل المساق لتحصل على الشهادة 🏆
        </p>
      </div>
    </div>
  );
}
