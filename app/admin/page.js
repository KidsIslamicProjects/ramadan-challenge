"use client";
import React, { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import axios from "axios"; // You'll need axios to make API calls

const Page = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [formData, setFormData] = useState({
    hijriDate: "",
    hadith: "",
    tafseerQuestion: "",
    tafseerAnswer: "",
  });

  const toggleCollapse = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Adjust the URL to match your API endpoint
      await axios.post("http://localhost:3001/api/task", formData);
      alert("تم نشر المفكرة اليومية بنجاح!");
    } catch (error) {
      console.error("Error posting data", error);
      alert("حدث خطأ أثناء نشر المفكرة اليومية");
    }
  };
  const supervisorsData = [
    {
      title: "نشر الـمفكرة اليومية",
      content: (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="hijriDate"
              className="block mb-2 semi text-secondary"
            >
              التاريخ الهجري
            </label>
            <input
              id="hijriDate"
              type="text"
              placeholder="أدخل التاريخ الهجري"
              className="border p-2 regular rounded w-full"
              value={formData.hijriDate}
              onChange={handleChange}
              name="hijriDate"
            />
          </div>
          <div>
            <label htmlFor="hadith" className="block mb-2 semi text-secondary">
              الحديث
            </label>
            <input
              id="hadith"
              type="text"
              placeholder="أدخل الحديث"
              className="border p-2 regular rounded w-full"
              value={formData.hadith}
              onChange={handleChange}
              name="hadith"
            />
          </div>
          <div>
            <label
              htmlFor="tafseerQuestion"
              className="block mb-2 semi text-secondary"
            >
              سؤال التفسير
            </label>
            <input
              id="tafseerQuestion"
              type="text"
              placeholder="أدخل سؤال التفسير"
              className="border p-2 regular rounded w-full"
              value={formData.tafseerQuestion}
              onChange={handleChange}
              name="tafseerQuestion"
            />
          </div>
          <div>
            <label
              htmlFor="tafseerAnswer"
              className="block mb-2 semi text-secondary"
            >
              جواب التفسير
            </label>
            <input
              id="tafseerAnswer"
              type="text"
              placeholder="أدخل جواب التفسير"
              className="border p-2 regular rounded w-full"
              value={formData.tafseerAnswer}
              onChange={handleChange}
              name="tafseerAnswer"
            />
          </div>
          <button
            type="submit"
            className="w-full semi p-2 bg-main text-white rounded"
          >
            نشــــــــــر
          </button>
        </form>
      ),
    },
    {
      title: "نشر الـمسابقة الأسبوعية",
      content: (
        <form>
          <input
            type="text"
            placeholder="إدخال بيانات"
            className="border p-2 rounded w-full"
          />
        </form>
      ),
    },
    {
      title: "نشر فسائل الخير",
      content: (
        <form>
          <input
            type="text"
            placeholder="إدخال بيانات"
            className="border p-2 rounded w-full"
          />
        </form>
      ),
    },
  ];
  return (
    <div dir="rtl" className="bg-white min-h-screen p-6">
      <h1 className="text-main text-xl bold mb-4">صفحة الـمشرفين</h1>
      <div className="space-y-4">
        {supervisorsData.map((item, index) => (
          <div
            key={index}
            className="border rounded-xs overflow-hidden shadow-md"
          >
            <div
              onClick={() => toggleCollapse(index)}
              className="flex justify-between items-center bg-gray-100 hover:bg-gray-200"
            >
              {" "}
              <button className="w-full text-right p-4  semi text-main focus:outline-none">
                {item.title}
              </button>
              {openIndex === index ? (
                <FaCaretUp className="text-main" />
              ) : (
                <FaCaretDown className="text-main" />
              )}
            </div>
            {openIndex === index && (
              <div className="p-4 border-t bg-white">{item.content}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
