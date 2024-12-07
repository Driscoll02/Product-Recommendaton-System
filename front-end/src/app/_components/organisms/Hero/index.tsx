import Image from "next/image";
// import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";

const Hero = () => {
  return (
    <div className="bg-gradient-to-r flex from-orange-500 px-24 to-red-500 py-40">
      <div className="w-1/3 flex flex-col gap-5">
        <h1 className="text-white uppercase text-7xl font-bold">
          CHRISTMAS SALE 2024. 🎄
        </h1>
        <p className="text-white mt-4 text-4xl">
          Up to 75% off selected products and massive discounts throughout
        </p>
        <div className="mt-6 flex items-center">
          <button className="flex gap-3 justify-center items-center bg-black text-white px-10 py-4 rounded-full">
            Shop Now <ShoppingCart />
          </button>
          <a href="#" className="flex ml-4 gap-2 text-white underline">
            Contact Us
            <ArrowRight />
          </a>
        </div>
      </div>
      <div className="relative">
        <Image
          alt={"Apple Watch"}
          className="h-44 w-44 p-4"
          width={168}
          height={168}
          src={"/images/transparentHeroAppleWatches.png"}
        />
      </div>
    </div>
  );
};

export default Hero;
