import React from "react";
import Image from "next/image";
import { challengesData } from "../data/challengesData";
import { FaArrowRight } from "react-icons/fa6";
import Header from "../components/Header";
import Logo from "../components/Logo";

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      <Header />

      <div className="flex flex-col justify-center items-center pt-8">
        <Logo />
        <h1 className="text-xl bold text-main mb-2">
          عائلَتي تحتَ كنفِ النُّبوة
        </h1>
        <p className="text-sm text-secondary regular text-center mb-4 w-[65%]">
          لنجعل البيـــت منارة إيمانيّة إشراقُها التحديات العائلية{" "}
        </p>
      </div>

      {/* Challenges List */}
      <div
        dir="rtl"
        className="flex flex-col gap-6 items-center justify-center p-4"
      >
        {challengesData.map((challenge) => (
          <div className="mt-2" key={challenge.id}>
            <h1 className="bold text-xl text-secondary mb-2">
              {" "}
              {challenge.number}
            </h1>
            <p className="semi text-sm text-main mb-4">{`تفتَح المُسابقة: ${challenge.openDate}`}</p>
            <div className="bg-[#f7f6f6] rounded-xs shadow-md w-full max-w-md text-center">
              <Image
                src={challenge.image}
                alt={challenge.title}
                width={400}
                height={150}
                className="rounded-xs"
              />
              <h2 className="text-lg bold text-main mt-3 px-4 ">
                {challenge.title}
              </h2>
              <p className="text-main regular text-sm mt-2 px-4">
                {challenge.description}
              </p>

              {/* Button - Disabled if challenge is locked */}
              <button
                disabled={challenge.isLocked}
                className={`semi py-2 px-4 mt-4 mb-3 rounded ${
                  challenge.isLocked
                    ? "bg-gray-200 text-main"
                    : "bg-main text-white flex gap-2 justify-center items-center"
                }`}
              >
                {challenge.isLocked ? (
                  "التحدّي مُقفل الآن"
                ) : (
                  <>
                    <FaArrowRight className="text-lg" /> الانتقال للتحدي
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
