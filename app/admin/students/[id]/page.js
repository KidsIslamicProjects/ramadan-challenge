"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Loading from "@/app/loading";
import Notification from "@/app/components/Notification";

const StudentDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDole, setShowDole] = useState(true);
  const [showTasks, setShowTasks] = useState(false);
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [evaluation, setEvaluation] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `https://ramadan-server-topaz.vercel.app/api/users/${id}`
        );

        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        setUser(data);
        setEvaluation(data.evaluation || ""); // Load existing evaluation
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUser();
  }, [id]);
  const handleRowClick = (task) => {
    setSelectedTask(task);
    setIsModalVisible(true);
  };
  const handleEvaluationSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://ramadan-server-topaz.vercel.app/api/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ evaluation }),
        }
      );

      if (!response.ok) throw new Error("Failed to update evaluation");

      setSuccessMessage("تم تحديث التقييم بنجاح!");
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  if (loading) return <Loading />;

  if (!user)
    return (
      <p className="text-center text-3xl text-secondary bold max-h-screen absolute bottom-[50%] left-[25%]">
        لم يتم العثور على المستخدم
      </p>
    );

  return (
    <div dir="rtl" className="p-6 bg-white min-h-screen">
      <h2 className="text-lg text-center bold text-main mb-4">
        ملف <span className="bold">"{user.name}"</span>{" "}
      </h2>

      {/* Toggle Buttons */}
      <div className="flex justify-center gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded semi ${
            showDole ? "bg-main text-white" : "bg-gray-300 text-black"
          }`}
          onClick={() => {
            setShowDole(true);
            setShowTasks(false);
            setShowEvaluation(false);
          }}
        >
          جدول إنجاز الفسائل
        </button>

        <button
          className={`px-4 py-2 rounded semi ${
            showTasks ? "bg-main text-white" : "bg-gray-300 text-black"
          }`}
          onClick={() => {
            setShowDole(false);
            setShowTasks(true);
            setShowEvaluation(false);
          }}
        >
          جدول المهام اليومية
        </button>

        <button
          className={`px-4 py-2 rounded semi ${
            showEvaluation ? "bg-main text-white" : "bg-gray-300 text-black"
          }`}
          onClick={() => {
            setShowDole(false);
            setShowTasks(false);
            setShowEvaluation(true);
          }}
        >
          تقييم الطالب
        </button>
      </div>

      {/* Dole Progress Section */}
      {showDole && (
        <div className="mt-4 p-4 border rounded-xs shadow-xs">
          <h3 className="text-lg text-secondary bold mb-2">
            جدول إنجاز الفسائل
          </h3>
          {user.dailyDoleProgress.length > 0 ? (
            <ul className="list-disc pr-4">
              {user.dailyDoleProgress.map((progress, index) => (
                <li key={index} className="flex justify-between p-2 border-b">
                  <span className="semi text-main text-lg">
                    {progress.hijriDate}
                  </span>
                  <span
                    className={`px-3 py-1 semi rounded ${
                      progress.done
                        ? "bg-main text-white"
                        : "bg-red-700 text-white"
                    }`}
                  >
                    {progress.done ? "تم" : "لم يكتمل"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 semi">لا يوجد تقدم مسجل</p>
          )}
        </div>
      )}

      {/* Tasks Progress Section */}
      {showTasks && (
        <div className="mt-4 p-4 border rounded-xs shadow-xs">
          <h3 className="text-lg text-secondary bold mb-2">
            جدول المهام اليومية
          </h3>
          {user.dailyTasksProgress.length > 0 ? (
            <ul className="list-disc pr-4">
              {user.dailyTasksProgress.map((task, index) => (
                <li
                  onClick={() => handleRowClick(task)}
                  key={index}
                  className="flex justify-between p-2 border-b"
                >
                  <span className="bold text-main text-lg">
                    {task.hijriDate}
                  </span>
                  <span className="semi bg-main text-white px-3 py-1 rounded">
                    {task.score} نقاط
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 semi">لا يوجد مهام مسجلة</p>
          )}
        </div>
      )}

      {/* Student Evaluation Section */}
      {showEvaluation && (
        <div className="mt-4 p-4 border rounded-xs shadow-xs">
          <h3 className="text-lg text-secondary bold mb-2">تقييم الطالب</h3>
          <textarea
            className="w-full p-3 border rounded-md text-lg"
            placeholder="أدخل التقييم هنا..."
            value={evaluation}
            onChange={(e) => setEvaluation(e.target.value)}
          />
          <button
            className="mt-3 bg-main text-white px-4 py-2 semi rounded-xs"
            onClick={handleEvaluationSubmit}
          >
            {isLoading ? "جاري حفظ التقييم..." : "حفظ التعديل"}
          </button>
        </div>
      )}

      {/* Success Notification */}
      {successMessage && (
        <Notification message={successMessage} type="success" />
      )}
      {isModalVisible && selectedTask && (
        <div
          dir="rtl"
          className="modal-overlay fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
        >
          <div className="modal-content w-full mx-5 bg-white p-6 rounded shadow-lg">
            <h3 className="text-xl text-secondary text-center mb-4 bold">
              تفاصيل اليوم: {selectedTask.hijriDate}
            </h3>
            <p className="bold text-main">
              <strong className="regular text-secondary">النتيجة:</strong>{" "}
              {selectedTask.score}
            </p>
            <p className="bold text-main">
              <strong className="regular text-secondary">ورد التفسير:</strong>{" "}
              {selectedTask.tafseerAnswer}
            </p>
            <p className="bold text-main">
              <strong className="regular text-secondary">ورد الحديث:</strong>{" "}
              {selectedTask.hadith ? "Yes" : "No"}
            </p>
            <p className="bold text-main">
              <strong className="regular text-secondary">
                ما لا يسعني تركه:
              </strong>
            </p>
            <ul className="list-disc pl-4 regular">
              {selectedTask.tasks &&
                selectedTask.tasks.map((task, index) => (
                  <li key={index}>{task}</li>
                ))}
            </ul>
            <button
              className="mt-4 semi bg-main w-full mx-3 text-white px-4 py-2 rounded"
              onClick={() => setIsModalVisible(false)} // Close the modal
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDetails;
