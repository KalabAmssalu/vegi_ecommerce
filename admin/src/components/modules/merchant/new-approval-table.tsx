"use client";

import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  ColumnDef,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Merchant } from "@/types/merchant/merchant";

// Sample data for preview
const sampleData: Merchant[] = [
  {
    _id: "2",
    trade_permit: "TP789012",
    user: {
      id: "2",
      role: "manager",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      phoneNumber: "9876543210",
      address: "789 Oak St",
    },
    address: "101 Business Ave",
    isVerified: false,
    isBlocked: false,
    products: [],
    orders: [],
  },
  // Add more sample data as needed
];

const columns: ColumnDef<Merchant>[] = [
  {
    accessorKey: "user.firstName",
    header: "First Name",
  },
  {
    accessorKey: "user.lastName",
    header: "Last Name",
  },
  {
    accessorKey: "user.email",
    header: "Email",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Button
        onClick={() => handleApprove(row.original._id)}
        variant="outline"
        size="sm"
      >
        Approve
      </Button>
    ),
  },
];

const handleApprove = async (id: string) => {
  // Implement approval logic here
  console.log(`Approving merchant with id: ${id}`);
};

export function NewApprovalTable() {
  const [data, setData] = useState<Merchant[]>(sampleData);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">New Approval Requests</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
