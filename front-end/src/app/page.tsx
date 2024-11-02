import { ToastContainer } from "react-toastify";
import Hero from "./_components/organisms/Hero";
import ScrollableProducts from "./_components/organisms/ScrollableProducts";
import TopCategories from "./_components/organisms/TopCategories";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <div>
      <ToastContainer />
      <Hero />
      <TopCategories />
      <ScrollableProducts groupTitle="Trending Products" />
    </div>
  );
}
