import React from "react";
import NotFoundd from "../../public/Images/Not-found.png";
import Image from "next/image";

const NotFound = ({ content }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh]">
      <Image
        src={NotFoundd}
        alt="Not Found"
        className="w-64 h-64 object-contain"
      />
      <h1 className="text-2xl font-regular text-main mt-4">{content} </h1>
    </div>
  );
};

export default NotFound;
