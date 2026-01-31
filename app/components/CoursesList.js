"use client";

import { useRouter } from "next/navigation";
import { FaBookOpen, FaChevronLeft, FaLayerGroup } from "react-icons/fa"; // Added FaLayerGroup
import Image from "next/image";

export default function CoursesList({ categories }) {
  const router = useRouter();

  return (
    <div className="w-full pt-8 pb-24 px-4 sm:px-6">
      {/* --- Professional Header Section --- */}
      <div className="text-center mb-12 space-y-2">
        <h1 className="title text-3xl md:text-4xl text-main font-bold">
          رحلتك التعليمية تبدأ هنا
        </h1>
        <p className="regular text-gray-500 mx-auto leading-relaxed">
          اختر المسار الذي يناسبك وابدأ في اكتساب مهارات جديدة ومعرفة قيمة من
          خلال دوراتنا المتخصصة
        </p>
        <div className="h-1.5 w-24 bg-secondary mx-auto rounded-full mt-4"></div>
      </div>
      {/* ----------------------------------- */}

      <div className="space-y-12">
        {categories.map((cat) => (
          <div key={cat.id} className="space-y-6">
            {cat.courses && cat.courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.courses.map((course) => (
                  <div
                    key={course.id}
                    onClick={() => router.push(`/courses/${course.slug}`)}
                    className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col h-full"
                  >
                    {/* 1. Image Section - UPDATED: Aspect Ratio 2:1 */}
                    <div className="relative w-full aspect-[2/1] overflow-hidden bg-gray-100">
                      <Image
                        src={course.img}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Optional Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                    </div>

                    {/* 2. Content Section */}
                    <div
                      className="p-5 flex flex-col flex-1 text-right"
                      dir="rtl"
                    >
                      {/* Title */}
                      <h3 className="bold text-main text-xl font-bold mb-3 leading-snug line-clamp-2 min-h-[3.5rem]">
                        {course.title}
                      </h3>

                      {/* Description */}
                      <p className="regular text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                        {course.description ||
                          "تأتي هذه الدورة استشعاراً لأهمية هذا المتن الجليل، الذي يُعد من أنفس ما ينبغي أن يعتني به المصلحون..."}
                      </p>

                      {/* Info Row: Progress & Course Count - UPDATED */}
                      <div className="flex items-center justify-between mb-6 text-xs font-bold text-gray-500 bg-gray-50 p-2 rounded-lg">
                        {/* Progress Bar */}
                        <div className="flex items-center gap-2 w-1/2">
                          <span>الإنجاز:</span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-secondary w-[0%]"></div>
                          </div>
                          <span className="text-secondary">0%</span>
                        </div>

                        {/* Course Count (Replaced Rating) */}
                        <div className="flex items-center gap-1.5 text-main">
                          <FaLayerGroup className="text-secondary text-sm" />
                          {/* You can make this dynamic later: {course.count || 3} */}
                          <span>عدد الدورات : 3</span>
                        </div>
                      </div>

                      {/* 3. Button */}
                      <button className="w-full bg-secondary text-white regular py-3 rounded-lg hover:bg-[#382c46] transition-colors flex items-center justify-center gap-2 group-hover:shadow-lg">
                        <span>انضم إلينا</span>
                        <FaChevronLeft className="text-xs mt-1 transition-transform group-hover:-translate-x-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Empty State
              <div className="flex flex-col items-center justify-center bg-white border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center">
                <div className="bg-gray-50 p-6 rounded-full mb-4">
                  <FaBookOpen className="w-10 h-10 text-gray-300" />
                </div>
                <p className="title text-gray-400 text-lg">
                  لا توجد دورات متاحة حالياً
                </p>
                <p className="regular text-sm text-gray-300 mt-2">
                  ترقبوا المزيد قريباً!
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
