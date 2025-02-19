"use client";
import React, { useState, useEffect } from "react";
import LoginImage from "../data/images/Login.svg";
import Image from "next/image";
import Notification from "../components/Notification";
import { useRouter } from "next/navigation";
const LoginComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    age: "",
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

      setNotification({ message: "تم إنشاء الحساب بنجاح!", type: "success" });

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
    <div
      dir="rtl"
      className="flex flex-col-reverse justify-between px-4 pt-8 lg:flex-row-reverse lg:justify-between lg:gap-12"
    >
      {/* Illustration */}
      <div className="flex-1 flex justify-center">
        <Image
          className="w-32 md:w-80"
          alt="Login illustration"
          src={LoginImage}
        />
      </div>

      {/* Vertical Line */}
      <div className="hidden lg:block w-px bg-gray-300 mx-4"></div>
      <hr className="block lg:hidden text-main my-12" />

      {/* Login Form */}
      <div className="flex-1">
        <div className="mb-6 flex flex-col text-center md:text-left">
          <h3 className="text-main bold text-lg">صفحة تسجيل الدخول</h3>
          <p className="text-main regular">
            أهلاً وسهلاً بكَ في تحدّي مأرب! كن جاهزاً لرحلة مليئة بالتحدّيات
            واتّباع سنة الحبيب عليه الصلاة والسلام
          </p>
        </div>

        {/* Notification */}
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
              placeholder: "ادخل اسمك الثلاثي هنا(مثال: خضر خالد حسن)",
              type: "text",
              name: "name",
            },
            {
              label: "كلمة المرور",
              placeholder: "ادخل كلمة المرور هنا، لا تنساها يا بطل!",
              type: "password",
              name: "password",
            },
            {
              label: " العمر",
              placeholder: "",
              type: "number",
              name: "age",
            },
          ].map(({ label, placeholder, type, name }) => (
            <div key={label} className="flex flex-col gap-1">
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

          {/* Submit Button */}
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-main regular text-white rounded-sm shadow py-1 px-4 mt-4"
            >
              {isLoading ? "جاري تسجيل الدخول ..." : "تسجيل الدخول"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
