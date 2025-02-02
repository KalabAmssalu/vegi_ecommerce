"use client";
import React from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type DeliveryDetailProps = {
  delivery: {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: string;
    totalOrders: number;
    address: string;
  };
};

const DeliveryDetail: React.FC<DeliveryDetailProps> = ({ delivery }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-col bg-muted/50">
        <CardTitle className="text-lg flex items-center gap-2">
          {delivery.name} Details
          <Button size="icon" variant="outline" className="ml-auto">
            <Copy className="h-4 w-4" />
          </Button>
        </CardTitle>
        <CardDescription>Status: {delivery.status}</CardDescription>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <ul className="grid gap-3">
          <li className="flex justify-between">
            <span>Email</span>
            <span>{delivery.email}</span>
          </li>
          <li className="flex justify-between">
            <span>Phone Number</span>
            <span>{delivery.phone}</span>
          </li>
          <li className="flex justify-between">
            <span>Total Orders</span>
            <span>{delivery.totalOrders}</span>
          </li>
        </ul>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="font-semibold">Address</div>
            <address className="not-italic text-muted-foreground">
              {delivery.address}
            </address>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </CardFooter>
    </Card>
  );
};

export default DeliveryDetail;
