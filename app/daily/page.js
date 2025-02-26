"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { IoLockClosed, IoLockOpen } from "react-icons/io5";
import Loading from "../loading";
import Logo from "../components/Logo";
import Header from "../components/Header";

const DailyPage = () => {
  const [tasks, setTasks] = useState([]);
  const [userProgress, setUserProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const router = useRouter();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      router.push("/login");
    } else {
      setUserId(storedUserId);
      if (storedUserId === "67bdb95c6cc8e6f2e2415e76") {
        setIsAdmin(true);
      }
    }
  }, [router]);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      axios
        .get("https://ramadan-server-topaz.vercel.app/api/tasks")
        .then((response) => {
          const sortedTasks = response.data.sort(
            (a, b) => a.gregorianDay - b.gregorianDay
          );
          setTasks(sortedTasks);
          setLoading(false);
        });

      axios
        .get(`https://ramadan-server-topaz.vercel.app/api/users/${userId}`)
        .then((response) => {
          setUserProgress(response.data.dailyTasksProgress);
        });
    }
  }, [userId]);

  if (userId === null) return null;

  const today = new Date().getDate();

  const getTaskStatus = (task) => {
    if (isAdmin) {
      // Admin can access all levels
      const completedTask = userProgress.find(
        (progress) => progress.hijriDate === task.hijriDate
      );
      return completedTask
        ? { status: "completed", score: completedTask.score }
        : { status: "available" };
    }

    const completedTask = userProgress.find(
      (progress) => progress.hijriDate === task.hijriDate
    );

    if (completedTask) {
      return {
        status: "completed",
        score: completedTask.score,
      };
    }

    if (task.gregorianDay === today) {
      return { status: "available" };
    }

    return { status: "locked" };
  };

  if (loading) {
    return <Loading />;
  }

  const arabicNumbers = [
    "الأول",
    "الثاني",
    "الثالث",
    "الرابع",
    "الخامس",
    "السادس",
    "السابع",
    "الثامن",
    "التاسع",
    "العاشر",
    "الحادي عشر",
    "الثاني عشر",
    "الثالث عشر",
    "الرابع عشر",
    "الخامس عشر",
    "السادس عشر",
    "السابع عشر",
    "الثامن عشر",
    "التاسع عشر",
    "العشرين",
    "الحادي والعشرين",
    "الثاني والعشرين",
    "الثالث والعشرين",
    "الرابع والعشرين",
    "الخامس والعشرين",
    "السادس والعشرين",
    "السابع والعشرين",
    "الثامن والعشرين",
    "التاسع والعشرين",
    "الثلاثين",
  ];

  const getArabicOrdinal = (index) =>
    arabicNumbers[index] || `اليوم ${index + 1}`;

  return (
    <>
      <Header />
      <div
        className="flex bg-white min-h-screen flex-col items-center w-full py-8"
        dir="rtl"
      >
        <Logo />
        <h1 className="text-xl bold text-main mb-2">
          يوميّات قائِد المُستقبَل
        </h1>
        <p className="text-sm text-secondary regular text-center mb-4 w-[90%]">
          لا توجد خطوة عملاقة تصل بك إلى ما تريد، إنما يحتاج الأمر إلى الكثير من
          الخطوات الصغيرة لتبلغ ما تريد
        </p>
        <div className="w-[90%] p-4">
          {tasks.length > 0 ? (
            tasks.map((task, index) => {
              const { status, score } = getTaskStatus(task);

              return (
                <button
                  key={task.gregorianDay}
                  onClick={() =>
                    status !== "locked" &&
                    router.push(`/daily/${task.gregorianDay}`)
                  }
                  className={`w-full py-2 px-4 semi rounded-xs mb-2 flex items-center justify-between ${
                    status === "locked"
                      ? "bg-gray-400 text-main cursor-not-allowed"
                      : status === "completed"
                      ? "bg-green-700 text-white"
                      : "bg-main text-white"
                  }`}
                  disabled={status === "locked"}
                >
                  <span>
                    تحدّي اليَوم {getArabicOrdinal(index)}
                    {status === "completed" && ` -  علامتك هي ${score}`}
                    {status === "locked" && " -  غير مُتاح الآن"}
                  </span>
                  {status === "locked" ? <IoLockClosed /> : <IoLockOpen />}
                </button>
              );
            })
          ) : (
            <p className="text-center text-gray-500">لا توجد تحديات متاحة</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DailyPage;
