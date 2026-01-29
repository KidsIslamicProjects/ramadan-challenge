"use client";

import { useRouter } from "next/navigation";
import {
  FaClock,
  FaLayerGroup,
  FaBookOpen,
  FaStar,
  FaChevronLeft,
} from "react-icons/fa";
import Image from "next/image";

export default function CoursesList({ categories }) {
  const router = useRouter();

  return (
    <div className="w-full space-y-8 pb-24 px-4 sm:px-6">
      {categories.map((cat) => (
        <div key={cat.id} className="space-y-4">
          {/* Category Title - Optional if you want to show category names */}
          {/* <h2 className="title text-xl text-main mb-4">{cat.name}</h2> */}

          {cat.courses && cat.courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {cat.courses.map((course, index) => (
                <div
                  key={course.id}
                  onClick={() => router.push(`/courses/${course.slug}`)}
                  className="group relative bg-white rounded-[2rem] p-4 shadow-sm border-2 border-transparent hover:border-main/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  {/* Decorative Background Blob (adds life) */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary/10 to-transparent rounded-bl-[4rem] -z-0" />

                  <div className="flex gap-4 relative z-10">
                    {/* LEFT (RTL: Right): Image Section */}
                    <div className="shrink-0 relative">
                      <div className="w-28 h-36 rounded-2xl overflow-hidden shadow-md border-2 border-white relative">
                        {/* Fallback pattern or Image */}
                        <Image
                          src={course.img}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          alt="course image"
                          width={120} // Always add width/height for Next/Image
                          height={160}
                        />
                        {/* Overlay tint on hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                      </div>

                      {/* Floating Badge - Made it pop more */}
                      <div className="absolute -top-3 -right-3 bg-secondary text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg border-2 border-white transform rotate-12">
                        جديد
                      </div>
                    </div>

                    {/* RIGHT (RTL: Left): Info Section */}
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        {/* Title */}
                        <h3 className="title text-main text-lg leading-tight mb-2 line-clamp-2">
                          {course.title}
                        </h3>

                        {/* Metadata Pills */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="inline-flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-lg text-[10px] font-bold text-gray-500">
                            <FaClock className="text-thirdly" />
                            15 دقيقة
                          </span>
                          <span className="inline-flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-lg text-[10px] font-bold text-gray-500">
                            <FaLayerGroup className="text-secondary" />
                            10 مراحل
                          </span>
                        </div>
                      </div>

                      {/* Gamification / Progress */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-bold">
                          <span className="text-gray-400">الإنجاز</span>
                          <span className="text-main">0%</span>
                        </div>
                        <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner">
                          <div className="h-full bg-gradient-to-l from-main to-secondary rounded-full transition-all duration-1000 w-[5%]"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Action Bar: Bottom of Card */}
                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-50">
                    <div className="flex items-center gap-1 text-xs font-bold text-gray-400">
                      <FaStar className="text-yellow-400 mb-0.5" />
                      <span>4.8</span>
                    </div>

                    {/* The Call to Action - Very clickable */}
                    <button className="flex items-center gap-2 text-main font-bold text-sm group-hover:gap-3 transition-all">
                      ابدأ التعلم
                      <div className="bg-main/10 p-1.5 rounded-full">
                        {/* Arrow flips automatically in RTL if using logical icons, 
                                 but often easier to force flip or use ChevronLeft for Arabic */}
                        <FaChevronLeft className="w-3 h-3 text-main" />
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Empty State - More illustrative
            <div className="flex flex-col items-center justify-center bg-white border-4 border-dashed border-gray-100 rounded-[2.5rem] p-12 text-center">
              <div className="bg-thirdly/10 p-6 rounded-full mb-4 animate-bounce">
                <FaBookOpen className="w-10 h-10 text-thirdly" />
              </div>
              <p className="title text-gray-400 text-lg">
                عذراً، لا توجد دورات هنا بعد
              </p>
              <p className="regular text-sm text-gray-300 mt-2">
                نعمل على إعداد محتوى ممتع لكم!
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
