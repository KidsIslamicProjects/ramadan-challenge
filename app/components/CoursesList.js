"use client";

import { useRouter } from "next/navigation";
import {
  FaExclamationCircle,
  FaBookOpen,
  FaClock,
  FaLayerGroup,
} from "react-icons/fa";
import Image from "next/image";
export default function CoursesList({ categories }) {
  const router = useRouter();

  return (
    <div className="w-full space-y-12 pt-4 pb-24 px-4">
      {categories.map((cat) => (
        <div key={cat.id}>
          {/* Grid of Course Cards */}
          {cat.courses && cat.courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cat.courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-lg py-4 px-6 hover:shadow-xl transition-all duration-300 border-2 border-gray-100 flex flex-col justify-between"
                >
                  {/* Top Section: Image & Info */}
                  <div className="flex gap-5 mb-2">
                    {/* Course Image (Right side in RTL) */}
                    <div className="shrink-0 relative">
                      {/* Placeholder or Real Image */}
                      <div className="w-24 h-32 rounded-2xl bg-surface flex items-center justify-center overflow-hidden shadow-inner border border-gray-100">
                        {/* If you have a real image in DB, use <img src={course.image} /> here */}
                        {/* <FaBookOpen className="text-gray-300 w-8 h-8 opacity-50" /> */}
                        <Image
                          src={course.img}
                          className="w-full h-full object-cover"
                          alt="course image"
                        />
                      </div>

                      {/* Badge (Optional) */}
                      <div className="absolute -top-2 -right-2 bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                        جديد
                      </div>
                    </div>

                    {/* Text Info (Left side in RTL) */}
                    <div className="flex-1 py-1">
                      <h3 className="title text-secondary text-lg leading-tight mb-1">
                        {course.title}
                      </h3>

                      {/* Stats */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-500 text-xs regular">
                          <FaClock className="text-main w-3 h-3" />
                          <span>وقت القراءة اليوميّة: 15 دقيقة</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-xs regular">
                          <FaLayerGroup className="text-secondary w-3 h-3" />
                          <span>عدد المراحل: 0/10</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between text-[10px] text-gray-400 font-bold mb-2">
                            <span>مقدار الإنجاز</span>
                            <span>0%</span>
                          </div>
                          <div className="h-3 w-full bg-surface rounded-full overflow-hidden relative inner-shadow">
                            {/* Progress Fill */}
                            <div className="absolute right-0 top-0 bottom-0 w-[5%] bg-main rounded-full"></div>
                          </div>
                        </div>{" "}
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-100 mb-5"></div>

                  {/* Bottom Section: Progress & Button */}
                  <div className="flex items-start justify-between gap-4">
                    {/* Action Button (Left side in RTL) */}
                    <button
                      onClick={() => router.push(`/courses/${course.slug}`)}
                      className="bg-main text-white text-sm font-bold py-1 px-4 rounded hover:scale-105 active:scale-95 transition-all"
                    >
                      ابدأ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Empty State
            <div className="bg-white/50 border-2 border-dashed border-gray-200 rounded-[2rem] p-10 text-center">
              <FaExclamationCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="font-bold text-thirdly/60">
                جاري العمل على اضافة مواد لهذا المساق
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
