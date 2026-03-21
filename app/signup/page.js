"use client";
import React, { useState, useEffect, useRef } from "react";
import SignupImage from "../../public/Images/Register.png";
import Image from "next/image";
import Notification from "../components/Notification";
import { useRouter } from "next/navigation";
import Link from "next/link";
import confetti from "canvas-confetti";
import twemoji from "twemoji";

// --- Constants ---
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const countries = [
  { code: "LB", name: "لبنان", dial_code: "+961", flag: "🇱🇧" },
  { code: "PS", name: "فلسطين", dial_code: "+970", flag: "🇵🇸" },
  { code: "SY", name: "سوريا", dial_code: "+963", flag: "🇸🇾" },
  { code: "EG", name: "مصر", dial_code: "+20", flag: "🇪🇬" },
  { code: "SA", name: "السعودية", dial_code: "+966", flag: "🇸🇦" },
  { code: "AE", name: "الإمارات", dial_code: "+971", flag: "🇦🇪" },
  { code: "JO", name: "الأردن", dial_code: "+962", flag: "🇯🇴" },
  { code: "IQ", name: "العراق", dial_code: "+964", flag: "🇮🇶" },
  { code: "KW", name: "الكويت", dial_code: "+965", flag: "🇰🇼" },
  { code: "QA", name: "قطر", dial_code: "+974", flag: "🇶🇦" },
  { code: "OM", name: "عمان", dial_code: "+968", flag: "🇴🇲" },
  { code: "TR", name: "تركيا", dial_code: "+90", flag: "🇹🇷" },
  { code: "YE", name: "اليمن", dial_code: "+967", flag: "🇾🇪" },
  { code: "DZ", name: "الجزائر", dial_code: "+213", flag: "🇩🇿" },
  { code: "MA", name: "المغرب", dial_code: "+212", flag: "🇲🇦" },
];

const boyAvatars = ["avatar-boy-1.png", "avatar-boy-2.png", "avatar-boy-4.png"];
const girlAvatars = [
  "avatar-girl-1.png",
  "avatar-girl-2.png",
  "avatar-girl-3.png",
];

