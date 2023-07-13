"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type ColorColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <span
          className="h-5 w-5 rounded border border-slate-700 dark:border-slate-50"
          style={{ backgroundColor: row.original.value }}
        ></span>
        <span>{row.original.value}</span>
      </div>
    ),
  },

  {
    accessorKey: "createdAt",
    header: "Created At",
  },

  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction color={row.original} />,
  },
];
