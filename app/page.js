"use client";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import CoursesList from "./components/CoursesList";
import Aakida from "../public/Images/aakida.jpg";
export default function MaribChallenge() {
  const LANDING_CATEGORIES = [
    {
      id: 1,
      courses: [
        {
          id: 101,
          title: "المسـاق  العقدي | رحلة عقديّة مع غُندَر",
          slug: "space-science",
          img: Aakida,
        },
        { id: 102, title: "المسـاق المقدسـي", slug: "human-body", img: Aakida },
      ],
    },
  ];

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
      <div className="relative z-50">
        <Navbar />
      </div>
      <div>
        <CoursesList categories={LANDING_CATEGORIES} />
      </div>
    </div>
  );
}
