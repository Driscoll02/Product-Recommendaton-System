import Logo from "../../atoms/Logo";
import NavLinks from "../../molecules/NavLinks";

const Header = () => {
  return (
    <header className="shadow-sm">
      <div id="top-header" className="flex justify-between my-6">
        <Logo />
        <div>Search bar</div>
        <div>Right elements</div>
      </div>
      <NavLinks />
    </header>
  );
};

export default Header;
