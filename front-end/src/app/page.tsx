import Hero from "./_components/organisms/Hero";
import ScrollableProducts from "./_components/organisms/ScrollableProducts";
import TopCategories from "./_components/organisms/TopCategories";

export default function Home() {
  return (
    <div>
      <Hero />
      <TopCategories />
      <ScrollableProducts groupTitle="Trending Products" />
    </div>
  );
}
