"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Notification from "../../components/Notification";
import Header from "@/app/components/Header";
import Logo from "@/app/components/Logo";

const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2 text-sm">
    <input
      type="checkbox"
      className="custom-checkbox"
      checked={checked}
      onChange={onChange}
    />
    {label}
  </label>
);

const EditTaskPage = () => {
  const { gregorianDay } = useParams();
  const router = useRouter();
  const [taskData, setTaskData] = useState(null);
  const [hijriDate, setSelectedHijriDate] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [hadithChecked, setHadithChecked] = useState(false);
  const [tafseerChecked, setTafseerChecked] = useState(false);
  const [feelings, setFeelings] = useState("");
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
        setSelectedTasks(task.tasks || []);
        setHadithChecked(task.hadithCompleted || false);
        setTafseerChecked(task.tafseerAnswer === "Completed");
        setFeelings(task.feelings || "");
        setHadith(task.hadith || "");
        setTafseerQuestion(task.tafseerQuestion || "");
        setTafseerAnswer(task.tafseerAnswer || "");
        setSelectedHijriDate(task._id);
      })
      .catch((error) => {
        setNotification({ message: "Failed to load task data", type: "error" });
      });
  }, [gregorianDay]);

  const handleCheckboxChange = (label) => {
    setSelectedTasks((prev) =>
      prev.includes(label) ? prev.filter((t) => t !== label) : [...prev, label]
    );
  };

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
      await axios.put(`http://localhost:3001/api/task/${hijriDate}`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      setIsLoading(false);
      setNotification({ message: "تمت التعديلات بنجاح", type: "success" });
      router.push("/daily");
    } catch (error) {
      setIsLoading(false);
      setNotification({ message: "فشل في إرسال التعديلات", type: "error" });
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

        <div className="bg-[#f7f6f6] w-full p-4 my-4">
          <div className="grid grid-cols-3 gap-4 w-full text-xl semi">
            {taskData.checkboxes &&
              Array.isArray(taskData.checkboxes) &&
              taskData.checkboxes.map((label, index) => (
                <Checkbox
                  key={index}
                  label={label}
                  checked={selectedTasks.includes(label)}
                  onChange={() => handleCheckboxChange(label)}
                />
              ))}
          </div>
        </div>

        <div className="flex flex-col">
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
