"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import ColorDisplay from "@/components/color-display";

export type ProductColumn = {
  id: string;
  name: string;
  isFeatured: boolean;
  isArchived: boolean;
  price: string;
  category: string;
  size: string;
  color: string;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "isArchived",
    header: "Archived",
  },

  {
    accessorKey: "isFeatured",
    header: "Featured",
  },

  {
    accessorKey: "price",
    header: "Price",
  },

  {
    accessorKey: "category",
    header: "Category",
  },

  {
    accessorKey: "size",
    header: "Size",
  },

  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => <ColorDisplay color={row.original.color} />,
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
    cell: ({ row }) => <CellAction product={row.original} />,
  },
];
