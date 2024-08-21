'use client'
import Image from "next/image";
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

const formSchema = z.object({
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
});

const Section2 = () => {
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
    <>
      <div className="flex flex-col justify-center items-center mt-20">
        <h1 className="text-black font-bold text-xl md:text-3xl lg:text-5xl ">
          Empowering Healthcare Connections
        </h1>
        <h1 className="text-indigo-700 font-bold text-xl md:text-3xl lg:text-5xl mt-2">
          Discover Our Innovative Platform Services
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mt-16">
          <div className="flex items-center justify-center p-6 max-w-xl">
            <div className="rounded-xl px-6 text-center bg-yellow-50">
              <h1 className="text-indigo-700 font-bold text-3xl mt-14 mb-2">
                Find Job
              </h1>
              <p>
                Explore nationwide job opportunities, connect with colleagues,
                access continuing education, and launch a freelance career with
                ease. Join us to propel your healthcare career to new heights.
              </p>

              <Image
                src="card1.svg"
                width={800}
                height={800}
                alt="card1"
              ></Image>
            </div>
          </div>
          <div className="flex items-center justify-center p-6 max-w-xl">
            <div className="rounded-xl px-6 text-center bg-cyan-200">
              <h1 className="text-indigo-700 font-bold text-3xl mt-14 mb-2">
                Find Job
              </h1>
              <p>
                Explore nationwide job opportunities, connect with colleagues,
                access continuing education, and launch a freelance career with
                ease. Join us to propel your healthcare career to new heights.
              </p>

              <Image
                src="card2.svg"
                width={800}
                height={800}
                alt="card2"
              ></Image>
            </div>
          </div>
        </div>

        <div className="p-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-xl">
            <div className="p-6 max-w-xl ">
              <h1 className="text-black font-bold text-3xl mt-14 mb-2">
                <span className="text-indigo-700">Streamline Hiring</span><br /> Processes and Access Top Talent.
              </h1>
              <p className="mb-8">Effortlessly connect with qualified healthcare professionals on our platform. Filter candidates by specialty and location. Streamline recruitment, manage workforce, and access valuable resources for organizational success.
              </p>

              <div>
        <Button>
          <a href="https://social.doclink.tech">Sign Up Now!</a>
        </Button>
      </div>
            </div>
            <div>
              <Image
                src="card3.svg"
                width={800}
                height={800}
                alt="card3"
              ></Image>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section2;
