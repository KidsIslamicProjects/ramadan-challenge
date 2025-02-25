"use client";
import React, { useState, useEffect } from "react";
import Logo from "./Logo";

const Countdown = ({ onCountdownEnd }) => {
  const targetDate = new Date("2025-02-28T23:59:59").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        onCountdownEnd(); // Notify parent component
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, onCountdownEnd]);

  return (
    <div
      dir="rtl"
      className="flex justify-center items-center px-4 min-h-screen mx-auto w-full"
    >
      <div className="bg-white w-full p-3 rounded-sm shadow-2xl text-center">
        <Logo />
        <h1 className="texl-xl mt-4 bold text-main">
          متبقّي على اللإطلاق الرسمي
        </h1>
        <p className="text-secondary regular mt-2 mb-8">
          كونوا بالقُرب يا أبطالنا، التحديات تنتظركم!
        </p>
        <div className="flex justify-center items-center gap-4">
          <div className="flex flex-col items-center">
            <span className="text-4xl bold font-bold text-main">
              0{timeLeft.days}
            </span>
            <span className="text-lg bold text-gray-600">أيّام</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl bold font-bold text-main">
              {timeLeft.hours}
            </span>
            <span className="text-lg bold text-gray-600">ساعة</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl bold font-bold text-main">
              {timeLeft.minutes}
            </span>
            <span className="text-lg bold text-gray-600">دقيقة</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl bold font-bold text-main">
              {timeLeft.seconds}
            </span>
            <span className="text-lg bold text-gray-600">ثانية</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
