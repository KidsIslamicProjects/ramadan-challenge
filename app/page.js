"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Banner from "./data/images/bannerHero.jpg";
import Navbar from "./components/Navbar";
import Countdown from "./components/CountDown";
import ChallengeItems from "./components/ChallengeItems";

export default function MaribChallenge() {
  const targetDate = new Date("2025-02-28T23:59:59").getTime();
  const [isCountdownActive, setIsCountdownActive] = useState(true);

  useEffect(() => {
    const now = new Date().getTime();
    const storedUserId = localStorage.getItem("userId");
    const isAdmin = storedUserId === "67bdb95c6cc8e6f2e2415e76";

    if (isAdmin) {
      setIsCountdownActive(false);
    } else {
      setIsCountdownActive(targetDate > now);
    }
  }, [targetDate]);
  return (
    <div
      dir="rtl"
      className="bg-white mx-auto overflow-x-hidden min-h-screen relative"
    >
      {/* Ensure Navbar stays clickable */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Countdown Overlay */}
      {isCountdownActive && (
        <div className="absolute w-full inset-0 flex items-center justify-center z-40 pointer-events-none">
          <div className="pointer-events-auto w-full">
            <Countdown />
          </div>
        </div>
      )}

      {/* Content */}
      <div
        className={`${
          isCountdownActive ? "opacity-40 blur-md" : "opacity-100"
        } transition-all duration-500`}
      >
        <div className="w-full h-auto mt-4">
          <Image src={Banner} alt="Banner" className="px-2" />
        </div>

        <div className="max-w-4xl mx-auto pt-2 px-6 text-center">
          <h2 className="text-xl md:text-2xl semi text-secondary mt-6">
            ما هو تحدي مأرَب؟
          </h2>
          <p dir="rtl" className="text-main regular mt-2 text-xl">
            تحدي رمضاني يهدف إلى تنظيم الوقت وزيادة الفعالية خلال شهر رمضان
            المبارك.
          </p>
        </div>

        {/* Always show ChallengeItems */}
        <ChallengeItems />
      </div>
    </div>
  );
}
