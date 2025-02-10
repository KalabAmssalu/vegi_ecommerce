// src/components/common/Sidebar/SideBar.js
import { ShoppingBasket } from "lucide-react";
import React from "react";
import { FaTruck, FaBox, FaPlus, FaUser, FaList } from "react-icons/fa";

const SideBar = ({ role, setCurrentView, currentView }) => {
  const merchantTabs = [
    { id: "add-product", label: "Add Product", icon: <FaPlus /> },
    { id: "myproducts", label: "My Product", icon: <ShoppingBasket /> },
    { id: "orders", label: "Orders", icon: <FaList /> },
  ];

  const deliveryPersonTabs = [
    { id: "delivery-list", label: "Delivery List", icon: <FaTruck /> },
  ];

  const tabs =
    role === "merchant"
      ? merchantTabs
      : role === "delivery"
      ? deliveryPersonTabs
      : "";

  return (
    <div className="p-4 space-y-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setCurrentView(tab.id)}
          className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
            currentView === tab.id
              ? "bg-primary text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <span className="text-lg">{tab.icon}</span>
          <span className="text-sm font-medium">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default SideBar;
