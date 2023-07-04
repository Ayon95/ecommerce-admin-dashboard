"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Store } from "@prisma/client";

interface StoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Must contain at least 2 characters" }),
});

export default function StoreModal({ isOpen, onClose }: StoreModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const response = await axios.post<Store>("/api/stores", formData);
      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) toast.error(error.response?.data);
      else if (error instanceof Error) toast.error(error.message);
      else toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <Modal
      title="Create Store"
      description="Add a new store for your products"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      placeholder="My Store"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-5 flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                disabled={loading}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                Create
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
}
