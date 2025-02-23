"use client";
import { Heart, ShoppingCart, User } from "lucide-react";
import Logo from "../../atoms/Logo";
import NavLinks from "../../molecules/NavLinks";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { State } from "@/types/store-types";
import SearchBar from "../../molecules/SearchBar";

const Header = () => {
  const router = useRouter();

  const cartItems = useSelector((state: State) => state.cart);
  const likedProducts = useSelector((state: State) => state.likedProducts);

  const totalCartCost = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.actualPrice); // Convert string to number
    return sum + (isNaN(price) ? 0 : price); // Add price to sum, default to 0 if NaN
  }, 0);

  return (
    <header>
      <div className="grid grid-cols-[1fr,2fr,1fr] my-6 mx-40">
        <button
          className="flex justify-start items-center"
          onClick={() => router.push("/")}
        >
          <Logo />
        </button>
        <div className="place-content-center">
          <SearchBar />
        </div>
        {/* Right Elements */}
        <div className="flex justify-end items-center space-x-8">
          <button className="flex items-center space-x-2">
            <User width={"30px"} height={"30px"} />
            <div className="flex flex-col">
              <span className="text-xs text-left">Signed in as</span>
              <span className="text-md font-bold text-left">Joseph</span>
            </div>
          </button>
          <button
            className="relative py-1 px-1"
            onClick={() => router.push("/liked-products")}
          >
            <Heart width={"30px"} height={"30px"} />
            <span
              className="bg-orange-600 rounded-full text-white px-1 text-xs absolute top-0"
              style={{ left: 25 }}
            >
              {likedProducts.length}
            </span>
          </button>

          <button
            className="flex relative items-center space-x-4"
            onClick={() => router.push("/cart")}
          >
            <ShoppingCart width={"30px"} height={"30px"} />
            <span
              className="bg-orange-600 rounded-full text-white px-1 text-xs absolute top-0"
              style={{ left: 5 }}
            >
              {cartItems.length}
            </span>
            <div className="text-left">
              <p className="text-xs">Total</p>
              <p className="font-bold">£{totalCartCost.toLocaleString()}</p>
            </div>
          </button>
        </div>
      </div>
      <NavLinks />
    </header>
  );
};

export default Header;
