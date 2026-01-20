import React from "react";
import NotFoundd from "../public/Images/Not-found.png";
import Image from "next/image";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <Image
        src={NotFoundd}
        alt="Not Found"
        className="w-64 h-64 object-contain"
      />
      <h1 className="text-2xl font-regular text-main mt-4"> لم يتم العثور على هذه الصفحة</h1>
    </div>
  );
};

export default NotFound;
