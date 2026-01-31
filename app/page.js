"use client";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import CoursesList from "./components/CoursesList";
import Aakida from "../public/Images/aakida.jpg";
import Aakida1 from "../public/Images/aakida1.jpg";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BsPersonVideo3 } from "react-icons/bs";
import { RxVideo } from "react-icons/rx";

export default function MaribChallenge() {
  const router = useRouter();

  // 1. Auth State
  const [authState, setAuthState] = useState({
    isLoading: true,
    isLoggedIn: false,
    role: "student", // default
  });

  // 2. Data Constants
  const LANDING_CATEGORIES = [
    {
      id: 1,
      courses: [
        {
          id: 101,
          title: " رحلة عقديّة مع غُندَر | المسـاق  العقدي ",
          description:
            "المساق العقدي: رحلةٌ شيّقةٌ في أجلّ العلوم وأشرفها، بتعرّف بها الطالب على خالقه ودينه",
          slug: "aakida",
          lessons: 3,
          img: Aakida,
        },
        {
          id: 102,
          title: "رحلة إلى القدس مع حنبل | المسـاق المقدسـي",
          description:
            "المساق المقدسي: مساق توعويّ تجاه مسجدنا الأقصى المبارك، يرنو لتعريف الطالب بمركزية هذا االمسجد المبارك",
          slug: "qudus",
          lessons: 7,
          img: Aakida1,
        },
      ],
    },
  ];

  // 3. Check Authentication on Mount
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const userRole = localStorage.getItem("userRole"); // Need to ensure Signup/Login saves this!

    setAuthState({
      isLoading: false,
      isLoggedIn: !!userId, // true if userId exists
      role: userRole || "student",
    });
  }, []);

  // 4. View Components

  // View A: Teacher Dashboard (The 2 Big Cards)
  const TeacherView = () => (
    <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-8 justify-center items-center min-h-[60vh]">
      {/* Card 1: Courses */}
      <button
        onClick={() =>
          setAuthState((prev) => ({ ...prev, role: "viewing_courses" }))
        } // Temporary switch to view courses
        className="w-full md:w-1/2 h-64 bg-main text-white rounded-lg  hover:scale-105 transition-all flex flex-col justify-center items-center gap-2 group"
      >
        <span className="text-6xl flex gap-1 items-center justify-center group-hover:-translate-y-2 transition-transform">
          <RxVideo />
        </span>
        <h2 className="text-2xl bold"> المساقات العلميّة</h2>
        <p className="regular opacity-90">تصفح المحتوى العلمي</p>
      </button>

      {/* Card 2: Student Tracking */}
      <Link
        href="/dashboard/students" // You will need to create this page later
        className="w-full md:w-1/2 h-64 bg-white border-2 border-main text-main rounded-lg hover:scale-105 transition-all flex flex-col justify-center items-center gap-2 group"
      >
        <span className="text-6xl flex gap-1 items-center justify-center group-hover:-translate-y-2 transition-transform">
          <BsPersonVideo3 />
        </span>
        <h2 className="text-2xl bold">متابعة الطّلاب</h2>
        <p className="regular opacity-70">
          تابع تقدّم الطلاب وحضورهم وعلاماتهم
        </p>
      </Link>
    </div>
  );

  // View B: Guest Overlay Wrapper
  // This wraps the course list and blocks clicks if the user is a guest
  const GuestWrapper = ({ children }) => {
    if (authState.isLoggedIn) return children;

    return (
      <div className="relative">
        {/* The Content (Blurred or Disabled) */}
        <div className="pointer-events-none opacity-60 grayscale-[50%] select-none">
          {children}
        </div>

        {/* The "Gate" Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/30 backdrop-blur-[2px]">
          <div className="bg-white p-8 rounded-lg text-center border border-gray-100 max-w-md mx-4">
            <h3 className="text-2xl semi text-main mb-2">
              محتوى حصري للمسجلين
            </h3>
            <p className="text-gray-600 mb-6 regular">
              يجب عليك تسجيل الدخول أو إنشاء حساب جديد للوصول إلى المساقات.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/login"
                className="bg-main text-white px-6 py-2 rounded-sm  hover:bg-main/90 transition"
              >
                تسجيل دخول
              </Link>
              <Link
                href="/signup"
                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-sm  hover:bg-gray-200 transition"
              >
                إنشاء حساب
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (authState.isLoading) return null; // Or a loading spinner

  return (
    <div
      dir="rtl"
      className="bg-white mx-auto overflow-x-hidden min-h-screen relative"
    >
      <div className="relative z-50">
        <Navbar />
      </div>

      <div className="mt-8">
        {authState.isLoggedIn && authState.role === "supervisor" ? (
          <TeacherView />
        ) : (
          /* SCENARIO 2 & 3: STUDENT OR GUEST VIEW */
          /* If guest, the wrapper blocks interaction. If student, wrapper does nothing. */
          <GuestWrapper>
            <CoursesList categories={LANDING_CATEGORIES} />
          </GuestWrapper>
        )}
      </div>

      {/* Back button logic for Teacher if they clicked "Courses" */}
      {authState.role === "viewing_courses" && (
        <button
          onClick={() =>
            setAuthState((prev) => ({ ...prev, role: "supervisor" }))
          }
          className="fixed bottom-8 right-8 bg-gray-800 text-white px-4 py-2 rounded-full z-50"
        >
          ↩ العودة للوحة المشرف
        </button>
      )}
    </div>
  );
}
