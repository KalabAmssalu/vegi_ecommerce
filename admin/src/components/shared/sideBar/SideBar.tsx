"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/storehooks";
import { current } from "@reduxjs/toolkit";
import {
  Bell,
  CircleUser,
  Home,
  Package,
  Package2,
  ShoppingCart,
  Truck,
  UserCog,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Props = {};

const SideBar = (props: Props) => {
  const { currentUser } = useAppSelector((state) => state.currentUser);
  const [selectedLink, setSelectedLink] = useState<string>("");

  const handleLinkClick = (link: string) => {
    setSelectedLink(link);
  };

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Atklt Tera</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/Home"
              onClick={() => handleLinkClick("/Home")}
              className={`flex items-center gap-3 rounded-lg ${
                selectedLink === "/Home" ? "bg-muted" : ""
              } px-3 py-2 transition-all hover:text-primary`}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/order"
              onClick={() => handleLinkClick("/order")}
              className={`flex items-center gap-3 rounded-lg ${
                selectedLink === "/order" ? "bg-muted" : ""
              } px-3 py-2 transition-all hover:text-primary`}
            >
              <ShoppingCart className="h-4 w-4" />
              Orders
             
            </Link>
            <Link
              href="/product"
              onClick={() => handleLinkClick("/product")}
              className={`flex items-center gap-3 rounded-lg ${
                selectedLink === "/product" ? "bg-muted" : ""
              } px-3 py-2 transition-all hover:text-primary`}
            >
              <Package className="h-4 w-4" />
              Products
            </Link>
            <Link
              href="/customer"
              onClick={() => handleLinkClick("/customer")}
              className={`flex items-center gap-3 rounded-lg ${
                selectedLink === "/customer" ? "bg-muted" : ""
              } px-3 py-2 transition-all hover:text-primary`}
            >
              <CircleUser className="h-4 w-4" />
              Customers
            </Link>
            <Link
              href="/merchant"
              onClick={() => handleLinkClick("/merchant")}
              className={`flex items-center gap-3 rounded-lg ${
                selectedLink === "/merchant" ? "bg-muted" : ""
              } px-3 py-2 transition-all hover:text-primary`}
            >
              <Users className="h-4 w-4" />
              Merchants
            </Link>
            {currentUser.role === "admin" && (
              <Link
                href="/manager"
                onClick={() => handleLinkClick("/manager")}
                className={`flex items-center gap-3 rounded-lg ${
                  selectedLink === "/manager" ? "bg-muted" : ""
                } px-3 py-2 transition-all hover:text-primary`}
              >
                <UserCog className="h-4 w-4" />
                Manager
              </Link>
            )}
            <Link
              href="/delivery"
              onClick={() => handleLinkClick("/delivery")}
              className={`flex items-center gap-3 rounded-lg ${
                selectedLink === "/delivery" ? "bg-muted" : ""
              } px-3 py-2 transition-all hover:text-primary`}
            >
              <Truck className="h-4 w-4" />
              Delivery
            </Link>
            {currentUser.role === "admin" && (
              <Link
                href="/faq"
                onClick={() => handleLinkClick("/faq")}
                className={`flex items-center gap-3 rounded-lg ${
                  selectedLink === "/faq" ? "bg-muted" : ""
                } px-3 py-2 transition-all hover:text-primary`}
              >
                <Users className="h-4 w-4" />
                FAQ
              </Link>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
