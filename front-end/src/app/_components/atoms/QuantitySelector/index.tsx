import { useEffect, useState } from "react";

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setErrorMessage(null);

    if (quantity > 10) {
      setQuantity(10);
      setErrorMessage("Maximum 10 per item allowed.");
      return;
    }

    if (quantity < 0) {
      setQuantity(0);
    }
  }, [quantity]);

  return (
    <div className="space-y-3">
      <div className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
        <button
          className="w-1/4 h-10 flex items-center justify-center text-xl text-black hover:bg-gray-100 focus:outline-none"
          onClick={() =>
            setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0))
          }
        >
          -
        </button>
        <div className="w-px h-6 bg-gray-200"></div> {/* Divider line */}
        <input
          min={0}
          max={10}
          type="number"
          className="w-2/4 text-center text-xl font-medium text-black"
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          value={quantity}
        />
        <div className="w-px h-6 bg-gray-200"></div> {/* Divider line */}
        <button
          className="w-1/4 h-10 flex items-center justify-center text-xl text-black hover:bg-gray-100 focus:outline-none"
          onClick={() => {
            if (quantity === 10) {
              setErrorMessage("Maximum 10 per item allowed.");
              return;
            }

            setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 10));
          }}
        >
          +
        </button>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default QuantitySelector;
