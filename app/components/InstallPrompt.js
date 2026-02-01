"use client";
import React, { useState, useEffect } from "react";
import { FaDownload, FaTimes } from "react-icons/fa";

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 1. Check if the event was already fired and saved globally (see note below)
    if (window.deferredPrompt) {
      setDeferredPrompt(window.deferredPrompt);
      setIsVisible(true);
    }

    // 2. Listen for the event in case it happens while we are on this page
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      // Store it globally in case we unmount/remount
      window.deferredPrompt = e;
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show native prompt
    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
      setIsVisible(false); // Hide card after install
    }
    
    setDeferredPrompt(null);
    window.deferredPrompt = null;
  };

  if (!isVisible) return null;

  return (
    <div className="w-full bg-gradient-to-l from-main to-main/70 p-4 rounded-2xl shadow-lg mb-6 relative overflow-hidden text-white">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
      
      <div className="relative z-10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-3 rounded-full">
            <FaDownload className="text-white text-xl" />
          </div>
          <div className="text-right">
            <h4 className="bold text-sm mb-1">تنزيل التطبيق</h4>
            <p className="text-white/80 text-xs bold">
              تجربة أسرع وأفضل بدون إنترنت!
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
           {/* Install Button */}
          <button
            onClick={handleInstallClick}
            className="bg-secondary text-white text-sm font-bold px-4 py-2 rounded-lg shadow-sm hover:bg-secondary/90 transition whitespace-nowrap"
          >
            تثبيت الآن
          </button>
          
           {/* Dismiss Text */}
          {/* <button
            onClick={() => setIsVisible(false)}
            className="text-xs text-white/70 hover:text-white underline decoration-white/50"
          >
            ليس الآن
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;