import React from "react";
import Image from "next/image";
import Logo2 from "../data/images/LogoWithNoSlugn.svg";
const Logo = () => {
  return (
    <div>
      <Image
        src={Logo2}
        width={50}
        height={50}
        alt="Logo"
        className="mb-2 mx-auto"
      />
    </div>
  );
};

export default Logo;
