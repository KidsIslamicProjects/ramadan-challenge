"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { challenges } from "../data/challenges";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
const ChallengeItems = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, []);

  return (
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
                <button className="mt-4 bg-main semi flex gap-2 justify-center items-center text-white px-2 py-1 rounded-sm ">
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
          <div className="absolute bottom-0 left-1">
            <Image
              src={challenge.image}
              alt="Boy"
              className="w-auto h-[93px]"
              style={{ width: challenge.width }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChallengeItems;
