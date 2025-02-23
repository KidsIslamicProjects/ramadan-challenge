import React from "react";
import Soil from "../data/images/Soil.svg";
import Image from "next/image";
const page = () => {
  return (
    <div dir="rtl" className="min-h-screen bg-white p-6">
      <div className="flex flex-col gap-2 justify-center items-center">
        <p className="semi text-secondary">
          السلام عليكم ورحمة الله وبركاته، أهلاً بكم في
        </p>
        <h3 className="bold text-main text-xl">"بُســـتان خُضر "</h3>{" "}
        <p className="regular text-main text-center mt-4">
          في هذا التحدّي، يتوجّب عليك الاعتناء اليومي ببُستانِك الأخلاقيّ وتزرع
          فيه فسائل الخير والعطاء. مع كلَ مُهمّة تُنجزها، ستُزرَع فسبلة في
          بستانك تلقائيّاً.
        </p>
      </div>
      <div className="my-10 bg-[#f7f6f6] rounded-sm p-3">
        <h1 className="bold text-[#457804] text-center text-2xl">
          فسيلةُ اليَوم
        </h1>
        <p className="text-main semi text-lg mt-2 text-center">
          عانِق والدَيك عناقًا دافِئًا واطلب رِضاهم.
        </p>
      </div>
      <div className="flex justify-center items-center mt-20 gap-2">
        <input type="checkbox" className="custom-checkbox" />
        <h3 className="text-main semi text-lg">
          {" "}
          لقد أتمَمت الـمُهمّة الحمدلله
        </h3>{" "}
      </div>
      <button className="bg-[#457804] flex justify-center items-center w-[75%] text-white py-2 mt-12 semi text-lg rounded-sm sahdow mx-auto">
        ازرع الفَســــــــــيلة
      </button>
      <Image
        alt="soil"
        src={Soil}
        className="w-screen h-auto absolute bottom-0 left-0"
      />
    </div>
  );
};

export default page;
