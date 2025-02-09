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
import { useFetchAllCustomers } from "@/action/Query/customer-Query/customer";
import { Badge } from "@/components/ui/badge";

const CustomerList = () => {
  const [filter, setFilter] = useState<string>("");
  const router = useRouter();
  const { data: customers } = useFetchAllCustomers();

  const filteredCustomers = customers?.filter((customer) =>
    customer?.user.firstName.toLowerCase().includes(filter.toLowerCase())
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
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers?.map((customer) => (
                <TableRow key={customer._id}>
                  <TableCell>
                    {customer.user.firstName} {customer.user.lastName}
                  </TableCell>
                  <TableCell>{customer.user.email}</TableCell>
                  <TableCell>{customer.user.phoneNumber}</TableCell>
                  <TableCell>{customer.orderHistory.length}</TableCell>
                  <TableCell>
                    <Badge
                      className={`${
                        customer.isBlocked ? "bg-red-500" : "bg-green-500"
                      }`}
                    >
                      {customer.isBlocked ? "Blocked" : "Active"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => viewCustomerDetails(customer._id)}
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
