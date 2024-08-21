"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
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
import { Link } from "lucide-react";

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
      <div>
        <Button>
          <a href="https://dot.doclink.tech">Sign Up Now!</a>
        </Button>
      </div>
    </section>
  );
};
