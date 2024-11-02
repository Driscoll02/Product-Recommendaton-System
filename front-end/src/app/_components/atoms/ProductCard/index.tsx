"use client";
import { TProductCardData } from "@/types/main";
import Image from "next/image";
import { Heart, Plus, Star } from "lucide-react";
import { useState } from "react";

const ProductCard = ({
  productName,
  productImage,
  productBrand,
  starRating,
  amountSold,
  salePrice,
  actualPrice,
}: TProductCardData) => {
  const [isProductLiked, setIsProductLiked] = useState(false);

  return (
    <div className="flex flex-col shadow rounded-lg p-4 w-60 h-30 relative">
      <div className="relative rounded-md bg-slate-200">
        <button
          className="p-2 absolute left-2 top-2 bg-white rounded-[50px]"
          onClick={() => setIsProductLiked((prevState) => !prevState)}
        >
          <Heart {...(isProductLiked ? { fill: "red" } : {})} />
        </button>
        <div className="p-5">
          <Image
            alt="Apple Watch"
            className="h-44 w-44"
            width={168}
            height={168}
            src={productImage}
          />
        </div>
      </div>
      <div>
        <h3 className="font-bold pt-1 text-lg">{productName}</h3>
        <p className="py-1 text-gray-600">{productBrand}</p>
        <div className="flex space-x-2 py-2">
          <span className="flex font-bold">
            <Star fill="#E5A00D" stroke="none" />
            <span className="pl-2">{starRating}</span>
          </span>
          <span>|</span>
          <span className="bg-gray-200 px-2 rounded-lg font-semibold">
            {amountSold.toLocaleString()} Sold
          </span>
        </div>
        <div className="flex space-x-2 py-2 text-lg">
          <s>£{salePrice}</s>
          <p className="font-semibold">£{actualPrice}</p>
        </div>
        <div className="absolute bottom-4 right-4 bg-black rounded-[50px] p-2 w-auto">
          <Plus stroke="white" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
