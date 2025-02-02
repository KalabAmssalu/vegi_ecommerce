"use client";
import React from "react";
import { CreditCard, Package, Truck, User } from "lucide-react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {};

const CustomerDashboard = (props: Props) => {
  return (
    <main className="grid gap-6 p-6 lg:grid-cols-4">
      {/* Overview Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:col-span-4">
        <Card>
          <CardHeader className="flex items-center gap-4">
            <User className="h-6 w-6 text-muted-foreground" />
            <CardTitle>Account Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 text-sm">
              <div>
                <span className="font-medium">Name:</span> Liam Johnson
              </div>
              <div>
                <span className="font-medium">Email:</span> liam@example.com
              </div>
              <div>
                <span className="font-medium">Phone:</span> +1 234 567 890
              </div>
              <div>
                <span className="font-medium">Address:</span> 1234 Main St.,
                Anytown, CA 12345
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center gap-4">
            <CreditCard className="h-6 w-6 text-muted-foreground" />
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" /> Visa
                ending in 4532
              </span>
              <Button size="sm" variant="outline">
                Manage
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center gap-4">
            <Package className="h-6 w-6 text-muted-foreground" />
            <CardTitle>Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">15</div>
            <CardDescription className="text-sm">Total Orders</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center gap-4">
            <Truck className="h-6 w-6 text-muted-foreground" />
            <CardTitle>Pending Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <CardDescription className="text-sm">In transit</CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Order History and Tabs */}
      <div className="lg:col-span-4">
        <Tabs defaultValue="recent-orders">
          <TabsList className="mb-4">
            <TabsTrigger value="recent-orders">Recent Orders</TabsTrigger>
            <TabsTrigger value="account-settings">Account Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="recent-orders">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
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
                      <TableCell>
                        <Badge variant="secondary">Shipped</Badge>
                      </TableCell>
                      <TableCell className="text-right">$299.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>#12344</TableCell>
                      <TableCell>2024-07-15</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Delivered</Badge>
                      </TableCell>
                      <TableCell className="text-right">$150.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>#12343</TableCell>
                      <TableCell>2024-07-05</TableCell>
                      <TableCell>
                        <Badge variant="outline">Pending</Badge>
                      </TableCell>
                      <TableCell className="text-right">$450.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="account-settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full mb-2">
                  Deactivate Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default CustomerDashboard;
