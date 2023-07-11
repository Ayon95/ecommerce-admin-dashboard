"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type CategoryColumn = {
  id: string;
  name: string;
  billboardLabel: string;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "billboardLabel",
    header: "Billboard",
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
    cell: ({ row }) => <CellAction category={row.original} />,
  },
];
