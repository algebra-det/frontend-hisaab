"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { getCookie } from "cookies-next";
import { useState } from "react";

const formSchema = z.object({
  productName: z
    .string()
    .min(5, "Product Name is required")
    .max(64, "Product name can't be more than 64 characters"),
  sellingPrice: z.string().refine(
    (v) => {
      let n = Number(v);
      return !isNaN(n) && v?.length > 0;
    },
    { message: "Invalid number" }
  ),
  purchasePrice: z.string().refine(
    (v) => {
      let n = Number(v);
      return !isNaN(n) && v?.length > 0;
    },
    { message: "Invalid number" }
  ),
  profit: z.string().refine(
    (v) => {
      let n = Number(v);
      return !isNaN(n) && v?.length > 0;
    },
    { message: "Invalid number" }
  ),
});

export default function DialogDemo({
  refetchTransactions,
}: {
  refetchTransactions: () => void;
}) {
  const authToken = getCookie("authorization");
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      sellingPrice: "",
      purchasePrice: "",
      profit: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("props are : ", values);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/transactions`,
        {
          headers: {
            Authorization: JSON.parse(JSON.stringify(authToken)),
            "content-type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(values),
        }
      );
      const newTransaction = await response.json();
      if (response.ok) {
        console.log("Response object: ", response.status, newTransaction);
        refetchTransactions();
        setOpen(false);
      } else {
        form.setError("root.serverError", {
          type: response.status.toString(),
          message: newTransaction.message,
        });
      }
      console.log("Response object: ", response.status, newTransaction);
    } catch (error) {
      console.log("Error while loggin in: ", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>Create New Transaction</Button>
      </DialogTrigger>
      <DialogContent className='max-w-[325] sm:max-w-[425px] md:max-w-[625] lg:max-w-[625]'>
        <DialogHeader>
          <DialogTitle>New Transaction: </DialogTitle>
          <DialogDescription>
            Add below details to create a new transaction.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            {form.formState?.errors?.root?.serverError.type && (
              <p className='text-[1rem] font-medium text-destructive'>
                {form.formState?.errors?.root?.serverError.message}
              </p>
            )}
            <FormField
              control={form.control}
              name='productName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product name</FormLabel>
                  <FormControl>
                    <Input type='text' placeholder='Some Product' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='sellingPrice'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selling Price</FormLabel>
                  <FormControl>
                    <Input type='number' placeholder='0' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='purchasePrice'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purchase Price</FormLabel>
                  <FormControl>
                    <Input type='number' placeholder='0' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='profit'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profit</FormLabel>
                  <FormControl>
                    <Input type='number' placeholder='0' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full' type='submit'>
              Submit
            </Button>
          </form>
        </Form>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
