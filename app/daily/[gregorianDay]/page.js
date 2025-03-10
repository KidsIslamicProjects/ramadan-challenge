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
import Loading from "@/app/loading";

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
  const [isAdmin, setIsAdmin] = useState(false);
  const [userProgress, setUserProgress] = useState([]);
  const [score, setScore] = useState("0");
  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId");
    setIsLoading(true);
    const payload = {
      userId,
      hijriDate: taskData.hijriDate,
      tasks: selectedTasks,
      tafseerAnswer: tafseerChecked ? "Completed" : "Not completed",
      hadith: hadithChecked,
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
      console.log(error);
    }
  };
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId === "67bdb95c6cc8e6f2e2415e76") {
      setIsAdmin(true);
    }

    axios
      .get(`https://ramadan-server-topaz.vercel.app/api/users/${userId}`)
      .then((response) => {
        const userProgressData = response.data.dailyTasksProgress;
        setUserProgress(userProgressData);

        // Find the score for the current hijriDate
        const taskProgress = userProgressData.find(
          (progress) => progress.hijriDate === taskData?.hijriDate
        );

        if (taskProgress) {
          setScore(taskProgress.score);
        } else {
          setScore(0); // Default score if no matching hijriDate found
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [taskData?.hijriDate]);

  const handleCheckboxChange = (task) => {
    setSelectedTasks((prevSelectedTasks) => {
      if (prevSelectedTasks.includes(task)) {
        return prevSelectedTasks.filter((t) => t !== task);
      } else {
        return [...prevSelectedTasks, task];
      }
    });
  };

  console.log("Selected Tasks:", selectedTasks);

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

  const handleEdit = () => {
    if (isAdmin) {
      router.push(`/edit-task/${gregorianDay}`);
    }
  };

  const getTaskStatus = () => {
    const completedTask = userProgress.find(
      (progress) => progress.hijriDate === taskData?.hijriDate
    );

    if (completedTask) {
      return "completed";
    }

    return "available";
  };

  if (!taskData) {
    return <Loading />;
  }

  const taskStatus = getTaskStatus();

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
        <p className="text-secondary regular text-center mb-4 w-[100%]">
          صاحِبُ الهِمّــة لا يرتاح حتّــى يٌتمّ المُهمّة.
        </p>
        {taskStatus === "completed" ? (
          <p className="semi text-red-600 text-lg my-4">
            لقد أتمَمتَ مهمّات هذا اليوم مُسبقاً، نراك في يوم آخر يا بطل!{" "}
            <span className="text-green-600 ">علامتك هي: {score} من 15</span>
          </p>
        ) : (
          ""
        )}
        <div className="relative flex justify-center items-center w-full mb-2 mt-2">
          <Image src={Ribbon} alt="Ribbon" className="w-[40%] max-w-lg" />
          <span className="absolute text-white semi">{taskData.hijriDate}</span>
        </div>

        <div className="mt-3">
          <h1 className="bold text-2xl text-main mb-2">ما لا يسعني تركه </h1>
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
        </div>
        <div className="flex flex-col">
          <div className="">
            <h1 className="bold text-2xl text-main mb-2">الورد الحديثي</h1>
            <div className="bg-[#f7f6f6] w-full p-4">
              <p className="semi text-main text-lg text-right">
                {taskData.hadith}
              </p>
            </div>
            {taskStatus === "completed" ? (
              ""
            ) : (
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
            )}

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
              {taskStatus === "completed" ? (
                ""
              ) : (
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
              )}
            </div>
          </div>

          {taskStatus === "completed" ? (
            ""
          ) : (
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
          )}

          <div className="flex flex-col justify-center items-center gap-2 w-full mt-4">
            <button
              onClick={handleSubmit}
              className={`py-2 w-[80%] mt-4 text-lg semi bg-main text-white rounded-xs ${
                taskStatus === "completed" && "cursor-not-allowed opacity-50"
              }`}
              disabled={taskStatus === "completed"}
            >
              {isLoading
                ? "جاري إرسال التحدي"
                : taskStatus === "completed"
                ? "لا يمكنك إتمام المهمّة مرّتين"
                : "إرسال الإجابات"}
            </button>
            {isAdmin && (
              <button
                onClick={handleEdit}
                className="bg-secondary text-white py-2 w-[80%] rounded-xs semi text-lg mt-4"
              >
                تعديــــــل المُســـــابقة{" "}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DailyTaskPage;
