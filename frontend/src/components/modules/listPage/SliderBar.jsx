import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"


export function Sidebar({
  maxPrice,
  priceRange,
  setPriceRange,
  popularVegetables,
  selectedVegetables,
  setSelectedVegetables,
}) {
  const handlePriceChange = (value) => {
    setPriceRange([value[0], value[1]])
  }

  const handleVegetableToggle = (vegetable) => {
    setSelectedVegetables(
      selectedVegetables.includes(vegetable)
        ? selectedVegetables.filter((v) => v !== vegetable)
        : [...selectedVegetables, vegetable],
    )
  }

  return (
    <div className="w-64 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Price Range</h3>
        <Slider
          min={0}
          max={maxPrice}
          step={0.01}
          value={[priceRange[0], priceRange[1]]}
          onValueChange={handlePriceChange}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>${priceRange[0].toFixed(2)}</span>
          <span>${priceRange[1].toFixed(2)}</span>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Popular Vegetables</h3>
        {popularVegetables.map((vegetable) => (
          <div key={vegetable} className="flex items-center space-x-2 mb-2">
            <Checkbox
              id={vegetable}
              checked={selectedVegetables.includes(vegetable)}
              onCheckedChange={() => handleVegetableToggle(vegetable)}
            />
            <Label htmlFor={vegetable}>{vegetable}</Label>
          </div>
        ))}
      </div>
    </div>
  )
}

