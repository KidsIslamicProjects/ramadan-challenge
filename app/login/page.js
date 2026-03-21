"use client";

import React, { useState, useEffect } from "react";
import LoginImage from "../../public/Images/Register.png";
import Image from "next/image";
import Notification from "../components/Notification";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Simple SVG Icons for Show/Hide to avoid external dependencies
const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const EyeSlashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
    />
  </svg>
);

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });

  // NEW: State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  // AUTH CHECK
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      router.push("/");
    }
  }, [router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // FIX 1: Reset to empty object instead of null, or handle null in JSX
    setNotification({ message: "", type: "" });

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "فشل في تسجيل الدخول، تحقق من البيانات.");
      }

      localStorage.setItem("user", JSON.stringify(data.user));

      setNotification({ message: "تم تسجيل الدخول بنجاح!", type: "success" });

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      setNotification({ message: error.message, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        dir="rtl"
        className="bg-white flex flex-col-reverse justify-between px-4 pt-8 lg:flex-row-reverse lg:justify-between lg:gap-12 min-h-screen"
      >
        {/* Illustration */}
        <div className="flex-1 flex justify-center items-center mb-24 md:mb-0">
          <Image
            className="w-52 object-cover hover:scale-105 transition-transform"
            alt="Login illustration"
            src={LoginImage}
          />
        </div>

        {/* Vertical Line */}
        <div className="hidden lg:block w-px bg-gray-300 mx-4"></div>
        <hr className="block lg:hidden text-main mt-8 mb-4" />

        {/* Login Form */}
        <div className="flex-1 max-w-lg mx-auto w-full">
          <div className="mb-6 flex flex-col gap-1 text-center md:text-right">
            <h3 className="text-main bold text-2xl">صفحة تسجيل الدخول</h3>
            <p className="text-secondary regular">
              أدخل بياناتك لتتمكن من متابعة التحديات اليومية
            </p>
          </div>

          {/* FIX 1: Added ?. (Optional Chaining) to prevent crash if notification is null */}
          {notification?.message && (
            <Notification
              message={notification.message}
              type={notification.type}
            />
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              {
                label: "اسم المستخدم",
                placeholder: "ادخل اسم المستخدم",
                type: "text",
                name: "name",
              },
              {
                label: "كلمة المرور",
                placeholder: "ادخل كلمة المرور",
                type: "password",
                name: "password",
              },
            ].map(({ label, placeholder, type, name }) => {
              // Logic to handle password field specific features
              const isPassword = name === "password";
              const inputType = isPassword
                ? showPassword
                  ? "text"
                  : "password"
                : type;

              return (
                <div key={name} className="flex flex-col gap-1">
                  <label className="text-main text-right semi">{label}</label>

                  {/* FIX 2: Wrapper div relative for icon positioning */}
                  <div className="relative">
                    <input
                      type={inputType}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      className="bg-[#F4F4F4] rounded-sm shadow-sm focus:ring-2 focus:ring-main/50 outline-none transition-all py-2 px-3 w-full placeholder:text-right regular"
                      required
                    />

                    {/* Password Toggle Button */}
                    {isPassword && (
                      <button
                        type="button" // Important: prevents form submission
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-main transition-colors"
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Submit Button */}
            <div className="flex flex-col gap-2 pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-main hover:bg-main/90 active:scale-[0.98] transition-all regular text-white rounded-sm shadow-md py-2 px-4 mt-4"
              >
                {isLoading ? "جاري تسجيل الدخول ..." : "تســـجيل الدخــول"}
              </button>
            </div>
          </form>

          <Link
            href="/signup"
            className="text-secondary text-sm regular pt-6 flex items-center justify-center gap-1 hover:text-main transition-colors"
          >
            <span>ليس لديك حساب؟</span>
            <span className="underline semi"> أنشئ حساب جديد من هنا</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
