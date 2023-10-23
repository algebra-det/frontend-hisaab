"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";

type singUpDataType = {
  name: String;
  email: String;
  password: String;
  confirmPassword: String;
};

const formSchema = z
  .object({
    name: z
      .string()
      .min(1, "Email is required.")
      .min(5, "Name must have more than 8 characters."),
    email: z.string().min(1, "Email is required.").email("Invalid Email"),
    password: z
      .string()
      .min(1, "Password is required.")
      .min(8, "Password must have more than 8 characters."),
    confirmPassword: z.string().min(1, "Confirm Password is required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

async function signUpAPICall(data: singUpDataType) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
      {
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const loginResponse = await response.json();
    console.log("Response object: ", loginResponse);
  } catch (error) {
    console.log("Error while loggin in: ", error);
  }
}

function SingUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("props are : ", values);
    signUpAPICall(values);
  };
  return (
    <div className='w-fit'>
      <h1 className='mb-8 text-2xl'>SingUp Form</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type='text' placeholder='example' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='example@mail.com'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='*********' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='*********' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='w-full' type='submit'>
            Submit
          </Button>
        </form>

        <div className='mx-auto my-4'>
          <p className='text-sm'>
            If you already have an account, please&nbsp;
            <Link href='/login' className='underline'>
              Login
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
}

export default SingUpForm;
