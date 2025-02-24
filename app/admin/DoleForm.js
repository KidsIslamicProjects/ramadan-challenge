"use client";
import React, { useState } from "react";
import axios from "axios";

const DoleAdminForm = () => {
  const [formData, setFormData] = useState({
    hijriDate: "",
    gregorianDay: "",
    dole: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(
        "https://ramadan-server-topaz.vercel.app/api/dole",
        formData
      );
      setIsLoading(false);
      alert("تم نشر فسيلة الخير بنجاح!");
      setFormData({ hijriDate: "", gregorianDay: "", dole: "" });
    } catch (error) {
      console.error("Error posting dole data", error);
      setIsLoading(false);
      alert("حدث خطأ أثناء نشر فسيلة الخير");
    }
  };

  return (
    <div dir="rtl" className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-main text-xl bold mb-4">نشر فسيلة الخير</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="gregorianDay"
            className="block semi text-secondary mb-2"
          >
            اليوم الميلادي
          </label>
          <input
            id="gregorianDay"
            type="number"
            placeholder="أدخل اليوم الميلادي"
            className="border p-2 rounded w-full"
            value={formData.gregorianDay}
            onChange={handleChange}
            name="gregorianDay"
          />
        </div>
        <div>
          <label htmlFor="hijriDate" className="block semi text-secondary mb-2">
            التاريخ الهجري
          </label>
          <input
            id="hijriDate"
            type="text"
            placeholder="أدخل التاريخ الهجري"
            className="border p-2 rounded w-full"
            value={formData.hijriDate}
            onChange={handleChange}
            name="hijriDate"
          />
        </div>
        <div>
          <label htmlFor="dole" className="block semi text-secondary mb-2">
            فسيلة الخير
          </label>
          <textarea
            id="dole"
            placeholder="أدخل فسيلة الخير"
            className="border p-2 rounded w-full"
            value={formData.dole}
            onChange={handleChange}
            name="dole"
          />
        </div>
        <button
          type="submit"
          className="w-full semi p-2 bg-main text-white rounded"
        >
          {isLoading ? "جاري نشر فسيلة الخير..." : "نشر"}
        </button>
      </form>
    </div>
  );
};

export default DoleAdminForm;
