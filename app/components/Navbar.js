"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineBell } from "react-icons/hi2";
import { FaStar } from "react-icons/fa";
import Course from "../../public/Images/course.jpg";

const TopNav = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to resolve avatar path
  const getAvatarPath = (avatarName) => {
    if (!avatarName) return "/Images/avatar-boy-1.png"; // Default fallback
    return `/Images/${avatarName}`;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://ramadan-server-topaz.vercel.app/api/users/${userId}`,
        );
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <header
      className="w-full px-4 pt-6 pb-4 bg-main text-white flex flex-col gap-4 rounded-b-3xl"
      dir="rtl"
    >
      {/* TOP ROW */}
      <div className="flex items-center justify-between">
        {/* RIGHT SIDE: User */}
        <div className="flex items-center gap-3">
          {/* Avatar with Loading State */}
          <div className="relative w-10 h-10 bg-white overflow-hidden rounded-full border-2 border-white/20">
            {loading ? (
              <div className="w-full h-full bg-gray-300 animate-pulse" />
            ) : (
              <Image
                src={getAvatarPath(user?.avatar)}
                className="object-cover mt-1" // Added slight margin for illustration alignment
                alt="User"
                fill
                sizes="40px"
              />
            )}
          </div>

          <div className="flex items-center gap-1">
            <span className="font-bold text-gray-100 text-sm md:text-base">
              {loading
                ? "جاري التحميل..."
                : `السلامُ عليكُم، ${user?.name?.split(" ")[0] || "يا بطل"}`}
            </span>
            <FaStar className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
          </div>
        </div>

        {/* LEFT SIDE: Notifications */}
        <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors">
          <HiOutlineBell className="w-6 h-6 text-white" />
          <div className="absolute top-1.5 right-1.5 flex items-center justify-center w-4 h-4 bg-red-600 rounded-full border-2 border-main">
            <span className="text-[9px] font-bold text-white leading-none">
              1
            </span>
          </div>
        </button>
      </div>

      {/* CURRENT COURSE (Static for now as DB schema doesn't have course data yet) */}
      <div className="bg-white/10 border border-white/5 rounded-2xl p-3 flex flex-col gap-2 backdrop-blur-sm">
        <span className="font-medium text-gray-200 text-sm px-1">
          الدورة الحالية
        </span>

        <Link
          href="/"
          className="flex items-center gap-3 bg-white/5 hover:bg-white/10 rounded-xl p-2 transition-all active:scale-[0.98]"
        >
          <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
            <Image src={Course} alt="Course" fill className="object-cover" />
          </div>

          <div className="flex flex-col flex-1 gap-1">
            <span className="text-sm font-bold text-white leading-tight">
              أساسيات التجويد
            </span>
            {/* Progress Bar Example */}
            <div className="w-full flex items-center gap-2">
              <div className="h-1.5 flex-1 bg-gray-600 rounded-full overflow-hidden">
                <div className="h-full bg-green-400 w-[42%] rounded-full"></div>
              </div>
              <span className="text-[10px] text-gray-300 font-medium">3/7</span>
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default TopNav;
