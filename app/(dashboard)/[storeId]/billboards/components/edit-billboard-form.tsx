"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Billboard } from "@prisma/client";
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
import ImageUpload from "@/components/ui/image-upload";
import SafeClientComponentProvider from "@/providers/safe-client-component-provider";

interface EditBillboardFormProps {
  initialBillboardData: Billboard;
}

const formSchema = z.object({
  label: z.string().min(2, { message: "Must contain at least 2 characters" }),
  imageUrl: z.string().url({ message: "Must be a valid URL" }),
});

type FormData = z.infer<typeof formSchema>;

export default function EditBillboardForm({
  initialBillboardData,
}: EditBillboardFormProps) {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialBillboardData,
  });

  async function onSubmit(formData: FormData) {
    try {
      setLoading(true);
      await axios.patch<Billboard>(
        `/api/${params.storeId}/billboards/${params.billboardId}`,
        formData
      );
      router.refresh();
      router.push(`/${params.storeId}/billboards`);
      toast.success("Billboard updated successfully!");
    } catch (error) {
      if (axios.isAxiosError(error)) toast.error(error.response?.data);
      else if (error instanceof Error) toast.error(error.message);
      else toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Heading title="Edit Billboard" subtitle="Change billboard details" level="h1" />
      <Separator className="my-4" />
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={loading}
                    placeholder="e.g. Explore our collection"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <p className="text-sm font-medium">Background Image</p>
                <FormControl>
                  <SafeClientComponentProvider>
                    <ImageUpload
                      imageUrls={field.value ? [field.value] : []}
                      isDisabled={loading}
                      onChange={(imageUrl) => field.onChange(imageUrl)}
                      onRemove={() => field.onChange("")}
                    />
                  </SafeClientComponentProvider>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Save Changes</Button>
        </form>
      </Form>
    </>
  );
}
