"use client";
import React, { useState } from "react";
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
import DeliveryDetail from "@/components/modules/delivery/DeliveryDetail";

type Delivery = {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  status: string;
  address: string;
};

const deliveries: Delivery[] = [
  {
    id: "1",
    name: "Liam Johnson",
    email: "liam@example.com",
    phone: "+1 234 567 890",
    status: "Active",
    totalOrders: 15,
    address: "1234 Main St., Anytown, CA 12345",
  },
  {
    id: "2",
    name: "Olivia Smith",
    email: "olivia@example.com",
    phone: "+1 234 567 891",
    status: "Active",
    totalOrders: 12,
    address: "5678 First Ave., Othertown, CA 67890",
  },
  {
    id: "3",
    name: "Noah Williams",
    email: "noah@example.com",
    phone: "+1 234 567 892",
    status: "Deactive",
    totalOrders: 9,
    address: "4321 Second St., Anytown, CA 12345",
  },
  {
    id: "4",
    name: "Emma Brown",
    email: "emma@example.com",
    phone: "+1 234 567 893",
    status: "Active",
    totalOrders: 18,
    address: "8765 Third Ave., Othertown, CA 67890",
  },
  {
    id: "5",
    name: "Emma Brown",
    email: "emma@example.com",
    phone: "+1 234 567 893",
    status: "Active",
    totalOrders: 18,
    address: "8765 Third Ave., Othertown, CA 67890",
  },
  {
    id: "6",
    name: "Emma Brown",
    email: "emma@example.com",
    phone: "+1 234 567 893",
    status: "Active",
    totalOrders: 18,
    address: "8765 Third Ave., Othertown, CA 67890",
  },
  {
    id: "7",
    name: "Emma Brown",
    email: "emma@example.com",
    phone: "+1 234 567 893",
    status: "Active",
    totalOrders: 18,
    address: "8765 Third Ave., Othertown, CA 67890",
  },
  {
    id: "8",
    name: "Emma Brown",
    email: "emma@example.com",
    phone: "+1 234 567 893",
    status: "Active",
    totalOrders: 18,
    address: "8765 Third Ave., Othertown, CA 67890",
  },
];

const DeliveryScreen = () => {
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(
    null
  );

  const viewDeliveryDetails = (delivery: Delivery) => {
    setSelectedDelivery(delivery);
  };

  return (
    <div className="p-0 grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Delivery Personals</CardTitle>
          </CardHeader>
          <CardContent className="overflow-y-auto max-h-[26rem]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>

                  <TableHead>Status</TableHead>
                  <TableHead>Total Orders</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deliveries.map((delivery) => (
                  <TableRow key={delivery.id}>
                    <TableCell>{delivery.name}</TableCell>
                    <TableCell>{delivery.email}</TableCell>

                    <TableCell>{delivery.status}</TableCell>
                    <TableCell>{delivery.totalOrders}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => viewDeliveryDetails(delivery)}
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

      {selectedDelivery && (
        <div className="lg:col-span-1">
          <DeliveryDetail delivery={selectedDelivery} />
        </div>
      )}
    </div>
  );
};

export default DeliveryScreen;
