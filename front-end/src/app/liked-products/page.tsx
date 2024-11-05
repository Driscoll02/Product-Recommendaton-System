"use client";
import { removeFromLikedProducts } from "@/features/products-tracker/productTrackerSlice";
import { State } from "@/types/store-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ScrollableProductsList from "../_components/molecules/ScrollableProductsList";
import { Trash2 } from "lucide-react";

const LikedProductsPage = () => {
  const likedProductsData = useSelector((state: State) => state.likedProducts);

  const dispatch = useDispatch();

  const removeLikedProductHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    productId: number
  ) => {
    e.preventDefault();

    dispatch(removeFromLikedProducts({ productId }));
  };

  return (
    <div className="flex items-center justify-center my-20">
      <div className="container flex items-center justify-center my-20">
        {likedProductsData.length === 0 && (
          <div>
            <h2 className="font-bold text-xl text-center">
              You have not liked any products.
            </h2>

            <div className="my-40 font-bold">
              <h3>Here are some products we&apos;d recommend:</h3>
              <ScrollableProductsList />
            </div>
          </div>
        )}
        {likedProductsData &&
          likedProductsData.map((product) => (
            <div key={product.likedProductId}>
              <h3>{product.productName}</h3>
              <button
                onClick={(e) => removeLikedProductHandler(e, product.productId)}
              >
                <Trash2 />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LikedProductsPage;
