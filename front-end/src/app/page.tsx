"use client";
import { ToastContainer } from "react-toastify";
import Hero from "./_components/organisms/Hero";
import ScrollableProducts from "./_components/organisms/ScrollableProducts";
import TopCategories from "./_components/organisms/TopCategories";
import "react-toastify/dist/ReactToastify.css";
import { RecommendationsProvider } from "@/providers/RecommendationsProvider";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div>
      <ToastContainer />
      <div className="bg-gradient-to-r from-orange-500 to-red-500 h-screen">
        <Hero
          heroData={{
            title: "CHRISTMAS SALE 2024. 🎄",
            description:
              "Up to 75% off selected products and massive discounts throughout",
            cta1Text: "Shop Now",
            cta2Text: "Contact Us",
            imageData: {
              url: "/images/applewatchherodisplay.png",
              width: 1000,
              height: 700,
              alt: "Apple Watch",
            },
          }}
        >
          <Hero.InformationWrapper>
            <Hero.Title />
            <Hero.Description />
            <Hero.CtaWrapper>
              <Hero.HeroCta1 />
              <Hero.HeroCta2 />
            </Hero.CtaWrapper>
          </Hero.InformationWrapper>
          <Hero.HeroImage />
        </Hero>
        <div className="relative">
          <div className="absolute w-full bg-white rounded-tl-[6rem] shadow-lg -top-12">
            {/* Content Section */}
            <div className="p-16">
              {/* Animate TopCategories */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  damping: 20,
                  stiffness: 100,
                  duration: 0.8,
                }}
              >
                <TopCategories />

                <RecommendationsProvider>
                  {[
                    "Recommended Products",
                    "Trending Products",
                    "Laptops",
                    "PC Parts",
                  ].map((groupTitle, index) => (
                    <motion.div
                      key={groupTitle} // Ensure each is uniquely keyed
                      variants={{
                        hidden: { opacity: 0, y: 50 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      initial="hidden"
                      animate="visible"
                      transition={{
                        type: "spring",
                        damping: 20,
                        stiffness: 100,
                        duration: 0.8,
                        delay: index * 0.8, // Delay each ScrollableProducts by 0.8s
                      }}
                    >
                      <ScrollableProducts groupTitle={groupTitle} />
                    </motion.div>
                  ))}
                </RecommendationsProvider>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
