"use client";
import React from "react";
import { LineChart, ShoppingCart, User, Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppSelector } from "@/hooks/storehooks";
import { useFetchStatsDashboard } from "@/action/Query/stat-Query";
import { useFetchRecentOrders } from "@/action/Query/order-Query/order";
import { useFetchAllCustomers } from "@/action/Query/customer-Query/customer";
import { formatDate } from "@/lib/utils/dateUtils";

const Dashboard = () => {
  const { currentUser } = useAppSelector((state) => state.currentUser);
  const { data: stats } = useFetchStatsDashboard();
  const { data: recentOrders } = useFetchRecentOrders();
  const { data: customers } = useFetchAllCustomers();

  // Limit the number of customers to 5
  const limitedCustomers = customers?.slice(0, 5);

  return (
    <div className="p-0 grid gap-6">
      {/* Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </header>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentUser.role === "admin" && (
          <Card>
            <CardHeader className="flex items-center">
              <User className="h-8 w-8 text-blue-500" />
              <CardTitle className="ml-4">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats?.totalUsers}</p>
              <p className="text-sm text-muted-foreground">
                +20% from last month
              </p>
            </CardContent>
          </Card>
        )}
        <Card>
          <CardHeader className="flex items-center">
            <ShoppingCart className="h-8 w-8 text-green-500" />
            <CardTitle className="ml-4">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${stats?.totalSales}</p>
            <p className="text-sm text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center">
            <Truck className="h-8 w-8 text-yellow-500" />
            <CardTitle className="ml-4">Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats?.deliveredOrders}</p>
            <p className="text-sm text-muted-foreground">
              +10% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center">
            <LineChart className="h-8 w-8 text-red-500" />
            <CardTitle className="ml-4">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${stats?.monthlySales}</p>
            <p className="text-sm text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Tabs */}
      <Tabs defaultValue="recent-orders">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="recent-orders">Recent Orders</TabsTrigger>
            <TabsTrigger value="recent-users">Recent Users</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="recent-orders">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent className="overflow-y-auto max-h-[20rem]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders?.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell>{`#${order._id}`}</TableCell>
                      <TableCell>{formatDate(order.createdAt)}</TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell className="text-right">
                        ${order.totalAmount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="recent-users">
          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>first Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Signup Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {limitedCustomers?.map((customer, index) => (
                    <TableRow key={index}>
                      <TableCell>{customer.user.firstName}</TableCell>
                      <TableCell>{customer.user.lastName}</TableCell>
                      <TableCell>{customer.user.email}</TableCell>
                      <TableCell className="text-right">
                        {formatDate(customer.createdAt)}
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
  );
};

export default Dashboard;
