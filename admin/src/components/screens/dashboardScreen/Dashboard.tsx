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
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div className="p-0 grid gap-6">
      {/* Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </header>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex items-center">
            <User className="h-8 w-8 text-blue-500" />
            <CardTitle className="ml-4">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1,200</p>
            <p className="text-sm text-muted-foreground">
              +20% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center">
            <ShoppingCart className="h-8 w-8 text-green-500" />
            <CardTitle className="ml-4">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$45,000</p>
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
            <p className="text-3xl font-bold">320</p>
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
            <p className="text-3xl font-bold">$12,500</p>
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
                  <TableRow>
                    <TableCell>#12345</TableCell>
                    <TableCell>2024-08-01</TableCell>
                    <TableCell>Shipped</TableCell>
                    <TableCell className="text-right">$299.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>#12346</TableCell>
                    <TableCell>2024-08-02</TableCell>
                    <TableCell>Processing</TableCell>
                    <TableCell className="text-right">$150.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>#12347</TableCell>
                    <TableCell>2024-08-03</TableCell>
                    <TableCell>Delivered</TableCell>
                    <TableCell className="text-right">$450.00</TableCell>
                  </TableRow>
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
                    <TableHead>User ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Signup Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>#001</TableCell>
                    <TableCell>John Doe</TableCell>
                    <TableCell>john@example.com</TableCell>
                    <TableCell className="text-right">2024-08-01</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>#002</TableCell>
                    <TableCell>Jane Smith</TableCell>
                    <TableCell>jane@example.com</TableCell>
                    <TableCell className="text-right">2024-08-02</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>#003</TableCell>
                    <TableCell>Mark Johnson</TableCell>
                    <TableCell>mark@example.com</TableCell>
                    <TableCell className="text-right">2024-08-03</TableCell>
                  </TableRow>
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
