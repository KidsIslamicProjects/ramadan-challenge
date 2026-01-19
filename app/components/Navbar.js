"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineBell } from "react-icons/hi2";
import { FaStar } from "react-icons/fa";
import Avatar1 from "../../public/Images/avatar-1.png";
import Course from "../../public/Images/course.jpg";

const TopNav = () => {
  return (
    <header
      className="w-full px-4 pt-6 pb-4 bg-main text-white flex flex-col gap-4 rounded-b-2xl"
      dir="rtl"
    >
      {/* TOP ROW */}
      <div className="flex items-center justify-between">
        {/* RIGHT SIDE: User */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 bg-white overflow-hidden rounded-full">
            <Image src={Avatar1} className="mt-[3px]" alt="User" fill />
          </div>

          <div className="flex items-center gap-1">
            <span className="text-sm font-bold text-gray-100">
              السلامُ عليكُم، عبد الرحمن
            </span>
            <FaStar className="w-3 h-3 md:w-4 md:h-4 text-yellow-500" />
          </div>
        </div>

        {/* LEFT SIDE: Notifications */}
        <button className="relative p-2 rounded-full hover:bg-white/5 transition-colors">
          <HiOutlineBell className="w-5 h-5 md:w-7 md:h-7 text-white" />
          <div className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] bg-red-600 rounded-full">
            <span className="text-[10px] font-bold text-white leading-none px-1">
              10
            </span>
          </div>
        </button>
      </div>

      {/* CURRENT COURSE */}
      <div className="bg-white/5 rounded-xl p-3 flex flex-col gap-2">
        <span className="font-medium text-gray-300">الدورة الحالية</span>

        <Link
          href="/courses/quran-level-1"
          className="flex items-center gap-3 hover:bg-white/5 rounded-lg p-2 transition"
        >
          <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
            <Image src={Course} alt="Course" fill className="object-cover" />
          </div>

          <div className="flex flex-col flex-1">
            <span className="text-sm font-bold text-white">
              أساسيات التجويد
            </span>
            <span className="text-sm text-gray-300 font-regular">
              التقدم: <span className="font-semibold">3 / 7</span>
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default TopNav;
