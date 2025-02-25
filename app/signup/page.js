"use client";
import React, { useState, useEffect } from "react";
import SignupImage from "../data/images/Login.svg";
import Image from "next/image";
import Notification from "../components/Notification";
import { useRouter } from "next/navigation";
import Link from "next/link";
import confetti from "canvas-confetti";
import Header from "../components/Header";
import Logo from "../components/Logo";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    age: "",
    gender: "",
    phoneNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });

  const router = useRouter();
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      router.push("/");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setNotification(null);
    try {
      const response = await fetch(
        "https://ramadan-server-topaz.vercel.app/api/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("فشل في إنشاء الحساب، حاول مرة أخرى.");
      }

      const user = await response.json();
      localStorage.setItem("userId", user._id);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setNotification({ message: "تم إنشاء الحساب بنجاح!", type: "success" });

      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      setNotification({ message: error.message, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div
        dir="rtl"
        className="flex flex-col-reverse justify-between px-4 pt-8 lg:flex-row-reverse lg:justify-between lg:gap-12"
      >
        {/* Illustration */}
        <div className="flex-1 flex justify-center">
          <Image
            className="w-32 md:w-80"
            alt="Signup illustration"
            src={SignupImage}
          />
        </div>
        {/* Vertical Line */}
        <div className="hidden lg:block w-px bg-gray-300 mx-4"></div>
        <hr className="block lg:hidden text-main my-12" />
        {/* Signup Form */}
        <div className="flex-1">
          <div className="mb-6 flex flex-col gap-1 text-center md:text-right">
            <Logo />
            <h3 className="text-main bold text-lg">صفحة إنشاء حساب جديد</h3>
            <p className="text-secondary regular">
              أهلاً وسهلاً بكَ في تحدّي مأرب! كن جاهزاً لرحلة مليئة بالتحدّيات
              واتّباع سنة الحبيب عليه الصلاة والسلام
            </p>
          </div>

          {notification && (
            <Notification
              message={notification.message}
              type={notification.type}
            />
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              {
                label: "اسمك الثلاثي -باللغة العربية-",
                placeholder: "ادخل اسمك الثلاثي هنا",
                type: "text",
                name: "name",
              },
              {
                label: "كلمة المرور",
                placeholder: "ادخل كلمة المرور هنا",
                type: "password",
                name: "password",
              },
              {
                label: "العمر",
                placeholder: "ادخل عمرك هنا، مثال: 12",
                type: "number",
                name: "age",
              },
              {
                label:
                  "رقم الـهاتف(إذا كان الرقم غير لبناني، الرجاء ادخال رمز البلد) ",
                placeholder: "ادخل رقم الهاتف",
                type: "number",
                name: "phoneNumber",
              },
            ].map(({ label, placeholder, type, name }) => (
              <div key={name} className="flex flex-col gap-1">
                <label className="text-main text-right semi">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="bg-[#F4F4F4] rounded-sm shadow py-2 px-3 w-full placeholder:text-right regular"
                  required
                />
              </div>
            ))}

            {/* Gender Selection */}
            <div className="flex flex-col gap-1">
              <label className="text-main text-right semi">الجنس</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="bg-[#F4F4F4] rounded-sm shadow py-2 px-3 w-full text-right regular"
              >
                <option value="">اختر الجنس</option>
                <option value="ذكر">ذكر</option>
                <option value="أنثى">أنثى</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col gap-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-main regular text-white rounded-sm shadow py-1 px-4 mt-4"
              >
                {isLoading ? "جاري إنشاء الحســاب ..." : "إنشاء حســــاب"}
              </button>
            </div>
          </form>

          <Link
            href="/login"
            className="text-secondary text-sm regular pt-4 flex items-center justify-center"
          >
            لديك حساب مُسبقاً؟{" "}
            <span className="underline semi">الانتقال لصفحة تسجيل الدخول</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
