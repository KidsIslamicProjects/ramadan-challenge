"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import confetti from "canvas-confetti";
import Notification from "../../components/Notification";
import Ribbon from "../../data/images/Ribbon.svg";
import Header from "@/app/components/Header";
import Logo from "@/app/components/Logo";

const Checkbox = ({ label, onChange }) => (
  <label className="flex items-center gap-2 text-sm">
    <input type="checkbox" className="custom-checkbox" onChange={onChange} />
    {label}
  </label>
);

const checkboxes = [
  "صلاة الفجر",
  "صلاة الظهر",
  "صلاة العصر",
  "صلاة المغرب",
  "صلاة العشاء",
  "الورد القرآني",
  "صيامي",
  "زرع الفَسيلة",
  "الصلاة على النّبي",
];

const DailyTaskPage = () => {
  const { gregorianDay } = useParams();
  const router = useRouter();
  const [taskData, setTaskData] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [hadithChecked, setHadithChecked] = useState(false);
  const [tafseerChecked, setTafseerChecked] = useState(false);
  const [feelings, setFeelings] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckboxChange = (label) => {
    setSelectedTasks((prev) =>
      prev.includes(label) ? prev.filter((t) => t !== label) : [...prev, label]
    );
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId");
    setIsLoading(true);
    const payload = {
      userId,
      hijriDate: taskData.hijriDate,
      tasks: selectedTasks,
      tafseerAnswer: tafseerChecked ? "Completed" : "Not completed",
      hadithCompleted: hadithChecked,
      feelings,
    };
    try {
      await axios.post(
        "https://ramadan-server-topaz.vercel.app/api/tasks/submit",
        payload
      );
      setIsLoading(false);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      setNotification({ message: "تم إرسال الإجابات بنجاح!", type: "success" });

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      setIsLoading(false);

      setNotification({
        message: error.response?.data?.error || "حدث خطأ أثناء الإرسال.",
        type: "error",
      });
    }
  };

  useEffect(() => {
    axios
      .get("https://ramadan-server-topaz.vercel.app/api/tasks")
      .then((response) => {
        const task = response.data.find(
          (task) => task.gregorianDay === Number(gregorianDay)
        );
        setTaskData(task || null);
      });
  }, [gregorianDay]);

  if (!taskData) {
    return (
      <div className="text-center bold text-lg text-main py-10">
        لا يوجد مهام لهذا اليوم
      </div>
    );
  }

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
          يوميّات قائِد المُستقبَل
        </h1>
        <p className="text-sm text-secondary regular text-center mb-4 w-[100%]">
          لا توجد خطوة عملاقة تصل بك إلى ما تريد، إنما يحتاج الأمر إلى الكثير من
          الخطوات الصغيرة لتبلغ ما تريد
        </p>

        <div className="relative flex justify-center items-center w-full mb-2 mt-2">
          <Image src={Ribbon} alt="Ribbon" className="w-[40%] max-w-lg" />
          <span className="absolute text-white semi">{taskData.hijriDate}</span>
        </div>

        <div className="bg-[#f7f6f6] w-full p-4 my-4">
          <div className="grid grid-cols-3 gap-4 w-full text-xl semi">
            {checkboxes.map((label, index) => (
              <Checkbox
                key={index}
                label={label}
                onChange={() => handleCheckboxChange(label)}
              />
            ))}
          </div>
        </div>

        <div className="">
          <h1 className="bold text-2xl text-main mb-2">الورد الحديثي</h1>
          <div className="bg-[#f7f6f6] w-full p-4">
            <p className="semi text-main text-lg text-right">
              {taskData.hadith}
            </p>
          </div>

          <div className="flex justify-between items-end w-full mt-2 mb-4">
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="custom-checkbox w-2 h-2"
                checked={hadithChecked}
                onChange={() => setHadithChecked(!hadithChecked)}
              />
              <label className="text-secondary semi">
                تمّ حفظ وفهم الحديث بفضل الله
              </label>
            </div>
          </div>
        </div>
        <div>
          <h1 className="bold text-2xl text-main my-2">ورد التفسير</h1>

          <div className="bg-[#f7f6f6] w-full p-4 mt-2">
            <p className="semi text-main text-lg text-right">
              {taskData.tafseerQuestion}
            </p>
            <p className="regular text-main text-right mt-2">
              {taskData.tafseerAnswer}
            </p>
          </div>

          <div className="flex justify-between items-end w-full mt-2 mb-4">
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="custom-checkbox w-2 h-2"
                checked={tafseerChecked}
                onChange={() => setTafseerChecked(!tafseerChecked)}
              />
              <label className="text-secondary semi">
                تمّ حفظ وفهم التفسير بفضل الله
              </label>
            </div>
          </div>
        </div>
        <div className="w-full">
          <h1 className="bold text-2xl text-main my-2"> مشاعر اليوم</h1>
          <div className="bg-[#f7f6f6] ">
            <textarea
              onChange={(e) => setFeelings(e.target.value)}
              value={feelings}
              className="w-full p-3 semi text-main rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
              rows="5"
              placeholder="ما الذي أسعدك، أحزنك، أو أزعجك اليوم؟"
            ></textarea>
          </div>{" "}
        </div>

        <button
          onClick={handleSubmit}
          className="bg-main text-white py-2 w-[80%] rounded-xs semi text-lg mt-4"
        >
          {isLoading
            ? "جاري إرســــال الأجوبـــة..."
            : " إرســــــــال الأجــوبــــــــــــــة"}
        </button>
      </div>
    </>
  );
};

export default DailyTaskPage;
