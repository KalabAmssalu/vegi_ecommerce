// src/components/screens/merchant/Dashboard.js
import React, { useState } from "react";
import Header from "../../common/Header/Header";
import Footer from "../../common/Footer/Footer";
import SideBar from "../../common/Sidebar/SideBar";
import AddProduct from "../../screens/merchant/AddProduct";
import OrderList from "./OrderList";
import DeliveryList from "./DeliveryList";
import UserProfile from "../../screens/auth/user/UserProfile";
import ProductListTable from "./ProductList";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [currentView, setCurrentView] = useState("delivery-list");
  const userInfo = useSelector((state) => state.user);

  const renderContent = () => {
    switch (currentView) {
      case "add-product":
        return <AddProduct />;
      case "myproducts":
        return <ProductListTable />;
      case "orders":
        return <OrderList />;
      case "delivery-list":
        return <DeliveryList />;
      case "user-profile":
        return <UserProfile />;
      default:
        return <DeliveryList />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 shadow-sm">
          <SideBar
            role={userInfo.role}
            setCurrentView={setCurrentView}
            currentView={currentView}
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 bg-gray-50">{renderContent()}</div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
