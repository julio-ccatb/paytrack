"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type Customer } from "prisma/generated/zod";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

const data: Customer[] = [
  {
    email: "a@b.c1",
    id: "5d1c84d1d",
    manager: "juan 4",
    organization: "Ozono",
  },
  {
    email: "a@b.c2",
    id: "5d1c84d11",
    manager: "juan 3",
    organization: "Ozono",
  },
  {
    email: "a@b.c3",
    id: "5d1c84d12",
    manager: "juan 2",
    organization: "Ozono",
  },
  {
    email: "a@b.c5",
    id: "5d1c84d13",
    manager: "juan 0",
    organization: "Ozono",
  },
  {
    email: "a@b.c4",
    id: "5d1c84d14",
    manager: "juan 1",
    organization: "Ozono",
  },
];

const ClientsTable = () => {
  const columns: ColumnDef<Customer>[] = [
    {
      accessorKey: "manager",
      header: ({ column }) => (
        <th
          className="flex items-center gap-1 hover:text-primary"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customer
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </th>
      ),
      cell: (row) => (
        <TableCell>
          <div className="font-medium">{row.row.original.manager}</div>
          <div className="hidden text-sm text-muted-foreground md:inline">
            {row.row.original.email}
          </div>
        </TableCell>
      ),
      enableSorting: true,
    },
    { accessorKey: "organization", header: "Organization" },
  ];
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ClientsTable;
