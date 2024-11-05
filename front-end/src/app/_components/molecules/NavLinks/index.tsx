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
      <ul className="flex justify-center">
        {navOptions.map((option, optionIdx) => (
          <li key={optionIdx} className="px-8 py-2">
            <button onClick={() => router.push("/")}>{option.name}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavLinks;
