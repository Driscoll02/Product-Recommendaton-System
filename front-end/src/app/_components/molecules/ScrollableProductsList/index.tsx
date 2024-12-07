import { motion, useInView } from "framer-motion";
import ProductCardVertical from "../../atoms/ProductCardVertical";
import productsData from "../../../../../../products.json";
import { useRecommendationsContext } from "@/providers/RecommendationsProvider";
import { useRef } from "react";

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
    <section className="flex flex-row py-8 overflow-auto overflow-y-hidden">
      <div className="flex flex-row space-x-5">
        {matchedProducts?.map((prod, index) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const ref = useRef(null); // Create a ref for this specific product
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const isInView = useInView(ref, { once: true }); // Track visibility

          return (
            <>
              {prod && (
                <motion.div
                  ref={ref} // Assign the unique ref to this element
                  key={prod.productId}
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
                </motion.div>
              )}
            </>
          );
        })}
      </div>
    </section>
  );
};

export default ScrollableProductsList;
