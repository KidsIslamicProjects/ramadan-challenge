"use client";
import React, { useState, useEffect } from "react";
import Soil from "../data/images/Soil.svg";
import Image from "next/image";
import Logo from "../components/Logo";
import Header from "../components/Header";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";
import Notification from "../components/Notification";

const Page = () => {
  const [firstName, setFirstName] = useState("");
  const [dole, setDole] = useState("");
  const [hijriDate, setHijriDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      fetch(`https://ramadan-server-topaz.vercel.app/api/users/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.name) {
            const nameParts = data.name.split(" ");
            setFirstName(nameParts[0]);
          }

          // Check if today's task is already done
          if (data?.dailyDoleProgress) {
            const todayTask = data.dailyDoleProgress.find(
              (task) => task.hijriDate === hijriDate && task.done === true
            );
            if (todayTask) {
              setTaskCompleted(true);
            }
          }
        })
        .catch((error) => console.error("Error fetching user:", error));
    }
  }, [hijriDate]); // Depend on hijriDate to update when fetched

  useEffect(() => {
    const today = new Date().getDate();

    fetch("https://ramadan-server-topaz.vercel.app/api/doles")
      .then((res) => res.json())
      .then((data) => {
        const todayDole = data.find((item) => item.gregorianDay === today);

        if (todayDole) {
          setDole(todayDole.dole);
          setHijriDate(todayDole.hijriDate);
        } else {
          setDole("لا يوجد فسيلة اليوم");
          setHijriDate("No dole found for today.");
        }
      })
      .catch((error) => console.error("Error fetching doles:", error));
  }, []);

  const handleSubmit = async () => {
    if (taskCompleted) {
      setNotification({
        message: "لقد أكملت هذه المهمة بالفعل!",
        type: "warning",
      });
      return;
    }

    setLoading(true);
    setNotification(null);

    try {
      const response = await fetch(
        "https://ramadan-server-topaz.vercel.app/api/tasks/dole",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: localStorage.getItem("userId"),
            hijriDate: hijriDate,
            dole: dole,
          }),
        }
      );

      if (response.ok) {
        confetti();
        setNotification({
          message: "تمت زراعة الفسيلة بنجاح!",
          type: "success",
        });

        setTaskCompleted(true); // Prevent resubmission
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        setNotification({ message: "فشل في زراعة الفسيلة", type: "error" });
      }
    } catch (error) {
      setNotification({ message: error.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <div dir="rtl" className="min-h-screen bg-white py-8 px-4">
        <Logo />
        <div className="flex flex-col gap-2 justify-center items-center">
          <p className="semi text-secondary">
            السلام عليكم ورحمة الله وبركاته، أهلاً بكم في
          </p>
          <h3 className="bold text-main text-xl">"بُســـتان {firstName}"</h3>
          <p className="regular text-main text-center mt-4">
            في هذا التحدّي، يتوجّب عليك الاعتناء اليومي ببُستانِك الأخلاقيّ
            وتزرع فيه فسائل الخير والعطاء. مع كلَ مُهمّة تُنجزها، ستُزرَع فسيلة
            في بستانك تلقائيّاً.
          </p>
        </div>
        <div className="my-10 bg-[#f7f6f6] rounded-sm p-3">
          <h1 className="bold text-[#457804] text-center text-2xl">
            فسيلةُ اليَوم
          </h1>
          <p className="text-main semi text-lg mt-2 text-center">{dole}</p>
        </div>
        {taskCompleted ? (
          <div>
            <p className="text-lg text-[#457804] semi text-center">
              لقد زرعتَ فسيلة اليوم يا بطل! نلقاكَ غداً بإذن الله
            </p>
          </div>
        ) : (
          <div className="flex justify-center items-center mt-20 gap-2">
            <input
              type="checkbox"
              className="custom-checkbox"
              disabled={taskCompleted}
            />
            <h3 className="text-main semi text-lg">
              لقد أتمَمت الـمُهمّة الحمدلله
            </h3>
          </div>
        )}

        <button
          onClick={handleSubmit}
          className={`${
            taskCompleted ? "bg-gray-400" : "bg-[#457804]"
          } flex justify-center items-center w-[75%] text-white py-2 mt-12 semi text-lg rounded-sm shadow mx-auto`}
        >
          {loading
            ? "جاري الزرع..."
            : taskCompleted
            ? "المهمة مُكتملة"
            : "ازرع الفَســــــــــيلة"}
        </button>
        <Image
          alt="soil"
          src={Soil}
          className="w-screen h-auto absolute bottom-0 left-0"
        />
      </div>
    </>
  );
};

export default Page;
