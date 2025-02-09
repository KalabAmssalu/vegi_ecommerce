"use client";

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
import { useToggleVerified } from "@/action/Query/merchant-Query/merchant";

export function NewApprovalTable({
  merchantData,
}: {
  merchantData: Merchant[];
}) {
  const { mutate: toggleVerified } = useToggleVerified();
  const handleApprove = async (id: string) => {
   
    toggleVerified({ id });
  };

  const handleDownload = (filePath: string) => {
    const fileUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${filePath}`; // Ensure the correct API base URL
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", filePath.split("\\").pop() || "trade_permit");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
      accessorKey: "trade_permit",
      header: "Trade Permit",
      cell: ({ row }) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleDownload(row.original.trade_permit)}
        >
          Download
        </Button>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Button
          onClick={() => handleApprove(row.original._id)}
          variant="outline"
          size="sm"
          className="bg-primary"
        >
          Approve
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: merchantData,
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
