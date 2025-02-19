import Image from "next/image";
// import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { createContext, PropsWithChildren, ReactNode, useContext } from "react";

type THeroContext = {
  heroData: THeroData;
};

type THeroData = {
  title: string;
  description: string;
  cta1Text: string;
  cta2Text: string;
  imageData: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
};

type THeroProps = PropsWithChildren & {
  heroData: THeroData;
};

const HeroContext = createContext<THeroContext | undefined>(undefined);

const useHeroContext = () => {
  const heroData = useContext(HeroContext);

  if (!heroData) {
    throw new Error(
      "useHeroContext must be used inside a Hero Context Provider!"
    );
  }

  return heroData;
};

const Hero = ({ children, heroData }: THeroProps) => {
  return (
    <HeroContext.Provider value={{ heroData }}>
      <div className="bg-gradient-to-r from-orange-500 to-red-500 max-h-[70vh] flex flex-col md:flex-row px-6 md:px-24 py-20 md:py-40">
        {children}
      </div>
    </HeroContext.Provider>
  );
};

Hero.InformationWrapper = function InformationWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="w-full md:w-1/3 flex flex-col gap-5">{children}</div>;
};

Hero.Title = function HeroTitle() {
  const { heroData } = useHeroContext();

  return (
    <h1 className="text-white uppercase text-4xl md:text-7xl font-bold">
      {heroData.title}
    </h1>
  );
};

Hero.Description = function HeroDescription() {
  const { heroData } = useHeroContext();

  return (
    <p className="text-white mt-4 text-2xl md:text-4xl">
      {heroData.description}
    </p>
  );
};

Hero.CtaWrapper = function CtaWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center">
      {children}
    </div>
  );
};

Hero.HeroCta1 = function HeroCta1() {
  const { heroData } = useHeroContext();

  return (
    <button className="flex gap-3 justify-center items-center bg-black text-white px-6 md:px-10 py-3 md:py-4 rounded-full">
      {heroData.cta1Text} <ShoppingCart />
    </button>
  );
};

Hero.HeroCta2 = function HeroCta2() {
  const { heroData } = useHeroContext();

  return (
    <a
      href="#"
      className="flex mt-4 sm:mt-0 sm:ml-4 gap-2 text-white underline"
    >
      {heroData.cta2Text} <ArrowRight />
    </a>
  );
};

Hero.HeroImage = function HeroImage() {
  const { heroData } = useHeroContext();

  return (
    <div className="relative flex justify-center items-center m-auto w-full xl-custom:w-2/3 mt-10 xl-custom:mt-0 hidden xl-custom:flex">
      <Image
        alt={heroData.imageData.alt}
        className="object-cover rounded-lg"
        width={heroData.imageData.width}
        height={heroData.imageData.height}
        src={heroData.imageData.url}
      />
    </div>
  );
};

export default Hero;
