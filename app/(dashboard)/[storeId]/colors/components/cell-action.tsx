"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { Color } from "@prisma/client";
import SafeClientComponentProvider from "@/providers/safe-client-component-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import AlertModal from "@/components/modals/alert-modal";
import { ColorColumn } from "./columns";

interface CellActionProps {
  color: ColorColumn;
}

export default function CellAction({ color }: CellActionProps) {
  const [alertIsOpen, setAlertIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const router = useRouter();

  function onCopyID(id: string) {
    navigator.clipboard.writeText(id);
    toast.success("Color ID copied to clipboard.");
  }

  function onOpenAlert() {
    setAlertIsOpen(true);
  }

  function onCloseAlert() {
    setAlertIsOpen(false);
  }

  async function onDelete() {
    try {
      setLoading(true);
      await axios.delete<Color>(`/api/${params.storeId}/colors/${color.id}`);
      router.refresh();
      toast.success("Color removed successfully!");
    } catch (error) {
      if (axios.isAxiosError(error)) toast.error(error.response?.data);
      else if (error instanceof Error) toast.error(error.message);
      else toast.error("Cannot remove color since it has associated products");
    } finally {
      setLoading(false);
      onCloseAlert();
    }
  }

  return (
    <>
      <SafeClientComponentProvider>
        <AlertModal
          isOpen={alertIsOpen}
          loading={loading}
          onClose={onCloseAlert}
          onConfirm={onDelete}
        />
      </SafeClientComponentProvider>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => onCopyID(color.id)}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/${params.storeId}/colors/${color.id}/edit`}
              className="flex"
            >
              <Edit className="mr-2 h-4 w-4" />
              Update
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={onOpenAlert}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}