'use client'
import Image from "next/image";
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

              <Drawer>
                <DrawerTrigger>
                  <span className="bg-indigo-600 p-3 text-white rounded h-2 ">Join The Waitlist</span>
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
                  <div className="max-w-4xl">
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
