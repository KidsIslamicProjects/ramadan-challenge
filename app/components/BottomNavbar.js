"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiHome,
  HiAcademicCap,
  HiUser,
  HiRectangleStack,
} from "react-icons/hi2";

const BottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    { label: "الرئيسية", href: "/", icon: HiHome },
    { label: "المساقات", href: "/", icon: HiRectangleStack },
    { label: "غُرف التحديات", href: "/", icon: HiAcademicCap },
    { label: "حسابي", href: "/profile", icon: HiUser },
  ];

  return (
    // Outer Container: Centered, Floating, Rounded
    <div className="fixed bottom-6 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 transform">
      <div className="flex h-16 flex-row-reverse items-center justify-between rounded-full border border-gray-100 bg-white/95 px-4 shadow-xl backdrop-blur-md pb-safe">
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
              {/* Icon */}
              <Icon
                className={`mb-1 h-6 w-6 transition-transform duration-200 ${
                  isActive ? "-translate-y-1" : ""
                }`}
              />

              {/* Label */}
              <span className="text-xs font-medium md:text-sm">
                {item.label}
              </span>

              {/* Active Indicator Dot */}
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
