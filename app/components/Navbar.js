<<<<<<< HEAD
"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Logo from "../data/images/logo.svg";
import Hand from "../data/images/Hand.svg";
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
          <span className="text-main semi">مرحباً بك</span>
          <Image alt="hand" src={Hand} className="w-5 mb-1 wave-animation" />
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
        href="https://wa.me/96171708103"
        className="flex gap-2 items-center"
      >
        <FaWhatsapp />
        <span className="text-main semi">مجموعة الواتساب</span>
      </Link>
    </nav>
  );
};

export default Navbar;
=======
"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Logo from "../data/images/logo.svg";
import Hand from "../data/images/Hand.svg";
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
          <span className="text-main semi">مرحباً بك</span>
          <Image alt="hand" src={Hand} className="w-5 mb-1 wave-animation" />
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
        href="https://wa.me/96171708103"
        className="flex gap-2 items-center"
      >
        <FaWhatsapp />
        <span className="text-main semi">مجموعة الواتساب</span>
      </Link>
    </nav>
  );
};

export default Navbar;
>>>>>>> e8a0b93e4ade8906b6713cf98a567d34cb64f685
