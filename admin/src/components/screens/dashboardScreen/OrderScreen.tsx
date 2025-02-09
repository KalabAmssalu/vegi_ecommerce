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
import { useFetchMyOrders } from "@/action/Query/order-Query/order";
import { OrderType } from "@/types/order/order";

const filterOrdersByPeriod = (
  orders: OrderType[],
  period: "week" | "month" | "year"
) => {
  const now = new Date();
  return orders.filter((order) => {
    const orderDate = new Date(order.orderDate);
    const timeNow = new Date(now); // Clone the original date

    if (period === "week") {
      const startOfWeek = new Date(
        timeNow.setDate(timeNow.getDate() - timeNow.getDay())
      );
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 7);
      return orderDate >= startOfWeek && orderDate <= endOfWeek;
    } else if (period === "month") {
      return (
        orderDate.getMonth() === timeNow.getMonth() &&
        orderDate.getFullYear() === timeNow.getFullYear()
      );
    } else if (period === "year") {
      return orderDate.getFullYear() === timeNow.getFullYear();
    }
    return false;
  });
};
const calculateTotalAmount = (orders: OrderType[]): number => {
  return orders.reduce((total, order) => total + order.totalAmount, 0);
};

const OrderScreen = () => {
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const { data: orders } = useFetchMyOrders();
  const [selectedPeriod, setSelectedPeriod] = useState<
    "week" | "month" | "year"
  >("week");

  const viewOrderDetails = (order: OrderType) => {
    setSelectedOrder(order);
  };

  // Filter orders based on the selected period (week, month, year)
  const filteredOrders = orders
    ? filterOrdersByPeriod(orders, selectedPeriod)
    : [];
  // Filter orders based on the selected period (week, month, year)
  const filteredOrdersForWeek = orders
    ? filterOrdersByPeriod(orders, "week")
    : [];
  const filteredOrdersForMonth = orders
    ? filterOrdersByPeriod(orders, "month")
    : [];

  // Calculate the total amount for this week and this month
  const totalAmountForWeek = calculateTotalAmount(filteredOrdersForWeek);
  const totalAmountForMonth = calculateTotalAmount(filteredOrdersForMonth);

  return (
    <div className="p-2 grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 pb-4">
          <Card>
            <CardHeader>
              <CardDescription>This Week</CardDescription>
              <CardTitle className="text-3xl">
                ${totalAmountForWeek.toFixed(2)}
              </CardTitle>
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
              <CardTitle className="text-3xl">
                ${totalAmountForMonth.toFixed(2)}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                +10% from last month
              </div>
              <Progress value={12} aria-label="12% increase" />
            </CardContent>
          </Card>
        </div>

        <Tabs
          value={selectedPeriod}
          onValueChange={(value) => setSelectedPeriod(value as any)}
        >
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

          {/* Week Tab Content */}
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
                    {filteredOrders &&
                      filteredOrders.map((order) => (
                        <TableRow key={order._id}>
                          <TableCell>{order.customer.user}</TableCell>
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
                            ${order.totalAmount}
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

          {/* Month Tab Content */}
          <TabsContent value="month">
            <Card>
              <CardHeader className="px-6 py-4">
                <CardTitle>Orders</CardTitle>
                <CardDescription>Orders from this month.</CardDescription>
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
                    {filteredOrders &&
                      filteredOrders.map((order) => (
                        <TableRow key={order._id}>
                          <TableCell>{order.customer.user}</TableCell>
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
                            ${order.totalAmount}
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

          {/* Year Tab Content */}
          <TabsContent value="year">
            <Card>
              <CardHeader className="px-6 py-4">
                <CardTitle>Orders</CardTitle>
                <CardDescription>Orders from this year.</CardDescription>
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
                    {filteredOrders &&
                      filteredOrders.map((order) => (
                        <TableRow key={order._id}>
                          <TableCell>{order.customer.user}</TableCell>
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
                            ${order.totalAmount}
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
