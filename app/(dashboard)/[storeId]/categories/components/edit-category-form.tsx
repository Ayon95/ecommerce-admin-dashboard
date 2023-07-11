"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Billboard, Category } from "@prisma/client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditCategoryFormProps {
  initialCategoryData: Category;
  billboards: Billboard[];
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Must contain at least 2 characters" }),
  billboardId: z.string().uuid({ message: "A billboard must be selected" }),
});

type FormData = z.infer<typeof formSchema>;

export default function EditCategoryForm({
  initialCategoryData,
  billboards,
}: EditCategoryFormProps) {
  const params = useParams();
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialCategoryData,
  });

  async function onSubmit(formData: FormData) {
    try {
      await axios.patch<Category>(
        `/api/${params.storeId}/categories/${params.categoryId}`,
        formData
      );
      router.refresh();
      router.push(`/${params.storeId}/categories`);
      toast.success("Category updated successfully!");
    } catch (error) {
      if (axios.isAxiosError(error)) toast.error(error.response?.data);
      else if (error instanceof Error) toast.error(error.message);
      else toast.error("Something went wrong.");
    }
  }

  return (
    <>
      <Heading
        title="Edit Category"
        subtitle="Change category details"
        level="h1"
      />
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
                    <Input {...field} disabled={form.formState.isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={form.formState.isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a billboard" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards.map((billboard) => (
                        <SelectItem key={billboard.id} value={billboard.id}>
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
