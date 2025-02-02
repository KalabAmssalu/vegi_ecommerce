"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
};

const customers: Customer[] = [
  {
    id: "1",
    name: "Liam Johnson",
    email: "liam@example.com",
    phone: "+1 234 567 890",
    totalOrders: 15,
  },
  {
    id: "2",
    name: "Olivia Smith",
    email: "olivia@example.com",
    phone: "+1 234 567 891",
    totalOrders: 12,
  },
  {
    id: "3",
    name: "Noah Williams",
    email: "noah@example.com",
    phone: "+1 234 567 892",
    totalOrders: 9,
  },
  {
    id: "4",
    name: "Emma Brown",
    email: "emma@example.com",
    phone: "+1 234 567 893",
    totalOrders: 18,
  },
];

const CustomerList = () => {
  const [filter, setFilter] = useState<string>("");
  const router = useRouter();

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(filter.toLowerCase())
  );

  const viewCustomerDetails = (customerId: string) => {
    router.push(`/customer/${customerId}/detail`);
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Filter by Name..."
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="mb-4 max-w-sm border-primary"
          />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Total Orders</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.totalOrders}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => viewCustomerDetails(customer.id)}
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
    </div>
  );
};

export default CustomerList;
