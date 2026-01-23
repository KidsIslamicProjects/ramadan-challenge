"use client";
import React, { useState, useEffect } from "react";

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    // 1. Listen for the 'beforeinstallprompt' event (Android/Chrome)
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault(); // Prevent the mini-infobar from appearing on mobile
      setDeferredPrompt(e); // Save the event so we can trigger it later
      setShowInstallBanner(true); // Show our custom UI
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // 2. Show the native install prompt
    deferredPrompt.prompt();

    // 3. Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }

    // 4. Clear the prompt
    setDeferredPrompt(null);
    setShowInstallBanner(false);
  };

  if (!showInstallBanner) return null;

  return (
    <div
      className="fixed top-4 left-4 right-4 bg-white p-4 shadow-2xl rounded-lg border border-gray-200 z-50 flex items-center justify-between flex-col"
      dir="rtl"
    >
      <div className="text-right">
        <h4 className="text-main font-bold text-sm">تنزيل التطبيق</h4>
        <p className="text-gray-600 text-xs">
          احصل على تجربة أفضل وقم بتنزيل التطبيق الآن!
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setShowInstallBanner(false)}
          className="text-gray-400 text-xs hover:text-gray-600"
        >
          ليس الآن
        </button>
        <button
          onClick={handleInstallClick}
          className="bg-main text-white text-xs px-3 py-2 rounded shadow hover:bg-opacity-90 transition"
        >
          تثبيت
        </button>
      </div>
    </div>
  );
};

export default InstallPrompt;
