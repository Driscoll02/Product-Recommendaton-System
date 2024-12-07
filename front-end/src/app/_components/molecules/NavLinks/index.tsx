"use client";
import { useRouter } from "next/navigation";

type TNavOptions = {
  name: string;
}[];

const NavLinks = () => {
  const navOptions: TNavOptions = [
    {
      name: "Home",
    },
    {
      name: "Todays Deals",
    },
    {
      name: "Trending",
    },
  ];

  const router = useRouter();

  return (
    <nav>
      <ul className="flex justify-center space-x-8">
        {navOptions.map((option, optionIdx) => (
          <li key={optionIdx} className="px-4 py-2">
            <button
              onClick={() => router.push("/")}
              className="text-lg font-semibold text-gray-800 hover:text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 transition-all duration-300 px-4 py-2 rounded-md focus:outline-none"
            >
              {option.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavLinks;
