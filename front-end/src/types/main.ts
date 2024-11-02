export type TProductData = {
  productId: number;
  productName: string;
  productImage: string;
  productBrand: string;
  starRating: number;
  amountSold: number;
  salePrice: string;
  actualPrice: string;
};

export type TTopCategoryItem = {
  itemName: string;
  itemIcon: React.ReactNode;
};
