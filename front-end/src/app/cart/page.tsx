"use client";
import { removeFromCart } from "@/features/products-tracker/productTrackerSlice";
import { State } from "@/types/store-types";
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import ScrollableProductsList from "../_components/molecules/ScrollableProductsList";

const CartPage = () => {
  const cartData = useSelector((state: State) => state.cart);

  const dispatch = useDispatch();

  console.log(cartData);

  const removeFromCartHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    cartProductId: string
  ) => {
    e.preventDefault();

    dispatch(removeFromCart({ cartProductId }));
  };

  return (
    <div className="flex items-center justify-center my-20">
      <div className="container flex items-center justify-center my-20">
        {cartData.length === 0 && (
          <div>
            <h2 className="font-bold text-xl text-center">
              There are no items in your cart.
            </h2>

            <div className="my-40 font-bold">
              <h3>Here are some products we&apos;d recommend:</h3>
              <ScrollableProductsList />
            </div>
          </div>
        )}
        {cartData &&
          cartData.map((product) => (
            <div key={product.cartProductId}>
              <h3>{product.productName}</h3>
              <button
                onClick={(e) => removeFromCartHandler(e, product.cartProductId)}
              >
                <Trash2 />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CartPage;
