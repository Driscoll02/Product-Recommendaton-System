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
      <Hero />
      <div className="mx-40">
        <TopCategories />
        <RecommendationsProvider>
          <ScrollableProducts groupTitle="Recommended Products" />
        </RecommendationsProvider>
      </div>
    </div>
  );
}
