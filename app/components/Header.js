import React from "react";
import Lattern from "../data/images/latterns.png";
import Image from "next/image";
const Header = () => {
  return (
    <>
      <div className="absolute top-0 left-0 z-10">
        <Image src={Lattern} width={55} height={77} alt="lattern" />
      </div>
      <div className="absolute top-0 right-0 z-10">
        <Image src={Lattern} width={55} height={77} alt="lattern" />
      </div>
    </>
  );
};

export default Header;
