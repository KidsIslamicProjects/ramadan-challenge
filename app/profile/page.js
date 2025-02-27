"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "../components/Header";
import Logo from "../components/Logo";
import Notification from "../components/Notification";
import Loading from "../loading";
const Profile = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const router = useRouter();
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      router.push("/login");
      return;
    }

    const fetchUserData = async () => {
      setIsDataLoading(true);
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
        setIsDataLoading(false);
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  if (isDataLoading) {
    return <Loading />;
  }
  const handleLogout = () => {
    setIsLoading(true);
    setNotification(null);
    setTimeout(() => {
      setNotification({
        message: "تمّ تسجيل الخروج! لا تطيل الغياب علينا",
        type: "error",
      });
      localStorage.removeItem("userId");

      router.push("/login");
      setIsLoading(false);
    }, 2000);
  };

  return (
    <>
      <Header />
      <div className="bg-white min-h-screen flex flex-col text-center">
        <div
          dir="rtl"
          className=" flex flex-col items-center min-h-screen py-8"
        >
          <Logo />{" "}
          <h2 className="text-xl bold text-main mb-4 mt-2">الـملف الشخصي</h2>
          <p className="text-secondary regular px-2 text-sm mt-1">
            ملفّك الشخصيّ هو صحيفتُك، بقدرِ ما تهتم بمهامك اليوميّة يرتفع
            مجموعك، وتحصل على تقييم أفضل من المُشرفين!
          </p>
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
                مجموعك الكلّي:{" "}
                <span className="bold">{user.totalScore} نقطة</span>
              </p>
              <p className="text-secondary regular mt-2 flex flex-col">
                تقييم المُشرِف: <span className="bold">{user.evaluation}</span>
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
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
          />
        )}
      </div>
    </>
  );
};

export default Profile;
