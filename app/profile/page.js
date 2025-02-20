"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Lattern from "../data/images/latterns.png";
import Logo from "../data/images/LogoWithNoSlugn.svg";
import Image from "next/image";
import Link from "next/link";
const Profile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      router.push("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://ramadan-server-topaz.vercel.app/api/users/${userId}`
        );

        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();

        const totalScore =
          data.dailyProgress?.reduce((sum, day) => sum + (day.score || 0), 0) ||
          0;

        setUser({ ...data, totalScore });
      } catch (error) {
        console.error(error);
      } finally {
      }
    };

    fetchUserData();
  }, [router]);

  const getEvaluation = (score) => {
    if (score >= 100) return "ممتاز جداً!";
    if (score >= 50) return "جيد جداً!";
    if (score >= 20) return "جيد!";
    return "بحاجة إلى تحسين!";
  };

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.removeItem("userId");
      router.push("/login");
      setIsLoading(false);
    }, 2000);
  };

  if (!user) {
    return (
      <div className="text-center mt-10 text-lg text-red-500">
        حدث خطأ أثناء جلب البيانات
      </div>
    );
  }

  return (
    <>
      <div className="absolute top-0 left-0 z-10">
        <Image src={Lattern} width={55} height={77} alt="lattern" />
      </div>
      <div className="absolute top-0 right-0 z-10">
        <Image src={Lattern} width={55} height={77} alt="lattern" />
      </div>
      <div className="bg-white min-h-screen flex flex-col text-center">
        <div
          dir="rtl"
          className=" flex flex-col items-center min-h-screen py-4"
        >
          <Image src={Logo} alt="Logo" width={40} height={40} />
          <h2 className="text-xl bold text-main mb-4 mt-2">الـملف الشخصي</h2>
          <div className="flex flex-col justify-center mt-24">
            {" "}
            <div className="w-80 text-center flex flex-col gap-2">
              <p className="bg-[#f7f6f6] p-2 text-lg regular text-main">
                الاسم: <span className="bold">{user.name}</span>
              </p>
              <p className="bg-[#f7f6f6] p-2 text-lg regular text-main">
                العمر: <span className="bold">{user.age}</span>
              </p>

              <p className="bg-[#f7f6f6] p-2 text-lg regular text-main">
                المجموع الكلّي:{" "}
                <span className="bold">{user.totalScore} نقطة</span>
              </p>
              <p className="text-secondary regular mt-2 flex flex-col">
                تقييم المُشرِف:{" "}
                <span className="bold">{getEvaluation(user.totalScore)}</span>
              </p>
            </div>
            {/* Navigation & Logout */}
            <div className="mt-6 flex flex-col justify-center items-center gap-3">
              <button
                onClick={() => router.push("/")}
                className="bg-main semi text-white py-2 w-[75%] rounded-xs"
              >
                الانتقال إلى التحدّيــــــات
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-700 semi text-white py-2 w-[75%] rounded-xs"
              >
                {isLoading ? "جاري تسجيل الخــــروج ..." : "تســــجيل خــــروج"}
              </button>
            </div>
          </div>
          <Link href="https://wa.me/96171708103">
            <button
              dir="rtl"
              className="semi underline text-green-700 text-lg mt-14"
            >
              التواصل مع المُشرف على تطبيق الـ Whatsapp
            </button>{" "}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Profile;
