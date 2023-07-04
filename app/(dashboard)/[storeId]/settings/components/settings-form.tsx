"use client";

import React, { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import ModalProvider from "@/providers/modal-provider";
import AlertModal from "@/components/modals/alert-modal";

interface SettingsFormProps {
  initialStoreData: Store;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Must contain at least 2 characters" }),
});

type FormData = z.infer<typeof formSchema>;

export default function SettingsForm({ initialStoreData }: SettingsFormProps) {
  const [alertIsOpen, setAlertIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialStoreData,
  });

  function onCloseAlert() {
    setAlertIsOpen(false);
  }

  function onOpenAlert() {
    setAlertIsOpen(true);
  }

  async function onSubmit(formData: FormData) {
    try {
      setLoading(true);
      await axios.patch<Store>(`/api/stores/${params.storeId}`, formData);

      router.refresh();
      toast.success("Store updated successfully!");
    } catch (error) {
      if (axios.isAxiosError(error)) toast.error(error.response?.data);
      else if (error instanceof Error) toast.error(error.message);
      else toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function onDelete() {
    try {
      setLoading(true);
      await axios.delete<Store>(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push("/");
      toast.success("Store removed successfully!");
    } catch (error) {
      if (axios.isAxiosError(error)) toast.error(error.response?.data);
      else if (error instanceof Error) toast.error(error.message);
      else toast.error("Cannot remove store since it has associated items");
    } finally {
      setLoading(false);
      onCloseAlert();
    }
  }

  return (
    <>
      <ModalProvider>
        <AlertModal
          isOpen={alertIsOpen}
          loading={loading}
          onClose={onCloseAlert}
          onConfirm={onDelete}
        />
      </ModalProvider>
      <div className="flex justify-between items-center">
        <Heading title="Settings" subtitle="Manage store settings" />
        <Button
          variant="destructive"
          size="sm"
          disabled={loading}
          className="px-3 py-5"
          onClick={onOpenAlert}
        >
          <span className="sr-only">Remove store</span>
          <Trash className="h-5 w-5" />
        </Button>
      </div>
      <Separator className="my-4" />
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={loading} placeholder="My Store" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            Save Changes
          </Button>
        </form>
      </Form>
    </>
  );
}
