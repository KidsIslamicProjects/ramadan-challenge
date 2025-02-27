import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Logo from "../data/images/logo.svg";
import { FaWhatsapp } from "react-icons/fa";

const Navbar = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, []);
  return (
    <nav className="bg-[#F4F4F3] p-4 flex justify-between items-center">
      {userId ? (
        <div className="flex gap-2">
          {" "}
          <Link href="/profile">
            <button className="bg-main text-white text-xs px-2 py-1 rounded-sm regular">
              ملفَك الشخصيّ
            </button>
          </Link>
        </div>
      ) : (
        <Link href="/login">
          <button className="bg-main text-white px-2 py-1 rounded-sm regular">
            تسجيل دخول
          </button>
        </Link>
      )}{" "}
      <Image src={Logo} alt="Logo" width={80} height={40} />
      <Link
        href="https://chat.whatsapp.com/DQ2fbP0M6dWChruFp77mFe"
        className="flex flex-col items-center"
      >
        <FaWhatsapp className="text-main" />
        <span className="text-main text-sm semi">مجموعة الواتساب</span>
      </Link>
    </nav>
  );
};

export default Navbar;
