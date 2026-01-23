"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Course from "../../public/Images/course.jpg";

const TopNav = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState({ text: "", iconSrc: "" });

  const getAvatarPath = (avatarName) => {
    if (!avatarName) return "/Images/avatar-boy-1.png";
    return `/Images/${avatarName}`;
  };

  useEffect(() => {
    // 1. Time Logic
    const hour = new Date().getHours();
    const isMorning = hour >= 5 && hour < 18;

    if (isMorning) {
      setGreeting({
        text: "صباح الخير",
        iconSrc: "/icons/sun.png", // Using your local image
      });
    } else {
      setGreeting({
        text: "مساء الخير",
        iconSrc: "/icons/moon.png", // Using your local image
      });
    }

    // 2. Fetch User Data
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
      className="w-full px-4 pt-6 pb-4 bg-main/50 flex flex-col gap-4"
      dir="rtl"
    >
      {/* TOP ROW */}
      <div className="flex items-center justify-between">
        {/* RIGHT SIDE: User Info */}
        <div className="flex items-center gap-3">
          {/* Avatar Container */}
          <div className="relative w-12 h-12 bg-white overflow-hidden rounded-full border border-gray-200 shadow-sm">
            {loading ? (
              <div className="w-full h-full animate-pulse" />
            ) : (
              <Image
                src={getAvatarPath(user?.avatar)}
                className="object-cover mt-1 "
                alt="User"
                fill
                sizes="48px"
              />
            )}
          </div>

          {/* Name & Greeting */}
          <div className="flex flex-col justify-center gap-0.5">
            <span className="font-bold text-white text-sm md:text-base leading-tight">
              {loading
                ? "جاري التحميل..."
                : `السلام عليكم،  ${user?.name?.split(" ")[0] || "يا بطل"}`}
            </span>

            {/* Greeting: Icon Image + Text */}
            {!loading && (
              <div className="flex flex-row-reverse justify-end items-center gap-1.5">
                {/* Sun or Moon Icon */}
                <div className="relative w-3 h-3">
                  <Image
                    src={greeting.iconSrc}
                    alt="Time Icon"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xs font-bold text-white tracking-wide">
                  {greeting.text}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* LEFT SIDE: Buttons */}
        <div className="flex items-center gap-3">
          {/* Notification Button */}
          <button className="relative w-12 h-12 rounded-2xl flex items-center justify-center active:scale-95 transition-all">
            {/* Bell Icon */}
            <div className="relative w-6 h-6">
              <Image
                src="/icons/bell.png"
                alt="Notifications"
                fill
                className="object-contain"
              />
            </div>
            {/* Red Badge */}
            <div className="absolute top-2.5 right-3 w-2.5 h-2.5 bg-red-500 rounded-full"></div>
          </button>

          {/* Search Button removed as requested */}
        </div>
      </div>

      {/* -------------------------------------------------
        CURRENT COURSE LOGIC (COMMENTED OUT)
        -------------------------------------------------
      */}
      {/* <div className="bg-white/10 border border-white/5 rounded-2xl p-3 flex flex-col gap-2 backdrop-blur-sm">
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
            
            <div className="w-full flex items-center gap-2">
              <div className="h-1.5 flex-1 bg-gray-600 rounded-full overflow-hidden">
                <div className="h-full bg-green-400 w-[42%] rounded-full"></div>
              </div>
              <span className="text-[10px] text-gray-300 font-medium">3/7</span>
            </div>
          </div>
        </Link>
      </div> 
      */}
    </header>
  );
};

export default TopNav;
