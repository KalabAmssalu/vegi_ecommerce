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

type MerchantDetailProps = {
  merchant: {
    id: string;
    name: string;
    status: string;
    phone: string;
    totalSales: string;
    address: string;
    email: string;
  };
};

const MerchantDetail: React.FC<MerchantDetailProps> = ({ merchant }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-col bg-muted/50">
        <CardTitle className="text-lg flex items-center gap-2">
          {merchant.name} Details
          <Button size="icon" variant="outline" className="ml-auto">
            <Copy className="h-4 w-4" />
          </Button>
        </CardTitle>
        <CardDescription>Status: {merchant.status}</CardDescription>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <ul className="grid gap-3">
          <li className="flex justify-between">
            <span> Email</span>
            <span>{merchant.email}</span>
          </li>
          <li className="flex justify-between">
            <span>Phone Number</span>
            <span>{merchant.phone}</span>
          </li>
        </ul>
        <Separator className="my-4" />
        <ul className="grid gap-3">
          <li className="flex justify-between">
            <span>Total Sales</span>
            <span>{merchant.totalSales}</span>
          </li>
        </ul>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="font-semibold">Address</div>
            <address className="not-italic text-muted-foreground">
              {merchant.address}
            </address>
          </div>
        </div>
        <div>
          <div className="font-semibold">Trade permit</div>
          <address className="not-italic text-muted-foreground">
            {merchant.address}
          </address>
        </div>
      </CardContent>
      <CardFooter className="flex items-center bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Last updated November 23, 2023
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

export default MerchantDetail;
