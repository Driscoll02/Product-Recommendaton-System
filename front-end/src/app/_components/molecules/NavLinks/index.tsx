type TNavOptions = {
  name: string;
  href: string;
}[];

const NavLinks = () => {
  const navOptions: TNavOptions = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Todays Deals",
      href: "/deals",
    },
    {
      name: "Trending",
      href: "/trending",
    },
  ];

  return (
    <nav>
      <ul className="flex justify-center">
        {navOptions.map((option, optionIdx) => (
          <li key={optionIdx} className="px-8 py-2">
            <a href={option.href}>{option.name}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavLinks;
