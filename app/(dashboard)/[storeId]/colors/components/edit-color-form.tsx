"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Color } from "@prisma/client";
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

interface EditColorFormProps {
  initialColorData: Color;
}

const formSchema = z.object({
  name: z.string().min(1, { message: "Must contain at least 1 character" }),
  value: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Must be a valid color Hex code",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function EditColorForm({
  initialColorData,
}: EditColorFormProps) {
  const params = useParams();
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialColorData,
  });

  async function onSubmit(formData: FormData) {
    try {
      await axios.patch<Color>(
        `/api/${params.storeId}/colors/${params.colorId}`,
        formData
      );
      router.refresh();
      router.push(`/${params.storeId}/colors`);
      toast.success("Color updated successfully!");
    } catch (error) {
      if (axios.isAxiosError(error)) toast.error(error.response?.data);
      else if (error instanceof Error) toast.error(error.message);
      else toast.error("Something went wrong.");
    }
  }

  return (
    <>
      <Heading title="Edit Color" subtitle="Change color details" level="h1" />
      <Separator className="my-4" />
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid min-[600px]:grid-cols-2 lg:grid-cols-4 gap-5">
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
                      placeholder="e.g. Blue"
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
                    <div className="flex items-center space-x-4">
                      <Input
                        {...field}
                        disabled={form.formState.isSubmitting}
                        placeholder="e.g. #0000FF"
                      />
                      <span
                        className="h-6 w-6 rounded border border-slate-700 dark:border-slate-50"
                        style={{ backgroundColor: field.value }}
                      ></span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </Form>
    </>
  );
}
