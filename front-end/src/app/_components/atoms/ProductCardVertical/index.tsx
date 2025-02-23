"use client";
import { TProductData } from "@/types/main";
import Image from "next/image";
import { Heart, Plus, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  addToLikedProducts,
  removeFromLikedProducts,
} from "@/features/products-tracker/productTrackerSlice";
import { State } from "@/types/store-types";
import { motion, useInView } from "framer-motion";

const ProductCardVertical = ({
  productId,
  productName,
  productImage,
  productBrand,
  starRating,
  amountSold,
  salePrice,
  actualPrice,
  index,
}: TProductData & { index: number }) => {
  const likedProductData = useSelector((state: State) => state.likedProducts);
  const isCurrentRenderedProductLiked = likedProductData.find(
    (prod) => prod.productId === productId
  );

  const [isProductLiked, setIsProductLiked] = useState(
    isCurrentRenderedProductLiked ? true : false
  );

  const dispatch = useDispatch();

  const addToCartHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    toast.success("🛒 Item added to cart.", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

    dispatch(
      addToCart({
        productId,
        productName,
        productImage,
        productBrand,
        starRating,
        amountSold,
        salePrice,
        actualPrice,
      })
    );
  };

  const likeProductHandler = () => {
    if (isProductLiked) {
      dispatch(
        addToLikedProducts({
          productId,
          productName,
          productImage,
          productBrand,
          starRating,
          amountSold,
          salePrice,
          actualPrice,
        })
      );
      return;
    }

    dispatch(
      removeFromLikedProducts({
        productId,
      })
    );
  };

  useEffect(() => {
    likeProductHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isProductLiked]);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}} // Trigger animation if visible
      transition={{
        type: "spring",
        damping: 6,
        stiffness: 120,
        duration: 0.8,
        delay: index * 0.1, // Stagger effect by index
      }}
    >
      <div className="flex flex-col shadow bg-slate-100 rounded-lg p-4 w-64 h-30 relative">
        <div className="relative rounded-md bg-slate-300">
          <button
            className="p-2 absolute left-2 top-2 bg-white rounded-[50px]"
            onClick={() => {
              setIsProductLiked((prevState) => !prevState);
            }}
          >
            <Heart {...(isProductLiked ? { fill: "red" } : {})} />
          </button>
          <div className="p-5">
            <Image
              alt={productName}
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
          <button
            className="absolute bottom-4 right-4 bg-black rounded-[50px] p-2 w-auto"
            onClick={(e) => addToCartHandler(e)}
          >
            <Plus stroke="white" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCardVertical;
