import { TProductData } from "@/types/main";
import QuantitySelector from "../QuantitySelector";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { removeAllItemsOfTypeFromCart } from "@/features/products-tracker/productTrackerSlice";
import { useDispatch } from "react-redux";

const ProductCardCartHorizontal = ({
  productId,
  productName,
  productBrand,
  productImage,
}: TProductData) => {
  const dispatch = useDispatch();

  const removeFromCartHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    productToRemoveId: number
  ) => {
    e.preventDefault();

    dispatch(removeAllItemsOfTypeFromCart({ productId: productToRemoveId }));
  };

  return (
    <div className="relative grid grid-cols-5 shadow gap-10 p-8">
      <div className="rounded-md bg-slate-200">
        <Image
          className="h-44 w-44"
          src={productImage}
          alt={productName}
          width={168}
          height={168}
        />
      </div>
      <div className="space-y-1">
        <h3 className="font-semibold">{productName}</h3>
        <p>{productBrand}</p>
        <p className="text-lime-500">In Stock</p>
      </div>
      <div className="space-y-1">
        <p className="font-semibold">Each</p>
        <p className="font-semibold">£ 00.00</p>
      </div>
      <div className="space-y-1">
        <p className="font-semibold">Quantity</p>
        <div>
          <QuantitySelector />
        </div>
      </div>
      <div className="space-y-1">
        <p className="font-semibold text-right">Total</p>
        <p className="font-semibold text-right">£ 00.00</p>
      </div>
      <button
        className="absolute bottom-8 right-8"
        onClick={(e) => removeFromCartHandler(e, productId)}
      >
        <Trash2 stroke="crimson" />
      </button>
    </div>
  );
};

export default ProductCardCartHorizontal;
