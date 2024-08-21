"use client";
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { TextGenerateEffect } from './text-generate-effect';
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
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from "axios"

const formSchema = z.object({
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
});


const Section1 = () => {
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
  const words = `Revolutionizing Healthcare Access for`;
  const words1 = `Professional and Employers`;
  return (
    <>
      <div className='flex flex-col justify-center items-center mt-5'>
        <TextGenerateEffect className='text-black font-bold text-xl md:text-3xl lg:text-5xl mt-2 ' words={words} />
        <TextGenerateEffect className='text-indigo-700 font-bold mt-2 text-xl  md:text-3xl lg:text-5xl' words={words1} />
        <p className='max-w-screen-lg mt-2 text-center lg:px-4 px-10 mb-5'>At DocLink, we believe in revolutionizing the way Medical Resources is accessed and delivered. Our comprehensive platform caters to the needs of medical professionals and employers, providing a seamless and innovative solution for all stakeholders in the healthcare industry.</p>
        <div>
        <Button>
          <a href="https://dot.doclink.tech">Sign Up Now!</a>
        </Button>
      </div>
        <div className='mt-5'>
          <Image src="section1.svg" width={1000} height={100} alt='section1' priority={true}></Image>
        </div>
      </div>
    </>
  )
}

export default Section1