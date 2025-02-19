"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Banner from "./data/images/bannerHero.jpg";
import { challenges } from "./data/challenges";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import Navbar from "./components/Navbar";

export default function MaribChallenge() {
  const handleLogout = () => {
    localStorage.removeItem("userId");
    window.location.href = "/login"; // Redirect after logout
  };
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, []);
  return (
    <div dir="rtl" className="bg-white min-h-screen">
      <Navbar />
      <button onClick={handleLogout}>Logout</button>
      {/* Banner */}
      <div className="w-full h-auto mt-4">
        <Image src={Banner} alt="Banner" className="px-2" />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto pt-2 px-6 text-center">
        <h2 className="text-xl md:text-2xl semi text-secondary mt-6">
          ما هو تحدي مأرَب؟
        </h2>
        <p dir="rtl" className="text-main regular mt-2 text-xl">
          تحدي رمضان يهدف إلى تنظيم الوقت وزيادة الفعالية خلال شهر رمضان
          المبارك.
        </p>
      </div>

      {/* Challenge Items */}
      <div className="max-w-4xl mx-auto py-6 px-6 text-right">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className="bg-[#f7f6f6] p-6 rounded shadow-md mb-6 relative"
          >
            <h3 className="text-2xl text-center bold text-main">
              {challenge.title}
            </h3>
            <p className="text-secondary text-lg semi mt-2">
              {challenge.subtitle}
            </p>
            <p className="text-main mt-2 regular w-[90%]">
              {challenge.description}
            </p>
            {userId ? (
              <>
                <Link href={challenge.link}>
                  <button className="mt-4 bg-main semi flex gap-2 justify-center items-center text-white px-4 py-2 rounded">
                    <FaArrowRightLong className="text-lg" />
                    الانتقال للتحدي
                  </button>
                </Link>
              </>
            ) : (
              <>
                <button
                  disabled
                  className="semi py-2 px-1 mt-4 rounded bg-gray-200 text-main"
                >
                  الرجاء تسجيل الدخول
                </button>
              </>
            )}
            <div className="absolute bottom-0 left-2">
              <Image src={challenge.image} alt="Boy" width={75} height={75} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
