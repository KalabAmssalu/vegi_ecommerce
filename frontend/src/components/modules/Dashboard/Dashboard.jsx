// src/components/screens/merchant/Dashboard.js
import React, { useState } from "react";
import Header from "../../common/Header/Header";
import Footer from "../../common/Footer/Footer";
import SideBar from "../../common/Sidebar/SideBar";
import AddProduct from "../../screens/merchant/AddProduct";
import OrderList from "./OrderList";
import DeliveryList from "./DeliveryList";
import UserProfile from "../../screens/auth/user/UserProfile";

const Dashboard = () => {
  const [currentView, setCurrentView] = useState("delivery-list");

  const renderContent = () => {
    switch (currentView) {
      case "add-product":
        return <AddProduct />;
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
    <div className="w-[100%]">
      <Header />
      <div className="flex">
        {/* Full screen */}
        <div className="w-[30%] border-r-4 border-primary my-4 h-screen flex justify-center items-start pt-10">
          {/* left  */}
          <SideBar setCurrentView={setCurrentView} />
        </div>
        <div className="w-[70%] min-h-screen py-4" id="content">
          {/* Right  */}
          {renderContent()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
