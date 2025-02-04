import { useEffect } from "react";

export const QuickViewModal = ({ product, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  if (!product) return null;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>
            <h2 className="text-2xl font-semibold text-center mb-4">
              Quick View
            </h2>
            <div className="grid gap-4">
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/${product.imageUrl}`}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-primary text-xl font-bold">
                  ${product.price}
                </span>
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1">{product.rating}</span>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
