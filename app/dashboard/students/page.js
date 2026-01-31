"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import {
  FaUserPlus,
  FaTrash,
  FaUserGraduate,
  FaSearch,
  FaEye,
  FaTimes,
} from "react-icons/fa";
import Image from "next/image";

export default function TeacherDashboard() {
  const [studentIdInput, setStudentIdInput] = useState("");
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [selectedStudent, setSelectedStudent] = useState(null); // For Modal

  const API_URL = process.env.NODE_API || "http://localhost:3001/api";

  useEffect(() => {
    const savedStudents = JSON.parse(
      localStorage.getItem("myStudents") || "[]",
    );
    setStudents(savedStudents);
  }, []);

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (studentIdInput.length !== 6) {
      setMessage({
        text: "يرجى إدخال آخر 6 خانات من الرقم التعريفي",
        type: "error",
      });
      return;
    }

    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await fetch(`${API_URL}/find-student/${studentIdInput}`);
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "تعذر العثور على الطالب");

      if (students.find((s) => s.id === data.shortId)) {
        throw new Error("هذا الطالب مضاف بالفعل في قائمتك");
      }

      const newStudent = {
        id: data.shortId,
        fullId: data.fullId,
        name: data.name,
        avatar: data.avatar,
        gender: data.gender,
        joinDate: new Date().toLocaleDateString("ar-EG"),
        progress: "0%",
      };

      const updatedList = [...students, newStudent];
      setStudents(updatedList);
      localStorage.setItem("myStudents", JSON.stringify(updatedList));
      setStudentIdInput("");
      setMessage({ text: `تمت إضافة ${data.name} بنجاح`, type: "success" });
    } catch (error) {
      setMessage({ text: error.message, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const removeStudent = (id) => {
    if (confirm("هل أنت متأكد من حذف هذا الطالب من قائمتك؟")) {
      const filtered = students.filter((s) => s.id !== id);
      setStudents(filtered);
      localStorage.setItem("myStudents", JSON.stringify(filtered));
      if (selectedStudent?.id === id) setSelectedStudent(null);
    }
  };

  return (
    <div dir="rtl" className="bg-gray-50 min-h-screen pb-20">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header and Input Sections (Same as your previous version) */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl bold text-main flex items-center gap-2 font-bold">
              <FaUserGraduate className="text-secondary" />
              لوحة متابعة الطّلاب
            </h1>
          </div>

          <form
            onSubmit={handleAddStudent}
            className="flex gap-2 w-full md:w-auto"
          >
            <div className="relative flex-1">
              <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                #
              </span>
              <input
                type="text"
                placeholder="الرقم التعريفي (6 أرقام)"
                value={studentIdInput}
                onChange={(e) => setStudentIdInput(e.target.value)}
                className="pr-8 pl-4 py-2 border rounded-lg focus:ring-2 focus:ring-main outline-none w-full md:w-64 regular"
              />
            </div>
            <button
              disabled={isLoading}
              className="bg-main text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition shadow-md"
            >
              <FaUserPlus />
              {isLoading ? "جاري البحث..." : "إضافة"}
            </button>
          </form>
        </div>

        {message.text && (
          <div
            className={`mb-4 p-3 rounded-lg text-center regular ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
          >
            {message.text}
          </div>
        )}

        {/* Responsive Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 semi text-sm border-b">
                <th className="p-4">الطالب</th>
                <th className="p-4 hidden md:table-cell">تاريخ الانضمام</th>
                <th className="p-4 hidden md:table-cell">الإنجاز</th>
                <th className="p-4 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="regular text-gray-700">
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 relative overflow-hidden hidden sm:block">
                        <Image
                          src={`/Images/${student.avatar || "avatar-boy-1.png"}`}
                          fill
                          alt="avatar"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="bold text-main">{student.name}</p>
                        <p className="text-xs font-mono text-secondary">
                          #{student.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm hidden md:table-cell">
                    {student.joinDate}
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <div className="flex items-center gap-2 w-32">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500"
                          style={{ width: student.progress }}
                        ></div>
                      </div>
                      <span className="text-[10px]">{student.progress}</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="text-blue-500 hover:bg-blue-50 p-2 rounded-full transition"
                        title="عرض التفاصيل"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => removeStudent(student.id)}
                        className="text-red-400 hover:bg-red-50 p-2 rounded-full transition"
                        title="حذف"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="relative h-32 bg-main flex justify-center">
              <button
                onClick={() => setSelectedStudent(null)}
                className="absolute top-4 right-4 text-white/70 hover:text-white text-xl"
              >
                <FaTimes />
              </button>
              <div className="absolute -bottom-12 w-24 h-24 rounded-full border-4 border-white bg-gray-100 overflow-hidden shadow-md">
                <Image
                  src={`/Images/${selectedStudent.avatar || "avatar-boy-1.png"}`}
                  fill
                  alt="avatar"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="pt-16 pb-8 px-6 text-center">
              <h2 className="text-xl bold text-main mb-1">
                {selectedStudent.name}
              </h2>
              <p className="text-secondary font-mono mb-6">
                رقم الهوية: #{selectedStudent.id}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-2xl">
                  <p className="text-[10px] text-gray-400 mb-1">
                    تاريخ الانضمام
                  </p>
                  <p className="text-sm semi">{selectedStudent.joinDate}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-2xl">
                  <p className="text-[10px] text-gray-400 mb-1">نسبة الإنجاز</p>
                  <p className="text-sm semi text-green-600">
                    {selectedStudent.progress}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedStudent(null)}
                className="w-full bg-gray-100 text-gray-600 py-3 rounded-xl hover:bg-gray-200 transition semi"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
