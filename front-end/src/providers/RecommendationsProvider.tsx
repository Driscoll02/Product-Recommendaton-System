import { createContext, useContext, useEffect, useState } from "react";

type TProviderProps = {
  children: React.ReactNode;
};

// Context will store an array of product names for recommendations
const RecommendationsContext = createContext<string[] | undefined>(undefined);

const RecommendationsProvider = ({ children }: TProviderProps) => {
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      // Get recommendations here by passing name of first item in cart
      // IPhone 16 is hard-coded for now
      const response = await fetch("http://localhost:8000/product-cosine-sim", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_name: "MacBook Pro 16" }),
      });

      console.log(response.body);

      if (!response.ok)
        throw new Error(
          "Something went wrong with the request to cosine sim calc"
        );

      const responseJson = await response.json();
      console.log({ responseJson });
      setRecommendations(responseJson.recommendations);
    };

    fetchRecommendations();
  }, []);

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
