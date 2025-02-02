import { categories, brands } from "../../constant/product";

export const Filters = ({ filters, onFilterChange }) => {
  const handlePriceChange = (event) => {
    const value = (event.target).value.split(",").map(Number);
    onFilterChange({
      ...filters,
      priceRange: [value[0], value[1]],
    });
  };

  const handleCategoryChange = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onFilterChange({
      ...filters,
      categories: newCategories,
    });
  };

  const handleBrandChange = (brand) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onFilterChange({
      ...filters,
      brands: newBrands,
    });
  };

  return (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <input
          type="range"
          min="0"
          max="1000"
          step="1"
          value={filters.priceRange.join(",")}
          onInput={handlePriceChange}
          className="w-full"
        />
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>${filters.priceRange[0]}</span>
          <span>${filters.priceRange[1]}</span>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center">
              <input
                type="checkbox"
                id={category}
                checked={filters.categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="h-4 w-4 text-primary rounded"
              />
              <label htmlFor={category} className="ml-2 text-sm">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-semibold mb-3">Brands</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center">
              <input
                type="checkbox"
                id={brand}
                checked={filters.brands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
                className="h-4 w-4 text-primary rounded"
              />
              <label htmlFor={brand} className="ml-2 text-sm">
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
