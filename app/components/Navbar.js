"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const TopNav = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState({ text: "", iconSrc: "" });

  const getAvatarPath = (avatarName) => {
    if (!avatarName) return "/Images/avatar-boy-3.png";
    return `/Images/${avatarName}`;
  };

  useEffect(() => {
    // 1. Time Logic
    const hour = new Date().getHours();
    const isMorning = hour >= 5 && hour < 18;

    if (isMorning) {
      setGreeting({
        text: "صباح الخير",
        iconSrc: "/icons/sun.png",
      });
    } else {
      setGreeting({
        text: "مساء الخير",
        iconSrc: "/icons/moon.png",
      });
    }

    // 2. Fetch User Data
    const fetchUserData = async () => {
      // Trying to get user from LocalStorage first for speed
      const localUser = localStorage.getItem("user");
      let userId = localStorage.getItem("userId");

      if (localUser) {
        const parsed = JSON.parse(localUser);
        if (!userId) userId = parsed._id || parsed.id;
      }

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

  // Helper to format name based on role
  const getDisplayName = () => {
    const name = user?.name?.split(" ")[0] || "يا بطل";
    if (user?.role === "supervisor") {
      return `أ. ${name}`;
    }
    return name;
  };

  return (
    <header
      className="w-full px-4 pt-6 pb-4 bg-main flex flex-col gap-4"
      dir="rtl"
    >
      <div className="flex items-center justify-between">
        {/* RIGHT SIDE: User Info */}
        <div className="flex items-center gap-3">
          {/* Avatar Container */}
          <div className="relative w-12 h-12 bg-white overflow-hidden rounded-full border border-gray-200 shadow-sm">
            {loading ? (
              <div className="w-full h-full animate-pulse bg-gray-200" />
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
            <span className="title text-white text-lg md:text-xl leading-tight">
              {loading
                ? "جاري التحميل..."
                : `السـلام عليكـم،  ${getDisplayName()}`}
            </span>

            {!loading && (
              <div className="flex flex-row-reverse justify-end items-center gap-1.5">
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
          <button className="relative w-12 h-12 rounded-2xl flex items-center justify-center active:scale-95 transition-all">
            <div className="relative w-6 h-6">
              <Image
                src="/icons/bell.png"
                alt="Notifications"
                fill
                className="object-contain"
              />
            </div>
            <div className="absolute top-2.5 right-3 w-2.5 h-2.5 bg-red-500 rounded-full"></div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
