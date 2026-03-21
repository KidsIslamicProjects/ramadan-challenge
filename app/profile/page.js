"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Notification from "../components/Notification";
import Loading from "../loading";
import InstallPrompt from "../components/InstallPrompt";

import {
  FaMapMarkerAlt,
  FaClipboardCheck,
  FaArrowLeft,
  FaSignOutAlt,
  FaWhatsapp,
  FaSpinner,
} from "react-icons/fa";

// Constants
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://ramadan-server-topaz.vercel.app";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // 1. Get User from LocalStorage (UI Proxy)
    const storedUserString = localStorage.getItem("user");

    if (!storedUserString) {
      router.push("/login");
      return;
    }

    const storedUser = JSON.parse(storedUserString);
    const userId = storedUser._id || storedUser.id; // Handle both cases

    const fetchUserData = async () => {
      setIsDataLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/users/${userId}`, {
          // CRITICAL: Send the cookie to the backend
          credentials: "include",
        });

        if (!response.ok) {
          if (response.status === 401) {
            // Cookie expired or invalid
            localStorage.removeItem("user");
            router.push("/login");
            return;
          }
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();

        const totalScore =
          data.dailyProgress?.reduce((sum, day) => sum + (day.score || 0), 0) ||
          0;

        setUser({ ...data, totalScore });
      } catch (error) {
        console.error(error);
        setNotification({
          message: "حدث خطأ أثناء تحميل البيانات",
          type: "error",
        });
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = async () => {
    setIsLoading(true);
    setNotification(null);

    try {
      // 1. Call Backend to clear cookie
      await fetch(`${API_URL}/api/users/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout API failed", error);
    }

    // 2. Clear Client Storage
    localStorage.removeItem("user");
    localStorage.removeItem("userId"); // Cleanup legacy

    // 3. UI Feedback
    setNotification({
      message: "تمّ تسجيل الخروج! لا تطيل الغياب علينا",
      type: "success", // Green for success
    });

    setTimeout(() => {
      router.push("/login");
      setIsLoading(false);
    }, 1500);
  };

  const getAvatarPath = (avatarName) => {
    if (!avatarName) return "/Images/avatar-boy-1.png";
    return `/Images/${avatarName}`;
  };

  if (isDataLoading) {
    return <Loading />;
  }

  if (!user) return null;

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gray-50 mb-4 flex flex-col items-center py-6 px-4 font-sans text-gray-800"
    >
      <h2 className="text-2xl font-bold text-main mb-8 mt-4">الملف الشخصي</h2>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden relative border border-gray-100">
        <div className="h-32 bg-gradient-to-r from-main/90 to-main/70 w-full relative">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
        </div>

        <div className="relative -mt-16 flex justify-center">
          <div className="w-32 h-32 rounded-full border-4 border-white shadow-md bg-gray-100 overflow-hidden relative">
            <Image
              src={getAvatarPath(user.avatar)}
              alt="User Avatar"
              fill
              className="object-cover mt-4"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
        </div>

        <div className="text-center pt-4 pb-8 px-6">
          <h3 className="text-2xl font-bold text-secondary mb-1">
            {user.name}
          </h3>

          <div className="flex items-center justify-center gap-2 regular text-gray-500 text-sm mt-1 mb-6">
            <FaMapMarkerAlt className="text-gray-400 " />
            <span>{user.country || "غير محدد"}</span>
            <span className="mx-1 text-gray-300">•</span>
            <span>{user.age || "--"} سنة</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex flex-col items-center justify-center shadow-sm">
              <span className="text-gray-400 text-xs mb-1 font-medium">
                مجموع النقاط
              </span>
              <span className="text-2xl font-extrabold text-main">
                {user.totalScore}
              </span>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex flex-col items-center justify-center shadow-sm">
              <span className="text-gray-400 text-xs mb-1 font-medium">
                الرقم التعريفي
              </span>
              <span className="text-sm font-semibold text-gray-600 truncate px-2 dir-ltr">
                #{user._id?.slice(-6) || "---"}
              </span>
            </div>
          </div>

          <div className="bg-amber-50 border-r-4 border-amber-400 p-4 rounded-lg text-right mb-8">
            <h4 className="text-sm font-bold text-amber-800 mb-1 flex items-center gap-2">
              <FaClipboardCheck className="text-amber-600 text-lg" />
              تقييم المُشرف:
            </h4>
            <p className="text-thirdly text-sm regular leading-relaxed pr-6">
              {user.evaluation ||
                "لم يتم إضافة تقييم بعد.. استمر في العمل الجاد!"}
            </p>
          </div>

          <InstallPrompt />

          <div className="space-y-3">
            <button
              onClick={() => router.push("/")}
              className="w-full bg-main hover:bg-main/90 transition-all active:scale-[0.98] text-white font-medium py-2 rounded-xl shadow-lg shadow-main/20 flex items-center justify-center gap-2"
            >
              <span>الانتقال إلى التحديات</span>
              <FaArrowLeft className="text-sm" />
            </button>

            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="w-full bg-red-50 hover:bg-red-100 active:bg-red-200 transition-colors text-red-600 font-medium py-2 rounded-xl flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>جاري الخـــــــــــروج...</span>
                </>
              ) : (
                <>
                  <span>تسجيل الخـــــــــــروج</span>
                  <FaSignOutAlt />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <Link
        href="https://wa.me/96171708103"
        className="mt-8 mb-24 flex items-center gap-2 text-green-600 bg-green-50 px-5 py-2.5 rounded-full hover:bg-green-100 transition-colors shadow-sm"
      >
        <FaWhatsapp className="text-xl" />
        <span className="text-sm font-bold">تواصل مع المُشرف</span>
      </Link>

      {notification && (
        <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
          <Notification
            message={notification.message}
            type={notification.type}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
