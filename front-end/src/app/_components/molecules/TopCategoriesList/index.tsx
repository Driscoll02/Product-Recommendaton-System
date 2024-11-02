import {
  BicepsFlexed,
  Binary,
  BookOpen,
  Bot,
  Computer,
  Cpu,
  FolderCode,
  Home,
  Keyboard,
  Laptop,
  Microchip,
  Mouse,
  Watch,
} from "lucide-react";
import TopCategoryItem from "../../atoms/TopCategoryItem";

export type TTopCategoryItems = {
  categoryName: string;
  categoryIcon: React.ReactNode;
}[];

const TopCategoriesList = () => {
  const topCategoryItems: TTopCategoryItems = [
    {
      categoryName: "Home",
      categoryIcon: <Home />,
    },
    {
      categoryName: "Laptops",
      categoryIcon: <Laptop />,
    },
    {
      categoryName: "Computers",
      categoryIcon: <Computer />,
    },
    {
      categoryName: "Watches",
      categoryIcon: <Watch />,
    },
    {
      categoryName: "Sport",
      categoryIcon: <BicepsFlexed />,
    },
    {
      categoryName: "Pen-Testing",
      categoryIcon: <Binary />,
    },
    {
      categoryName: "Software",
      categoryIcon: <FolderCode />,
    },
    {
      categoryName: "Raspberry Pi's",
      categoryIcon: <Cpu />,
    },
    {
      categoryName: "GPU's",
      categoryIcon: <Microchip />,
    },
    {
      categoryName: "Keyboards",
      categoryIcon: <Keyboard />,
    },
    {
      categoryName: "Mice",
      categoryIcon: <Mouse />,
    },
    {
      categoryName: "AI Models",
      categoryIcon: <Bot />,
    },
    {
      categoryName: "Courses",
      categoryIcon: <BookOpen />,
    },
  ];

  return (
    <div className="flex mt-6 overflow-x-auto scrollbar-thin">
      {topCategoryItems.map((item: TTopCategoryItems[number], idx) => (
        <TopCategoryItem
          key={idx}
          itemName={item.categoryName}
          itemIcon={item.categoryIcon}
        />
      ))}
    </div>
  );
};

export default TopCategoriesList;
