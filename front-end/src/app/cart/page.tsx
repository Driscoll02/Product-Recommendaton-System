"use client";
import { removeFromCart } from "@/features/products-tracker/productTrackerSlice";
import { State } from "@/types/store-types";
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

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
    <div>
      {cartData.map((product) => (
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
  );
};

export default CartPage;
