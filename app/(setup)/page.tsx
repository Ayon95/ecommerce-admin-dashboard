"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "react-hot-toast";
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

const formSchema = z.object({
  name: z.string().min(2, { message: "Must contain at least 2 characters" }),
});

export default function SetupPage() {
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
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-5 h-full flex items-center justify-center">
      <div className="w-full max-w-lg">
        <h1 className="text-4xl font-semibold">Create store</h1>
        <p className="mt-1 mb-5">
          Get started by creating a store for your products
        </p>
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
            <Button className="mt-6" type="submit" disabled={loading}>
              Create
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
