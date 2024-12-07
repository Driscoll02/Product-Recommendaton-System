"use client";
import { ToastContainer } from "react-toastify";
import Hero from "./_components/organisms/Hero";
import ScrollableProducts from "./_components/organisms/ScrollableProducts";
import TopCategories from "./_components/organisms/TopCategories";
import "react-toastify/dist/ReactToastify.css";
import { RecommendationsProvider } from "@/providers/RecommendationsProvider";

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
              <TopCategories />
              <RecommendationsProvider>
                <ScrollableProducts groupTitle="Recommended Products" />
              </RecommendationsProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
