"use client";
import { State } from "@/types/store-types";
import { useSelector } from "react-redux";
import ScrollableProductsList from "../_components/molecules/ScrollableProductsList";
import ProductCardCartHorizontal from "../_components/atoms/ProductCardCartHorizontal";
import { RecommendationsProvider } from "@/providers/RecommendationsProvider";

const CartPage = () => {
  const cartData = useSelector((state: State) => state.cart);

  console.log(cartData);

  return (
    <div className="flex items-center justify-center my-20">
      <div className="container flex items-center justify-center my-20 flex-col">
        {cartData.length === 0 && (
          <div>
            <h2 className="font-bold text-xl text-center">
              There are no items in your cart.
            </h2>

            <div className="my-40 font-bold">
              <h3>Here are some products we&apos;d recommend:</h3>
              <RecommendationsProvider>
                <ScrollableProductsList />
              </RecommendationsProvider>
            </div>
          </div>
        )}
        {cartData &&
          cartData.map((prod) => (
            <div key={prod.cartProductId} className="w-3/4">
              <ProductCardCartHorizontal
                key={prod.productId}
                productId={prod.productId}
                productName={prod.productName}
                productImage={prod.productImage}
                productBrand={prod.productBrand}
                starRating={prod.starRating}
                amountSold={prod.amountSold}
                salePrice={prod.salePrice}
                actualPrice={prod.actualPrice}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CartPage;
