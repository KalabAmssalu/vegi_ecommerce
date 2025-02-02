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
import { Badge } from "@/components/ui/badge";
import MerchantDetail from "@/components/modules/merchant/MerchantDetail";
import { Input } from "@/components/ui/input";

type Merchant = {
  id: string;
  name: string;
  status: string;
  phone: string;
  totalSales: string;
  address: string;
  email: string;
};

const merchants: Merchant[] = [
  {
    id: "1",
    name: "Acme Corp",
    status: "Pending Approval",
    phone: "+1 234 567 890",
    totalSales: "$5,000.00",
    address: "1234 Main St., Anytown, CA 12345",
    email: "contact@acme.com",
  },
  {
    id: "2",
    name: "Global Mart",
    status: "Inactive",
    phone: "+1 234 567 891",
    totalSales: "$3,200.00",
    address: "4321 First Ave., Othertown, CA 67890",
    email: "contact@globalmart.com",
  },
  {
    id: "3",
    name: "ElectroHub",
    status: "Active",
    phone: "+1 234 567 892",
    totalSales: "$8,750.00",
    address: "5678 Second St., Anytown, CA 12345",
    email: "contact@electrohub.com",
  },
  {
    id: "4",
    name: "SuperStore",
    status: "Active",
    phone: "+1 234 567 893",
    totalSales: "$2,450.00",
    address: "8765 Third Ave., Othertown, CA 67890",
    email: "contact@superstore.com",
  },
  {
    id: "5",
    name: "SuperStore",
    status: "Active",
    phone: "+1 234 567 893",
    totalSales: "$2,450.00",
    address: "8765 Third Ave., Othertown, CA 67890",
    email: "contact@superstore.com",
  },
  {
    id: "6",
    name: "SuperStore",
    status: "Active",
    phone: "+1 234 567 893",
    totalSales: "$2,450.00",
    address: "8765 Third Ave., Othertown, CA 67890",
    email: "contact@superstore.com",
  },
  {
    id: "7",
    name: "SuperStore",
    status: "Active",
    phone: "+1 234 567 893",
    totalSales: "$2,450.00",
    address: "8765 Third Ave., Othertown, CA 67890",
    email: "contact@superstore.com",
  },
  {
    id: "8",
    name: "SuperStore",
    status: "Active",
    phone: "+1 234 567 893",
    totalSales: "$2,450.00",
    address: "8765 Third Ave., Othertown, CA 67890",
    email: "contact@superstore.com",
  },
  {
    id: "9",
    name: "SuperStore",
    status: "Active",
    phone: "+1 234 567 893",
    totalSales: "$2,450.00",
    address: "8765 Third Ave., Othertown, CA 67890",
    email: "contact@superstore.com",
  },
];

const MerchantScreen = () => {
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(
    null
  );
  const [filter, setFilter] = useState<string>("");

  const viewMerchantDetails = (merchant: Merchant) => {
    setSelectedMerchant(merchant);
  };

  // Apply the filter to the merchants array
  const filteredMerchants = merchants.filter((merchant) =>
    merchant.status.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-0 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Merchants</CardTitle>
          </CardHeader>
          <CardContent className="overflow-y-auto max-h-[30rem]">
            <Input
              placeholder="Filter by Status..."
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="mb-4 max-w-sm border-primary"
            />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Merchant</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead className="text-right">Total Sales</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMerchants.map((merchant) => (
                  <TableRow key={merchant.id}>
                    <TableCell>{merchant.name}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          merchant.status === "Active" ? "secondary" : "outline"
                        }
                      >
                        {merchant.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{merchant.phone}</TableCell>
                    <TableCell className="text-right">
                      {merchant.totalSales}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => viewMerchantDetails(merchant)}
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

      {selectedMerchant && (
        <div className="lg:col-span-1">
          <MerchantDetail merchant={selectedMerchant} />
        </div>
      )}
    </div>
  );
};

export default MerchantScreen;
