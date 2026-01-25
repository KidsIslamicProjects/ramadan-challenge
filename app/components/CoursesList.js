// components/learning/CoursesList.jsx
"use client";

import { useRouter } from "next/navigation";
import {
  FaBookOpen as BookOpen,
  FaStar as Star,
  FaExclamationCircle as AlertCircle,
} from "react-icons/fa";
export default function CoursesList({ categories }) {
  const router = useRouter();

  return (
    <div className="grid gap-8 max-w-xl mx-auto w-full">
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="bg-white rounded-3xl p-6 shadow-lg border-b-4 border-main/20"
        >
          {/* Section Title */}
          <h2 className="text-2xl font-bold text-thirdly mb-6 flex items-center gap-3">
            <div className="bg-secondary/10 p-2 rounded-lg">
              <BookOpen className="text-secondary w-6 h-6" />
            </div>
            {cat.title}
          </h2>

          {/* Courses List or Empty State */}
          {cat.courses && cat.courses.length > 0 ? (
            <div className="space-y-4">
              {cat.courses.map((course) => (
                <button
                  key={course.id}
                  onClick={() => router.push(`/courses/${course.slug}`)}
                  className="group w-full bg-surface hover:bg-main hover:text-white transition-all duration-300 rounded-2xl p-4 flex items-center justify-between text-right border border-transparent hover:border-main/50 shadow-sm"
                >
                  <span className="font-bold text-thirdly group-hover:text-white text-lg">
                    {course.title}
                  </span>
                  <div className="bg-white rounded-full p-2 shadow-sm group-hover:scale-110 transition-transform">
                    <Star className="text-secondary w-5 h-5 fill-current" />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            // Empty State
            <div className="bg-surface/50 border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center">
              <AlertCircle className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <p className="font-bold text-thirdly/60 text-sm">
                جاري العمل على اضافة مواد لهذا المساق
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
