"use client";
import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  File,
  ListFilter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderDetail from "@/components/modules/orders/OrderDetail";

type Order = {
  id: string;
  customer: string;
  status: string;
  amount: string;
  date: string;
  items: { name: string; quantity: number; price: string }[];
  deliveryInfo: { name: string; address: string };
  paymentInfo: { method: string; lastFour: string };
};

const orders: Order[] = [
  {
    id: "1",
    customer: "Liam Johnson",
    status: "Fulfilled",
    amount: "$250.00",
    date: "November 23, 2023",
    items: [
      { name: "Glimmer Lamps", quantity: 2, price: "$250.00" },
      { name: "Aqua Filters", quantity: 1, price: "$49.00" },
    ],
    deliveryInfo: {
      name: "Liam Johnson",
      address: "1234 Main St., Anytown, CA 12345",
    },
    paymentInfo: { method: "Visa", lastFour: "4532" },
  },
  {
    id: "2",
    customer: "Olivia Smith",
    status: "Declined",
    amount: "$150.00",
    date: "November 22, 2023",
    items: [{ name: "Water Purifier", quantity: 1, price: "$150.00" }],
    deliveryInfo: {
      name: "Olivia Smith",
      address: "5678 First Ave., Othertown, CA 67890",
    },
    paymentInfo: { method: "MasterCard", lastFour: "7890" },
  },
  {
    id: "3",
    customer: "Danat Ted",
    status: "Fulfilled",
    amount: "$250.00",
    date: "November 23, 2023",
    items: [
      { name: "Glimmer Lamps", quantity: 2, price: "$250.00" },
      { name: "Aqua Filters", quantity: 1, price: "$49.00" },
    ],
    deliveryInfo: {
      name: "Liam Johnson",
      address: "1234 Main St., Anytown, CA 12345",
    },
    paymentInfo: { method: "Visa", lastFour: "4532" },
  },
  {
    id: "3",
    customer: "Danat Ted",
    status: "Fulfilled",
    amount: "$250.00",
    date: "November 23, 2023",
    items: [
      { name: "Glimmer Lamps", quantity: 2, price: "$250.00" },
      { name: "Aqua Filters", quantity: 1, price: "$49.00" },
    ],
    deliveryInfo: {
      name: "Liam Johnson",
      address: "1234 Main St., Anytown, CA 12345",
    },
    paymentInfo: { method: "Visa", lastFour: "4532" },
  },
  {
    id: "3",
    customer: "Danat Ted",
    status: "Fulfilled",
    amount: "$250.00",
    date: "November 23, 2023",
    items: [
      { name: "Glimmer Lamps", quantity: 2, price: "$250.00" },
      { name: "Aqua Filters", quantity: 1, price: "$49.00" },
    ],
    deliveryInfo: {
      name: "Liam Johnson",
      address: "1234 Main St., Anytown, CA 12345",
    },
    paymentInfo: { method: "Visa", lastFour: "4532" },
  },
];

const OrderScreen = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="p-2 grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 pb-4">
          <Card>
            <CardHeader>
              <CardDescription>This Week</CardDescription>
              <CardTitle className="text-3xl">$1,329</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                +25% from last week
              </div>
              <Progress value={25} aria-label="25% increase" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>This Month</CardDescription>
              <CardTitle className="text-3xl">$5,329</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                +10% from last month
              </div>
              <Progress value={12} aria-label="12% increase" />
            </CardContent>
          </Card>
        </div>
        <Tabs defaultValue="week">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <ListFilter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Fulfilled</DropdownMenuItem>
                  <DropdownMenuItem>Declined</DropdownMenuItem>
                  <DropdownMenuItem>Refunded</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" variant="outline">
                <File className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          <TabsContent value="week">
            <Card>
              <CardHeader className="px-6 py-4">
                <CardTitle>Orders</CardTitle>
                <CardDescription>
                  Recent orders from your store.
                </CardDescription>
              </CardHeader>
              <CardContent className="overflow-y-auto max-h-60">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              order.status === "Fulfilled"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {order.amount}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => viewOrderDetails(order)}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {selectedOrder && (
        <div className="lg:col-span-1">
          <OrderDetail order={selectedOrder} />
        </div>
      )}
    </div>
  );
};

export default OrderScreen;
