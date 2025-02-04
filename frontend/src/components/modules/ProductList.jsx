import { useState } from "react";
import { Menu, Search } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { QuickViewModal } from "./QuickViewModal";
import { Filters } from "./Filters";
import Header from "../common/Header/Header";
import { useFetchAllProducts } from "../../api/product/action";

export default function ProductList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    categories: [],
    brands: [],
    minRating: 0,
  });
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const { data: products = [] } = useFetchAllProducts(); // Default to an empty array if no data is fetched

  const filteredProducts =
    products &&
    products
      .filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesPrice =
          product.price >= filters.priceRange[0] &&
          product.price <= filters.priceRange[1];
        const matchesCategory =
          filters.categories.length === 0 ||
          filters.categories.includes(product.category.name);

        return matchesSearch && matchesPrice && matchesCategory;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "best-selling":
            return b.rating - a.rating;
          default:
            return b.id - a.id;
        }
      });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            {/* Menu Button */}
            <button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-4 w-4" />
            </button>

            {/* Search Input */}
            <div className="flex-1 relative ">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-4" />
              <input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 p-2 w-96 border-2 border-gray-500"
              />
            </div>

            {/* Sort Select */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-lg px-4 py-2 w-[180px] bg-white"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="best-selling">Best Selling</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters - Hidden on mobile */}
          <div className="hidden lg:block w-64 bg-white p-6 rounded-lg shadow-sm h-fit">
            <Filters filters={filters} onFilterChange={setFilters} />
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={setQuickViewProduct}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No products found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

