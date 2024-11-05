import { TProductData } from "@/types/main";
import ProductCardVertical from "../../atoms/ProductCardVertical";

const ScrollableProductsList = () => {
  const products: TProductData[] = [
    {
      productId: 1,
      productName: "Apple Watch",
      productImage: "/images/apple-watch.png",
      productBrand: "Apple",
      starRating: 4.3,
      amountSold: 12462,
      salePrice: "249.99",
      actualPrice: "210.99",
    },
    {
      productId: 2,
      productName: "Raspberry Pi 4",
      productImage: "/images/raspberry-pi-4.png",
      productBrand: "Raspberry Pi",
      starRating: 4.7,
      amountSold: 3467,
      salePrice: "79.99",
      actualPrice: "59.99",
    },
    {
      productId: 3,
      productName: "Iphone 16",
      productImage: "/images/iphone16.png",
      productBrand: "Apple",
      starRating: 4.1,
      amountSold: 11321,
      salePrice: "1349.99",
      actualPrice: "1249.99",
    },
  ];

  return (
    <section className="container flex flex-row py-8">
      <div className="flex flex-row space-x-5">
        {products.map((prod) => (
          <ProductCardVertical
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
        ))}
      </div>
    </section>
  );
};

export default ScrollableProductsList;
