"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiHome,
  HiAcademicCap,
  HiUser,
  HiRectangleStack,
  HiSquares2X2,
} from "react-icons/hi2";

const BottomNav = () => {
  const pathname = usePathname();
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check local storage safely on the client side
    // Adjust "user" or "userRole" based on how you save it in Login
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setIsLoggedIn(true);
      const user = JSON.parse(userStr);
      setUserRole(user.role); // Assuming your user object has a 'role' property
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
    }
  }, []);

  // Define the last item conditionally
  const profileOrDashboardItem =
    isLoggedIn && userRole === "supervisor"
      ? {
          label: "لوحتي",
          href: "/dashboard/students",
          icon: HiSquares2X2,
        }
      : { label: "حسابي", href: "/profile", icon: HiUser };

  const navItems = [
    { label: "الرئيسية", href: "/", icon: HiHome },
    { label: "المساقات", href: "/courses", icon: HiRectangleStack },
    { label: " التحديات", href: "/rooms", icon: HiAcademicCap },
    profileOrDashboardItem,
  ];

  return (
    <div
      dir="rtl"
      className="fixed regular bottom-6 left-1/2 z-50 w-[90%] max-w-lg -translate-x-1/2 transform"
    >
      <div className="flex h-16 flex-row items-center justify-between rounded-full border border-gray-100 bg-white/95 px-4 shadow-xl backdrop-blur-md pb-safe">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative flex flex-col items-center justify-center p-2 transition-colors duration-200
                ${
                  isActive
                    ? "text-[#86977D]"
                    : "text-gray-400 hover:text-gray-600"
                }
              `}
            >
              <Icon
                className={`mb-1 w-5 h-5 md:h-6 md:w-6 transition-transform duration-200 ${
                  isActive ? "-translate-y-1" : ""
                }`}
              />
              <span className="text-xs regular w-full md:text-sm">
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 h-1 w-1 rounded-full bg-[#86977D]"></span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
