"use client";
import React, { useEffect, useState } from "react";

const FixedNotification = ({ onClose }) => {
  const [show, setShow] = useState(true);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const timer = setTimeout(() => {
      setShow(false);
      if (onClose) onClose();
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      dir="rtl"
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-md z-50"
    >
      <div className="p-4 w-[90%] rounded-xs  text-center text-white bg-main">
        <h1 className="semi text-lg text-secondary">تنبيــــه!</h1>
        <p className="semi mt-2">
          الرجاء ملء المهام بعد انجازها كلّها، وليس عند اتمام كل مهمّة على حِدة
        </p>
        <div className=" text-sm regular text-white mt-3">
          يختفي خلال {countdown} ثوانٍ
        </div>
      </div>
    </div>
  );
};

export default FixedNotification;
