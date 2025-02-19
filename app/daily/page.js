import React from "react";
import Image from "next/image";
import Ribbon from "../data/images/Ribbon.svg";
import Lattern from "../data/images/latterns.png";
// Reusable Checkbox Component
const Checkbox = ({ label }) => (
  <label className="flex items-center gap-2 text-sm">
    <input type="checkbox" className="custom-checkbox" />
    {label}
  </label>
);

// Checkbox Data
const checkboxes = [
  "صلاة الفجر",
  "صلاة الظهر",
  "صلاة العصر",
  "صلاة المغرب",
  "صلاة العشاء",
  "الورد القرآني",
  "صيامي",
  "زرع الفَسيلة",
  "الصلاة على النّبي",
];

const Page = () => {
  return (
    <>
      <div className="absolute top-0 left-0 z-10">
        <Image src={Lattern} width={60} height={85} alt="lattern" />
      </div>
      <div className="absolute top-0 right-0 z-10">
        <Image src={Lattern} width={60} height={85} alt="lattern" />
      </div>
      <div
        dir="rtl"
        className="bg-white relative flex flex-col items-center w-full py-6"
      >
        <h1 className="text-xl bold text-main mb-2">
          تحدّي مأرَب - يوميّات قائِد المُستقبَل
        </h1>
        <p className="text-sm text-secondary regular text-center mb-4 w-[65%]">
          لا توجد خطوة عملاقة تصل بك إلى ما تريد, إنما يحتاج الأمر إلى الكثير من
          الخطوات الصغيرة لتبلغ ما تريد
        </p>
        <div className="relative flex justify-center items-center w-full mb-6">
          <Image src={Ribbon} alt="Ribbon" className="w-[40%] max-w-lg" />
          <span className="absolute text-white semi">الأوّل من رمضان</span>
        </div>

        <div className="flex justify-between items-end w-full px-6 mt-4 mb-2">
          <h3 className=" text-secondary semi text-lg"> عِباداتي اليوميّة</h3>
          <p className=" text-main bold text-sm">9 نقاط</p>
        </div>
        <div className="bg-[#f7f6f6] w-[90%] p-4">
          <div className="grid grid-cols-3 gap-4 w-full text-xl semi">
            {checkboxes.map((label, index) => (
              <Checkbox key={index} label={label} />
            ))}
          </div>
        </div>
        <div className="flex justify-between items-end w-full px-6 mt-4 mb-2">
          <h3 className=" text-secondary semi text-lg">الورد الحديثي</h3>
          <p className=" text-main bold text-sm">نقطتين</p>
        </div>

        <div className="bg-[#f7f6f6] w-[90%] p-4">
          <p className="bold text-main text-lg text-right">
            {" "}
            قَالَ النَّبِيُّ صلى الله عليه وسلم : ”مَن صامَ رَمَضانَ إيمانًا
            واحْتِسابًا غُفِرَ له ما تَقَدَّمَ مِن ذَنْبِهِ.“{" "}
          </p>
        </div>
        <div className="flex justify-between items-end w-full px-6 mt-4 mb-2">
          <h3 className=" text-secondary semi text-lg"> تفسير اليوم</h3>
          <p className=" text-main bold text-sm">نقطتين</p>
        </div>

        <div className="bg-[#f7f6f6] w-[90%] p-4">
          <p className="bold text-main text-lg text-right">
            مَن هُم ﴿الْمَغْضُوبِ عَلَيْهِم﴾ و ﴿الضَّالِّينَ﴾ المذكورين في سورة
            الفاتحة؟
          </p>
          <p className="semi text-main text-right mt-2">
            الْمَغْضُوبِ عَلَيْهِم: هم اليَهود. والضَّالِّينَ: هم النَصارى.
          </p>
        </div>
        <div className="flex justify-between items-end w-full px-6 mt-4 mb-2">
          <h3 className=" text-secondary semi text-lg"> شاركنا مشاعرك اليوم</h3>
          <p className=" text-main bold text-sm">نقطتين</p>
        </div>

        <div className="bg-[#f7f6f6] w-[90%] p-4">
          <textarea
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
            rows="5"
            placeholder="ما الذي أسعدك، أحزنك، أو أزعجك اليوم؟"
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default Page;
