import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const Hero = () => {
  return (
    <div className="flex w-full rounded-xl bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 h-fit">
      <div className="flex flex-col w-1/4 xl:w-1/6 mx-12 xl:mx-24 my-16 xl:my-20 text-white text-3xl xl:text-5xl space-y-6 xl:space-y-8">
        <h2 className="font-bold">Halloween Sale</h2>
        <span className="text-2xl xl:text-3xl">Offer 2024</span>
        <span className="text-5xl xl:text-7xl font-extrabold">40% OFF</span>
        <Button className="mt-8 xl:mt-10 bg-white text-red-600 px-6 py-3 rounded-lg hover:bg-red-50 transition-all duration-300 flex items-center space-x-3">
          <ShoppingCart className="w-5 h-5" />
          <span>Shop Now</span>
        </Button>
      </div>

      {/* Image container */}
      <div className="flex justify-center items-center w-3/4 xl:w-5/6">
        <Image
          src={"/images/hero-watches.png"}
          alt="Three apple watches"
          width={400} // Default width for smaller screens
          height={400} // Default height for smaller screens
          className="object-contain sm:w-[500px] sm:h-[500px] lg:w-[650px] lg:h-[650px] xl:w-[700px] xl:h-[700px]" // Dynamic width/height
        />
      </div>
    </div>
  );
};

export default Hero;