const Signup = () => {
  const router = useRouter();

  // --- State ---
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    dob: "",
    gender: "",
    phoneNumber: "",
    groupName: "",
    avatar: "",
  });

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });

  const dropdownRef = useRef(null);

  // --- Effects ---

  // 1. Check for Authentication (Updated: Check if User object exists)
  useEffect(() => {
    // We can't check for 'token' anymore because it is in a cookie.
    // We check if the user data exists in local storage as a proxy.
    const user = localStorage.getItem("user");
    if (user) {
      router.push("/");
    }
  }, [router]);

  // 2. Parse Emoji Flags
  useEffect(() => {
    if (dropdownRef.current) {
      twemoji.parse(dropdownRef.current, { folder: "svg", ext: ".svg" });
    }
  }, [isDropdownOpen, selectedCountry]);

  // --- Handlers ---

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "gender") {
      setFormData({ ...formData, [name]: value, avatar: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  };

  const handleAvatarSelect = (avatarName) => {
    setFormData({ ...formData, avatar: avatarName });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setNotification(null);

    // Frontend Validation
    if (!formData.avatar) {
      setNotification({
        message: "الرجاء اختيار شخصية (Avatar)",
        type: "error",
      });
      setIsLoading(false);
      return;
    }

    if (role === "supervisor" && !formData.groupName) {
      setNotification({ message: "الرجاء إدخال اسم الحلقة", type: "error" });
      setIsLoading(false);
      return;
    }

    // Format Phone Number
    const cleanPhone = formData.phoneNumber.replace(/^0+/, "");
    const fullPhoneNumber = `${selectedCountry.dial_code}${cleanPhone}`;

    const dataToSend = {
      ...formData,
      phoneNumber: fullPhoneNumber,
      country: selectedCountry.name,
      role: role,
    };

    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // CRITICAL: This allows the cookie to be set by the backend
        credentials: "include",
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "فشل في إنشاء الحساب، حاول مرة أخرى.");
      }

      // --- Professional Auth Handling ---
      // NO TOKEN STORAGE HERE (It's in the cookie)

      // We only store public user info for the UI (Name, Avatar, etc.)
      localStorage.setItem("user", JSON.stringify(data.user));

      // Success UI
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

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

  const currentAvatars =
    formData.gender === "ذكر"
      ? boyAvatars
      : formData.gender === "أنثى"
        ? girlAvatars
        : [];

  return (
    <>
      <div
        dir="rtl"
        className="bg-white flex flex-col-reverse justify-between px-4 pt-8 lg:flex-row-reverse lg:justify-between lg:gap-12 min-h-screen"
      >
        {/* Illustration Side */}
        <div className="flex-1 flex justify-center items-center mb-24 md:mb-0">
          <Image
            className="w-[75%] object-cover hover:scale-105 transition-transform duration-500"
            alt="Signup illustration"
            src={SignupImage}
            priority
          />
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px bg-gray-200 mx-4"></div>
        <hr className="block lg:hidden text-main mt-8 mb-4 opacity-50" />

        {/* Signup Form Side */}
        <div className="flex-1 max-w-2xl mx-auto w-full">
          <div className="mb-6 flex flex-col gap-1 text-center md:text-right">
            <h3 className="text-main bold text-2xl">صفحة إنشاء حساب جديد</h3>
            <p className="text-secondary regular">
              أهلاً بك في منصّتنا! استعد لرحلة إيمانية ممتعة.
            </p>
          </div>

          {/* Role Switcher */}
          <div className="flex bg-[#F4F4F4] p-1 rounded-md mb-6 shadow-inner">
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`flex-1 py-2 text-center rounded-sm transition-all regular duration-300 ${
                role === "student"
                  ? "bg-main text-white shadow-sm semi"
                  : "text-gray-500 hover:text-main"
              }`}
            >
              طالب
            </button>
            <button
              type="button"
              onClick={() => setRole("supervisor")}
              className={`flex-1 py-2 text-center rounded-sm transition-all regular duration-300 ${
                role === "supervisor"
                  ? "bg-main text-white shadow-sm semi"
                  : "text-gray-500 hover:text-main"
              }`}
            >
              مُشرف
            </button>
          </div>

          {notification && notification.message && (
            <Notification
              message={notification.message}
              type={notification.type}
            />
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="flex flex-col gap-1">
              <label className="text-main text-right semi">
                اسمك الثلاثي (باللغة العربية)
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="ادخل اسمك الثلاثي هنا"
                className="bg-[#F4F4F4] rounded-sm focus:ring-2 focus:ring-main/50 outline-none transition-all shadow-sm py-2 px-3 w-full placeholder:text-right regular"
                required
                minLength={3}
              />
            </div>

            {/* Supervisor Group Name */}
            {role === "supervisor" && (
              <div className="flex flex-col gap-1 fade-in">
                <label className="text-main text-right semi">
                  اسم الحلقة / المجموعة
                </label>
                <input
                  type="text"
                  name="groupName"
                  value={formData.groupName}
                  onChange={handleChange}
                  placeholder="مثال: حلقة النور"
                  className="bg-[#F4F4F4] rounded-sm focus:ring-2 focus:ring-main/50 outline-none transition-all shadow-sm py-2 px-3 w-full placeholder:text-right regular"
                  required
                />
              </div>
            )}

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-main text-right semi">كلمة المرور</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="ادخل كلمة المرور هنا"
                className="bg-[#F4F4F4] rounded-sm focus:ring-2 focus:ring-main/50 outline-none transition-all shadow-sm py-2 px-3 w-full placeholder:text-right regular"
                required
                minLength={6}
              />
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col gap-1">
              <label className="text-main text-right semi">تاريخ الميلاد</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="bg-[#F4F4F4] rounded-sm focus:ring-2 focus:ring-main/50 outline-none transition-all shadow-sm py-2 px-3 w-full text-right regular"
                required
              />
            </div>

            {/* Country Dropdown */}
            <div className="flex flex-col gap-1 relative" ref={dropdownRef}>
              <label className="text-main text-right semi">البلد</label>
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-[#F4F4F4] rounded-sm focus:ring-2 focus:ring-main/50 outline-none transition-all shadow-sm py-2 px-3 w-full text-right regular cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{selectedCountry.flag}</span>
                  <span>{selectedCountry.name}</span>
                </div>
                <span
                  className={`text-gray-500 text-xs transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                >
                  ▼
                </span>
              </div>

              {isDropdownOpen && (
                <div className="absolute top-[110%] left-0 w-full bg-white border border-gray-100 shadow-xl rounded-sm z-50 max-h-60 overflow-y-auto">
                  {countries.map((country) => (
                    <div
                      key={country.code}
                      onClick={() => handleCountrySelect(country)}
                      className="px-3 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2 text-right regular border-b border-gray-50 last:border-0"
                    >
                      <span className="text-xl">{country.flag}</span>
                      <span>{country.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-1">
              <label className="text-main text-right semi">رقم الهاتف</label>
              <div
                dir="ltr"
                className="bg-[#F4F4F4] rounded-sm focus-within:ring-2 focus-within:ring-main/50 transition-all shadow-sm px-3 py-2 w-full flex items-center gap-2"
              >
                <span className="text-gray-600 semi select-none bg-gray-200 px-2 rounded text-sm">
                  {selectedCountry.dial_code}
                </span>
                <input
                  type="number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="70123456"
                  className="bg-transparent border-none outline-none w-full regular placeholder:text-right"
                  required
                />
              </div>
            </div>

            {/* Gender Selection */}
            <div className="flex flex-col gap-1">
              <label className="text-main text-right semi">الجنس</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="bg-[#F4F4F4] rounded-sm focus:ring-2 focus:ring-main/50 outline-none transition-all shadow-sm py-2 px-3 w-full text-right regular"
                required
              >
                <option value="">اختر الجنس</option>
                <option value="ذكر">ذكر</option>
                <option value="أنثى">أنثى</option>
              </select>
            </div>

            {/* Avatar Selection */}
            {formData.gender && (
              <div className="flex flex-col gap-2 mt-2 fade-in">
                <label className="text-main text-right semi">
                  اختر الشخصية (Avatar)
                </label>
                <div className="flex flex-wrap justify-center gap-4 py-4 bg-gray-50 rounded-lg border border-gray-100">
                  {currentAvatars.map((avatarName) => (
                    <div
                      key={avatarName}
                      onClick={() => handleAvatarSelect(avatarName)}
                      className={`cursor-pointer rounded-full p-1 transition-all duration-200 transform hover:scale-105 ${
                        formData.avatar === avatarName
                          ? "ring-4 ring-main bg-main/10 scale-110 shadow-lg"
                          : "ring-2 ring-transparent grayscale hover:grayscale-0"
                      }`}
                    >
                      <Image
                        src={`/Images/${avatarName}`}
                        alt="Avatar"
                        width={70}
                        height={70}
                        className="rounded-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-main hover:bg-main/90 active:scale-[0.98] transition-all regular text-white rounded-sm shadow-md py-2 px-4 text-lg"
              >
                {isLoading ? "جاري إنشاء الحســاب ..." : "إنشاء حســــاب"}
              </button>
            </div>
          </form>

          <Link
            href="/login"
            className="text-secondary text-sm regular pt-6 pb-8 flex items-center justify-center gap-1 hover:text-main transition-colors"
          >
            <span>لديك حساب مُسبقاً؟</span>
            <span className="underline semi">الانتقال لصفحة تسجيل الدخول</span>
          </Link>
        </div>
      </div>

      <style jsx global>{`
        img.emoji {
          height: 1.2em;
          width: 1.2em;
          margin: 0 0.2em;
          vertical-align: -0.2em;
          display: inline-block;
        }
        .fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}</style>
    </>
  );
};

export default Signup;
