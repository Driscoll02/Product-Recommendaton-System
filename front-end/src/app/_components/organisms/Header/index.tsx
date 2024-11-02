"use client";
import { Heart, ShoppingCart, User } from "lucide-react";
import Logo from "../../atoms/Logo";
import NavLinks from "../../molecules/NavLinks";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { State } from "@/types/store-types";

const Header = () => {
  const router = useRouter();

  const numOfItemsInCart = useSelector((state: State) => state.cart).length;

  return (
    <header className="shadow-sm">
      <div id="top-header" className="flex items-center justify-between my-6">
        <button onClick={() => router.push("/")}>
          <Logo />
        </button>
        <div>Search bar</div>
        {/* Right Elements */}
        <div className="flex justify-start space-x-8">
          <button className="flex items-center space-x-2">
            <User width={"30px"} height={"30px"} />
            <div className="flex flex-col">
              <span className="text-xs text-left">Signed in as</span>
              <span className="text-md font-bold text-left">Joseph</span>
            </div>
          </button>
          <button className="relative py-1 px-1">
            <Heart width={"30px"} height={"30px"} />
            <span
              className="bg-red-600 rounded-full text-white px-1 text-xs absolute top-0"
              style={{ left: 25 }}
            >
              0
            </span>
          </button>

          <button
            className="flex relative items-center space-x-4"
            onClick={() => router.push("/cart")}
          >
            <ShoppingCart width={"30px"} height={"30px"} />
            <span
              className="bg-red-600 rounded-full text-white px-1 text-xs absolute top-0"
              style={{ left: 5 }}
            >
              {numOfItemsInCart}
            </span>
            <div className="text-left">
              <p className="text-xs">Total</p>
              <p className="font-bold">£0.00</p>
            </div>
          </button>
        </div>
      </div>
      <NavLinks />
    </header>
  );
};

export default Header;
