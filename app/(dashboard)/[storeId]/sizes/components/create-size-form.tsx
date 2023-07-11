"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Size } from "@prisma/client";
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
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  name: z.string().min(1, { message: "Must contain at least 1 character" }),
  value: z.string().min(1, { message: "Must contain at least 1 character" }),
});

type FormData = z.infer<typeof formSchema>;

export default function CreateSizeForm() {
  const params = useParams();
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      value: "",
    },
  });

  async function onSubmit(formData: FormData) {
    try {
      await axios.post<Size>(`/api/${params.storeId}/sizes`, formData);
      router.refresh();
      router.push(`/${params.storeId}/sizes`);
      toast.success("Size created successfully!");
    } catch (error) {
      if (axios.isAxiosError(error)) toast.error(error.response?.data);
      else if (error instanceof Error) toast.error(error.message);
      else toast.error("Something went wrong.");
    }
  }
  return (
    <>
      <Heading title="Create Size" subtitle="Add a new size" level="h1" />
      <Separator className="my-4" />
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid min-[600px]:grid-cols-2 lg:grid-cols-3 gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={form.formState.isSubmitting}
                      placeholder="e.g. Medium"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={form.formState.isSubmitting}
                      placeholder="e.g. M"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={form.formState.isSubmitting} type="submit">
            Create
          </Button>
        </form>
      </Form>
    </>
  );
}
