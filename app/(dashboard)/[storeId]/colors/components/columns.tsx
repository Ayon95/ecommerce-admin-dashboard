"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import ColorDisplay from "@/components/color-display";

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
    cell: ({ row }) => <ColorDisplay color={row.original.value} />,
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
