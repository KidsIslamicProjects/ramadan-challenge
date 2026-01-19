"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// Importing icons from Heroicons (clean & minimal)
import {
  HiHome,
  HiAcademicCap,
  HiBookOpen,
  HiUser,
  HiRectangleStack,
} from "react-icons/hi2";

const BottomNav = () => {
  const pathname = usePathname();

  // Navigation Items Configuration
  const navItems = [
    {
      label: "الرئيسية", // Home
      href: "/",
      icon: HiHome,
    },
    {
      label: "المساقات", // Courses/Tracks
      href: "/courses",
      icon: HiRectangleStack,
    },
    {
      label: "العقيدة", // Creed
      href: "/aqidah",
      icon: HiBookOpen,
    },
    {
      label: "المكتبة", // Placeholder 1 (Library)
      href: "/library",
      icon: HiAcademicCap,
    },
    {
      label: "حسابي", // Placeholder 2 (My Account)
      href: "/profile",
      icon: HiUser,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-100 pb-safe">
      <div className="h-full max-w-lg mx-auto font-medium flex flex-row-reverse items-center justify-content">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group transition-colors duration-200
                ${
                  isActive
                    ? "text-[#86977D]"
                    : "text-gray-400 hover:text-gray-600"
                }
              `}
            >
              {/* Icon */}
              <Icon
                className={`w-6 h-6 mb-1 transition-transform duration-200 ${
                  isActive ? "-translate-y-1" : ""
                }`}
              />

              {/* Label */}
              <span className="text-[10px] md:text-xs">{item.label}</span>

              {/* Active Indicator Dot (Optional - adds a nice minimal touch) */}
              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 bg-[#86977D] rounded-full"></span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
