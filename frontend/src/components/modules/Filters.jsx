import { useFetchCategories } from "../../api/category/action";
import PriceRangeSlider from "../common/PriceRangeSlider";

const subCities = [
  "Addis Ketema", "Akaky Kaliti", "Arada", "Bole", "Gulele", 
  "Kirkos", "Kolfe Keranio", "Lideta", "Nifas Silk-Lafto", "Yeka"
];

export const Filters = ({ filters, onFilterChange }) => {
  const { data: categories } = useFetchCategories();

  const handlePriceChange = ({ min, max }) => {
    onFilterChange({
      ...filters,
      priceRange: [min, max],
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

  const handleLocationChange = (event) => {
    onFilterChange({
      ...filters,
      location: event.target.value,
    });
  };

  return (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <PriceRangeSlider
          min={0}
          max={4000}
          onChange={handlePriceChange}
          width="100%"
          trackColor="#e5e7eb"
          rangeColor="#3b82f6"
          currencyText="$"
        />
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {categories?.map((category) => (
            <div key={category._id} className="flex items-center">
              <input
                type="checkbox"
                id={category.name}
                checked={filters.categories.includes(category.name)}
                onChange={() => handleCategoryChange(category.name)}
                className="h-4 w-4 text-primary rounded"
              />
              <label htmlFor={category.name} className="ml-2 text-sm">
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Location Filter */}
      <div>
        <h3 className="font-semibold mb-3">Filter by Location</h3>
        <select
          value={filters.location || ""}
          onChange={handleLocationChange}
          className="w-full border border-gray-300 rounded p-2 text-sm"
        >
          <option value="">Select Subcity</option>
          {subCities.map((subcity) => (
            <option key={subcity} value={subcity}>
              {subcity}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
