"use client";
import { removeFromCart } from "@/features/products-tracker/productTrackerSlice";
import { State } from "@/types/store-types";
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const CartPage = () => {
  const cartData = useSelector((state: State) => state.cart);

  const dispatch = useDispatch();

  const removeFromCartHandler = (e, productId: number) => {
    e.preventDefault();

    dispatch(removeFromCart({ productId }));
  };

  return (
    <div>
      {cartData.map((product) => (
        <div key={product.productId}>
          <h3>{product.productName}</h3>
          <button onClick={(e) => removeFromCartHandler(e, product.productId)}>
            <Trash2 />
          </button>
        </div>
      ))}
    </div>
  );
};

export default CartPage;
