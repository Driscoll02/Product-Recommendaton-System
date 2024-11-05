import { useEffect, useRef, useState } from "react";

const SearchBar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All categories");
  const dropdownRef = useRef(null); // Create a ref for the dropdown

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false); // Close dropdown after selection
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    // Add event listener to document
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <form className="max-w-lg mx-auto">
      <div className="flex relative">
        <button
          id="dropdown-button"
          type="button"
          onClick={toggleDropdown}
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
        >
          {selectedOption}
          <svg
            className="w-2.5 h-2.5 ms-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        <div
          ref={dropdownRef}
          id="dropdown"
          className={`z-10 ${
            isDropdownOpen ? "" : "hidden"
          } bg-white divide-y divide-gray-100 absolute top-full left-0 rounded-lg shadow w-44`}
        >
          <ul
            className="py-2 text-sm text-gray-700"
            aria-labelledby="dropdown-button"
          >
            {["All categories", "Laptops", "GPUs", "AI Models", "Software"].map(
              (option) => (
                <li key={option}>
                  <button
                    type="button"
                    onClick={() => handleOptionSelect(option)}
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                  >
                    {option}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder={
              selectedOption === "All categories"
                ? "Search Laptops, Components, AI Models..."
                : `Search ${selectedOption}...`
            }
            required
          />
          <button
            type="submit"
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-orange-600 rounded-e-lg border border-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
