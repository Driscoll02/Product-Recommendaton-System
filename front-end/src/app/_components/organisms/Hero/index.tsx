import Image from "next/image";
// import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 max-h-[70vh] flex flex-col md:flex-row px-6 md:px-24 py-20 md:py-40">
      {/* Text Content */}
      <div className="w-full md:w-1/3 flex flex-col gap-5">
        <h1 className="text-white uppercase text-4xl md:text-7xl font-bold">
          CHRISTMAS SALE 2024. 🎄
        </h1>
        <p className="text-white mt-4 text-2xl md:text-4xl">
          Up to 75% off selected products and massive discounts throughout
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center">
          <button className="flex gap-3 justify-center items-center bg-black text-white px-6 md:px-10 py-3 md:py-4 rounded-full">
            Shop Now <ShoppingCart />
          </button>
          <a
            href="#"
            className="flex mt-4 sm:mt-0 sm:ml-4 gap-2 text-white underline"
          >
            Contact Us <ArrowRight />
          </a>
        </div>
      </div>

      {/* Image */}
      <div className="relative flex justify-center items-center m-auto w-full xl-custom:w-2/3 mt-10 xl-custom:mt-0 hidden xl-custom:flex">
        <Image
          alt="Apple Watch"
          className="object-cover rounded-lg"
          width={1000}
          height={700}
          src="/images/applewatchherodisplay.png"
        />
      </div>
    </div>
  );
};

export default Hero;
