import React from "react";

const Main = () => {
  return (
    <>
      {/* <div
        className={`${
          isCountdownActive ? "opacity-40 blur-md" : "opacity-100"
        } transition-all duration-500`}
      > */}
      <div className="opacity-100 transition-all duration-500">
        <div className="w-full h-auto mt-4">
          {/* <Image src={Banner} alt="Banner" className="px-2" /> */}
        </div>

        <div className="max-w-4xl mx-auto pt-2 px-6 text-center">
          <h2 className="text-xl md:text-2xl semi text-secondary mt-6">
            ما هو تحدي مأرَب؟
          </h2>
          <p dir="rtl" className="text-main regular mt-2 text-xl">
            تحدي رمضاني يهدف إلى تنظيم الوقت وزيادة الفعالية خلال شهر رمضان
            المبارك.
          </p>
        </div>
      </div>
    </>
  );
};

export default Main;
