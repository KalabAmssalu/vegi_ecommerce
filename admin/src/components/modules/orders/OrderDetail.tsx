"use client";
import React from "react";
import { ChevronLeft, ChevronRight, Copy, CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

type OrderDetailProps = {
  order: {
    id: string;
    customer: string;
    status: string;
    amount: string;
    date: string;
    items: { name: string; quantity: number; price: string }[];
    deliveryInfo: { name: string; address: string };
    paymentInfo: { method: string; lastFour: string };
  };
};

const OrderDetail: React.FC<OrderDetailProps> = ({ order }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-col bg-muted/50">
        <CardTitle className="text-lg flex items-center gap-2">
          Order Detail
          <Button size="icon" variant="outline" className="ml-auto">
            <Copy className="h-4 w-4" />
          </Button>
        </CardTitle>
        <CardDescription>Date: {order.date}</CardDescription>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <ul className="grid gap-3">
          {order.items.map((item, index) => (
            <li key={index} className="flex justify-between">
              <span>
                {item.name} x{item.quantity}
              </span>
              <span>{item.price}</span>
            </li>
          ))}
        </ul>
        <Separator className="my-4" />
        <ul className="grid gap-3">
          <li className="flex justify-between">
            <span>Subtotal</span>
            <span>{order.amount}</span>
          </li>
          <li className="flex justify-between">
            <span>Tax</span>
            <span>$25.00</span>{" "}
            {/* Replace with actual tax amount if available */}
          </li>
          <li className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{order.amount}</span>
          </li>
        </ul>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="font-semibold">Delivery Information</div>
            <address className="not-italic text-muted-foreground">
              <span>{order.deliveryInfo.name}</span>
              <br />
              <span>{order.deliveryInfo.address}</span>
            </address>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Payment Information</div>
          <div className="flex justify-between">
            <span className="flex items-center gap-1">
              <CreditCard className="h-4 w-4" />
              {order.paymentInfo.method} ending in {order.paymentInfo.lastFour}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Updated {order.date}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button size="icon" variant="outline">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default OrderDetail;
