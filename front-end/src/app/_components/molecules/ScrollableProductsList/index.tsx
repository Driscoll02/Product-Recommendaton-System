import ProductCardVertical from "../../atoms/ProductCardVertical";
import productsData from "../../../../../../products.json";
import { useRecommendationsContext } from "@/providers/RecommendationsProvider";

const ScrollableProductsList = () => {
  const productRecommendations = useRecommendationsContext();

  console.log(productRecommendations);

  // Map each product name in the productRecommendations string array to the product objects
  // The productsData will have a corresponding product with the same "productName"
  // ex. ["MacBook Pro 16", "Apple Watch Series 9", "Pixel 9 Pro"]
  const matchedProducts = productRecommendations.map((productName) => {
    return productsData.products.find(
      (product) => product.productName === productName
    );
  });

  console.log({ matchedProducts });

  return (
    <section className=" flex flex-row py-8 overflow-auto">
      <div className="flex flex-row space-x-5">
        {matchedProducts?.map((prod) => (
          <>
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
              />
            )}
          </>
        ))}
      </div>
    </section>
  );
};

export default ScrollableProductsList;
