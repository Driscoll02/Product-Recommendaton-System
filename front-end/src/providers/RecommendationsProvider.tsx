import { State } from "@/types/store-types";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

type TProviderProps = {
  children: React.ReactNode;
};

// Context will store an array of product names for recommendations
const RecommendationsContext = createContext<string[] | undefined>(undefined);

const RecommendationsProvider = ({ children }: TProviderProps) => {
  const [recommendations, setRecommendations] = useState<string[]>([]);

  const pathname = usePathname();

  const cartData = useSelector((state: State) => state.cart);

  useEffect(() => {
    const fetchRecommendations = async () => {
      // console.log({ cartData });

      console.log("Fetching data");

      // Get recommendations here by passing name of first item in cart
      // If cart is empty, default to IPhone 16
      const response = await fetch("http://localhost:8000/product-cosine-sim", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_name: cartData[0]?.productName ?? "IPhone 16",
        }),
      });

      // console.log(response.body);

      if (!response.ok)
        throw new Error(
          "Something went wrong with the request to cosine sim calc"
        );

      const responseJson = await response.json();
      // console.log({ responseJson });
      setRecommendations(responseJson.recommendations);
    };

    if (pathname === "/") fetchRecommendations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <RecommendationsContext.Provider value={recommendations}>
      {children}
    </RecommendationsContext.Provider>
  );
};

// Custom hook to make the context provider consumable
const useRecommendationsContext = () => {
  const context = useContext(RecommendationsContext);
  if (!context) {
    throw new Error(
      "useRecommendationsContext must be used inside of a RecommendationsProvider. If it is, check that the recommendations state value is not undefined."
    );
  }
  return context;
};

export {
  RecommendationsContext,
  RecommendationsProvider,
  useRecommendationsContext,
};
