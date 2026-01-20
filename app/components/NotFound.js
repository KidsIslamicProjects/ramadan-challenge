import React from "react";
import NotFoundd from "../../public/Images/Not-found.png";
import Image from "next/image";

const NotFound = ({ content }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80%] ">
      <Image
        src={NotFoundd}
        alt="Not Found"
        className="w-64 h-64 object-contain"
      />
      <h1 className="text-xl font-regular text-main mt-4">{content} </h1>
    </div>
  );
};

export default NotFound;
