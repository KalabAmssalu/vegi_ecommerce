
export const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    category: "Electronics",
    brand: "SoundMax",
    description: "High-quality wireless headphones with noise cancellation."
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    price: 199.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    category: "Electronics",
    brand: "TechGear",
    description: "Advanced smartwatch with health tracking features."
  },
  {
    id: 3,
    name: "Leather Laptop Bag",
    price: 79.99,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    category: "Accessories",
    brand: "LuxLeather",
    description: "Stylish and durable leather laptop bag."
  },
  {
    id: 4,
    name: "Wireless Mouse",
    price: 49.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46",
    category: "Electronics",
    brand: "TechGear",
    description: "Ergonomic wireless mouse for comfortable use."
  },
  {
    id: 5,
    name: "Mechanical Keyboard",
    price: 129.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
    category: "Electronics",
    brand: "KeyMaster",
    description: "Professional mechanical keyboard with RGB lighting."
  },
  {
    id: 6,
    name: "4K Monitor",
    price: 399.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
    category: "Electronics",
    brand: "ViewTech",
    description: "Ultra-sharp 4K monitor for professional use."
  }
];

export const categories = [...new Set(products.map(p => p.category))];
export const brands = [...new Set(products.map(p => p.brand))];