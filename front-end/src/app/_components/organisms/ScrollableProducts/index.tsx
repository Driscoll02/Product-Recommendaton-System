import ScrollableProductsList from "../../molecules/ScrollableProductsList";

type TScrollableProductsProps = {
  groupTitle: string;
};

const ScrollableProducts = ({ groupTitle }: TScrollableProductsProps) => {
  return (
    <div className="my-24">
      <h3 className="font-semibold text-2xl">{groupTitle}</h3>
      <ScrollableProductsList />
    </div>
  );
};

export default ScrollableProducts;
