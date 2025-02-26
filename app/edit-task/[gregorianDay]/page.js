"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Notification from "../../components/Notification";
import Header from "@/app/components/Header";
import Logo from "@/app/components/Logo";

const EditTaskPage = () => {
  const { gregorianDay } = useParams();
  const router = useRouter();
  const [taskData, setTaskData] = useState(null);
  const [hijriDate, setHijriDate] = useState("");
  const [hadith, setHadith] = useState("");
  const [tafseerQuestion, setTafseerQuestion] = useState("");
  const [tafseerAnswer, setTafseerAnswer] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get("https://ramadan-server-topaz.vercel.app/api/tasks")
      .then((response) => {
        const task = response.data.find(
          (task) => task.gregorianDay === Number(gregorianDay)
        );
        console.log(task);
        setTaskData(task);
        setHijriDate(task.hijriDate || "");
        setHadith(task.hadith || "");
        setTafseerQuestion(task.tafseerQuestion || "");
        setTafseerAnswer(task.tafseerAnswer || "");
        setSelectedHijriDate(task._id);
      })
      .catch((error) => {
        setNotification({ message: "Failed to load task data", type: "error" });
      });
  }, [gregorianDay]);

  const handleSubmit = async () => {
    setIsLoading(true);
    const payload = {
      hijriDate: hijriDate,
      gregorianDay: gregorianDay,
      hadith: hadith,
      tafseerQuestion: tafseerQuestion,
      tafseerAnswer: tafseerAnswer,
    };

    try {
      // Use taskData._id as the URL parameter instead of hijriDate
      await axios.put(
        `https://ramadan-server-topaz.vercel.app/api/task/${taskData._id}`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setIsLoading(false);
      setNotification({ message: "تمت التعديلات بنجاح", type: "success" });
      router.push("/daily");
    } catch (error) {
      setIsLoading(false);
      setNotification({ message: "فشل في إرسال التعديلات", type: "error" });
      console.log(error);
    }
  };

  return (
    <>
      <Notification message={notification.message} type={notification.type} />
      <Header />

      <div
        dir="rtl"
        className="bg-white relative flex flex-col items-center w-full py-8 px-6"
      >
        <Logo />
        <h1 className="text-xl bold text-main mb-2">
          تعديل المهام ليوم {gregorianDay}
        </h1>

        <div className="flex flex-col">
          <div>
            <h1 className="bold text-2xl text-main mb-2">
              تعديل التاريخ الهجري
            </h1>
            <div className="bg-[#f7f6f6] w-full p-4">
              <textarea
                value={hijriDate}
                onChange={(e) => setHijriDate(e.target.value)}
                className="w-full p-3 semi text-main rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
                rows="5"
              />
            </div>
          </div>
          <div>
            <h1 className="bold text-2xl text-main mb-2">
              تعديل الورد الحديثي
            </h1>
            <div className="bg-[#f7f6f6] w-full p-4">
              <textarea
                value={hadith}
                onChange={(e) => setHadith(e.target.value)}
                className="w-full p-3 semi text-main rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
                rows="5"
              />
            </div>
          </div>

          <div>
            <h1 className="bold text-2xl text-main my-2">تعديل ورد التفسير</h1>
            <div className="bg-[#f7f6f6] w-full p-4 mt-2">
              <textarea
                value={tafseerQuestion}
                onChange={(e) => setTafseerQuestion(e.target.value)}
                className="w-full p-3 semi text-main rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
                rows="5"
                placeholder="السؤال"
              />
              <textarea
                value={tafseerAnswer}
                onChange={(e) => setTafseerAnswer(e.target.value)}
                className="w-full p-3 semi text-main rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
                rows="5"
                placeholder="الإجابة"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-main text-white py-2 w-[80%] rounded-xs semi text-lg mt-4"
        >
          {isLoading ? "جاري إرســــال التعديلات..." : "تعديل المهام"}
        </button>
      </div>
    </>
  );
};

export default EditTaskPage;
