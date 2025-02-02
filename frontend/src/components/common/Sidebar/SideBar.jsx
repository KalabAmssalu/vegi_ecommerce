// src/components/common/Sidebar/SideBar.js
import React from "react";
import { Reyan } from "../../../assets/images/Index";
import { CalendarArrowUp, PackageCheck, Truck } from "lucide-react";

const SideBar = ({ setCurrentView }) => {
  return (
    <div className="flex flex-col gap-12 justify-start">
      <div className="flex flex-col justify-center items-center ">
        <button
          className="gap-2 hover:text-red-700"
          onClick={() => setCurrentView("user-profile")}
        >
          <img
            className="w-32 h-32 rounded-full ring-4 ring-primary "
            src={Reyan}
            alt="Bordered avatar"
          />
        </button>
        Profile
      </div>

      <div className="w-[300px] py-10 px-4">
        <ul className="space-y-4">
          <li
            className="rounded-2xl flex items-center gap-4 bg-primary p-2 pl-4 text-white cursor-pointer"
            onClick={() => setCurrentView("delivery-list")}
          >
            <Truck size={20} />
            <span>Delivery</span>
          </li>
          <li
            className="rounded-2xl flex items-center gap-4 bg-primary p-2 pl-4 text-white cursor-pointer"
            onClick={() => setCurrentView("add-product")}
          >
            <PackageCheck size={20} />
            <span>Your Product</span>
          </li>
          <li
            className="rounded-2xl flex items-center gap-4 bg-primary p-2 pl-4 text-white cursor-pointer"
            onClick={() => setCurrentView("orders")}
          >
            <CalendarArrowUp size={20} />
            <span>Order</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
