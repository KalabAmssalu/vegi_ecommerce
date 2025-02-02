import React from "react";

const Footer = () => {
  return (
    <div>
      <div>
        <footer className="bg-lime-100 py-12">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between mx-16">
              <div className="mb-8 md:mb-0">
                <h2 className="text-2xl font-bold mb-2">Atklt Tera</h2>
                <p className="text-gray-700 w-80">
                  Discover a world of exceptional tastes curated just for you.
                  From farm-fresh produce to gourmet delicacies, our handpicked
                  selection of premium ingredients elevates every meal.
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-16">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Get to know us</h3>
                  <ul className="text-gray-600">
                    <li className="mb-2">
                      <a href="/aboutus" className="hover:underline">
                        About
                      </a>
                    </li>

                    <li className="mb-2">
                      <a href="/returns-order" className="hover:underline">
                        Returns Order
                      </a>
                    </li>
                    <li className="mb-2">
                      <a href="/contact" className="hover:underline">
                        Contact
                      </a>
                    </li>
                    <li>
                      <a href="/Feedback" className="hover:underline">
                        Feedback
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">For Consumers</h3>
                  <ul className="text-gray-600">
                    <li className="mb-2">
                      <a href="/payments" className="hover:underline">
                        Payments
                      </a>
                    </li>

                    <li className="mb-2">
                      <a href="/faq" className="hover:underline">
                        FAQ
                      </a>
                    </li>
                    <li>
                      <a href="/shop-checkout" className="hover:underline">
                        Shop Checkout
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Best Selling Products
                  </h3>
                  <ul className="text-gray-600">
                    <li className="mb-2">
                      <a href="/Vegitables" className="hover:underline">
                        Vegetables
                      </a>
                    </li>
                    <li className="mb-2">
                      <a href="/Fruits" className="hover:underline">
                        Fruits
                      </a>
                    </li>
                    <li className="mb-2">
                      <a href="/Spices" className="hover:underline">
                        Spices
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
      <div>
        <footer className="bg-primary text-white text-center p-3 ">
          <p>&copy; 2024 Atklt Tera. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
