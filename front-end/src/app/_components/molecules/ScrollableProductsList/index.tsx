import ProductCardVertical from "../../atoms/ProductCardVertical";
import productsData from "../../../../../../products.json";
import { useRecommendationsContext } from "@/providers/RecommendationsProvider";

const ScrollableProductsList = () => {
  const productRecommendations = useRecommendationsContext();

  // Map each product name in the productRecommendations string array to the product objects
  // The productsData will have a corresponding product with the same "productName"
  // ex. ["MacBook Pro 16", "Apple Watch Series 9", "Pixel 9 Pro"]
  const matchedProducts = productRecommendations.map((productName) => {
    return productsData.products.find(
      (product) => product.productName === productName
    );
  });

  return (
    <section className="flex flex-row py-8 overflow-auto overflow-y-hidden">
      <div className="flex flex-row space-x-5">
        {matchedProducts?.map((prod, index) => {
          return (
            <div key={index}>
              {prod && (
                <ProductCardVertical
                  key={prod.productId}
                  productId={prod.productId}
                  productName={prod.productName}
                  productImage={prod.productImage}
                  productBrand={prod.productBrand}
                  starRating={prod.starRating}
                  amountSold={prod.amountSold}
                  salePrice={prod.normalPrice}
                  actualPrice={prod.salePrice}
                  index={index}
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ScrollableProductsList;
