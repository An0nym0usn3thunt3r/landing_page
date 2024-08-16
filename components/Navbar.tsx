"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
});

export const Navbar = () => {

  const [state, setState] = useState<string>();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const router = useRouter()

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(`/api/create`, values)
      toast.success("You are in the waitlist")
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong")
    }
  };
  return (
    <section className="flex w-full justify-between items-center h-16 border-b px-10">
      <h1 className="text-xl font-bold">
        DOC<span className="text-indigo-600">LINK</span>
      </h1>

      <Drawer>
        <DrawerTrigger>
          <span className="bg-indigo-600 p-3 text-white rounded h-2">Join The Waitlist</span>
        </DrawerTrigger>
        <DrawerContent className="flex justify-center items-center">
          <div className="flex flex-row justify-between gap-x-[350px] mb-5  ">
            <div>
              <h1 className="text-xl font-semibold">Doc<span className="text-indigo-700">Link</span></h1>
            </div>
            <div>
              <h1 className="text-xl font-semibold">Join The WaitList</h1>
            </div>
          </div>
          <div className="max-w-xl">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Email ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DrawerFooter className="flex flex-row justify-center gap-x-[120px] ">
                  <Button disabled={isSubmitting} type="submit">Submit</Button>
                  <DrawerClose>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </form>
            </Form>
          </div>
        </DrawerContent>
      </Drawer>
    </section>
  );
};
