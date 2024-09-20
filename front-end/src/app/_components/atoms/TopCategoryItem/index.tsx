type TTopCategoryItem = {
  itemName: string;
  itemIcon: React.ReactNode;
};

const TopCategoryItem = ({ itemName, itemIcon }: TTopCategoryItem) => {
  return (
    <div className="flex flex-col items-center justify-center mr-10">
      <div className="rounded-full flex justify-center items-center bg-slate-200 w-16 h-16">
        {itemIcon}
      </div>
      <span className="mt-2 whitespace-nowrap overflow-hidden text-ellipsis">
        {itemName}
      </span>
    </div>
  );
};

export default TopCategoryItem;
