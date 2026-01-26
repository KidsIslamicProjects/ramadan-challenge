"use client";
import React, { useState, useEffect, useRef } from "react";
import SignupImage from "../../public/Images/Register.png";
import Image from "next/image";
import Notification from "../components/Notification";
import { useRouter } from "next/navigation";
import Link from "next/link";
import confetti from "canvas-confetti";
import twemoji from "twemoji";

// Country list
const countries = [
  { code: "LB", name: "لبنان", dial_code: "+961", flag: "🇱🇧" },
  { code: "PS", name: "فلسطين", dial_code: "+970", flag: "🇵🇸" },
  { code: "SY", name: "سوريا", dial_code: "+963", flag: "🇸🇾" },
  { code: "EG", name: "مصر", dial_code: "+20", flag: "🇪🇬" },
  {
    code: "SA",
    name: "السعودية",
    dial_code: "+966",
    flag: "🇸🇦",
  },
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

// Avatar Constants
const boyAvatars = ["avatar-boy-1.png", "avatar-boy-2.png", "avatar-boy-4.png"];
const girlAvatars = [
  "avatar-girl-1.png",
  "avatar-girl-2.png",
  "avatar-girl-3.png",
];

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    age: "",
    gender: "",
    phoneNumber: "",
    avatar: "", // Stores the filename of the selected avatar
  });

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });

  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      router.push("/");
    }
  }, []);

  // Twemoji Effect
  useEffect(() => {
    if (dropdownRef.current) {
      twemoji.parse(dropdownRef.current, {
        folder: "svg",
        ext: ".svg",
      });
    }
  }, [isDropdownOpen, selectedCountry]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If gender changes, reset the avatar so they don't keep a wrong gender avatar
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

    // Validation: Ensure avatar is selected
    if (!formData.avatar) {
      setNotification({
        message: "الرجاء اختيار شخصية (Avatar)",
        type: "error",
      });
      setIsLoading(false);
      return;
    }

    const cleanPhone = formData.phoneNumber.replace(/^0+/, "");
    const fullPhoneNumber = `${selectedCountry.dial_code}${cleanPhone}`;

    const dataToSend = {
      ...formData,
      phoneNumber: fullPhoneNumber,
      country: selectedCountry.name,
    };

    try {
      const response = await fetch(
        "https://ramadan-server-topaz.vercel.app/api/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        },
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

  // Determine which avatars to show
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
        className="bg-white flex flex-col-reverse justify-between px-4 pt-8 lg:flex-row-reverse lg:justify-between lg:gap-12"
      >
        {/* Illustration */}
        <div className="flex-1 flex justify-center mb-24 md:mb-0">
          <Image className="w-52" alt="Signup illustration" src={SignupImage} />
        </div>

        {/* Vertical Line */}
        <div className="hidden lg:block w-px bg-gray-300 mx-4"></div>
        <hr className="block lg:hidden text-main mt-8 mb-4" />

        {/* Signup Form */}
        <div className="flex-1">
          <div className="mb-6 flex flex-col gap-1 text-center md:text-right">
            <h3 className="text-main bold text-lg">صفحة إنشاء حساب جديد</h3>
            <p className="text-secondary regular">
              أهلاً بك في تحدّي مأرب! استعد لرحلة إيمانية ممتعة.
            </p>
          </div>

          {notification && notification.message && (
            <Notification
              message={notification.message}
              type={notification.type}
            />
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="flex flex-col gap-1">
              <label className="text-main text-right semi">
                اسمك الثلاثي -باللغة العربية-
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="ادخل اسمك الثلاثي هنا"
                className="bg-[#F4F4F4] rounded-sm shadow py-2 px-3 w-full placeholder:text-right regular"
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-main text-right semi">كلمة المرور</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="ادخل كلمة المرور هنا"
                className="bg-[#F4F4F4] rounded-sm shadow py-2 px-3 w-full placeholder:text-right regular"
                required
              />
            </div>

            {/* Age */}
            <div className="flex flex-col gap-1">
              <label className="text-main text-right semi">العمر</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="ادخل عمرك هنا، مثال: 12"
                className="bg-[#F4F4F4] rounded-sm shadow py-2 px-3 w-full placeholder:text-right regular"
                required
              />
            </div>

            {/* Country Dropdown */}
            <div className="flex flex-col gap-1 relative" ref={dropdownRef}>
              <label className="text-main text-right semi">البلد</label>
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-[#F4F4F4] rounded-sm shadow py-2 px-3 w-full text-right regular cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span>{selectedCountry.flag}</span>
                  <span>{selectedCountry.name}</span>
                </div>
                <span className="text-gray-500 text-xs">▼</span>
              </div>
              {isDropdownOpen && (
                <div className="absolute top-[105%] left-0 w-full bg-white border border-gray-200 shadow-lg rounded-sm z-10 max-h-60 overflow-y-auto">
                  {countries.map((country) => (
                    <div
                      key={country.code}
                      onClick={() => handleCountrySelect(country)}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-right regular border-b border-gray-50 last:border-0"
                    >
                      <span className="text-lg">{country.flag}</span>
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
                className="bg-[#F4F4F4] rounded-sm shadow px-3 py-2 w-full flex items-center gap-2"
              >
                <span className="text-gray-500 semi select-none">
                  {selectedCountry.dial_code}
                </span>
                <input
                  type="number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="70123456"
                  className="bg-transparent border-none outline-none w-full regular placeholder:text-left"
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
                className="bg-[#F4F4F4] rounded-sm shadow py-2 px-3 w-full text-right regular"
                required
              >
                <option value="">اختر الجنس</option>
                <option value="ذكر">ذكر</option>
                <option value="أنثى">أنثى</option>
              </select>
            </div>

            {/* --- AVATAR SELECTION (LOGIC: Show based on Gender) --- */}
            {formData.gender && (
              <div className="flex flex-col gap-2 mt-2 fade-in">
                <label className="text-main text-right semi">
                  اختر الشخصية (Avatar)
                </label>
                <div className="flex flex-wrap justify-center gap-4 py-2">
                  {currentAvatars.map((avatarName) => (
                    <div
                      key={avatarName}
                      onClick={() => handleAvatarSelect(avatarName)}
                      className={`cursor-pointer rounded-full p-1 transition-all duration-200 ${
                        formData.avatar === avatarName
                          ? "ring-4 ring-main bg-main/10 scale-110"
                          : "ring-2 ring-gray-200 hover:ring-main/50"
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
      `}</style>
    </>
  );
};

export default Signup;
