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
        <Hero />
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
                        delay: index * 0.8, // Delay each ScrollableProducts by 0.5s
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
