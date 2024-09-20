"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@nextui-org/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
const formschema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

const Login = () => {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/");
    }
  });
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formschema>>({
    resolver: zodResolver(formschema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formschema>) => {
    console.log(values);
    const res = await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false,
      callbackUrl: "/",
    }).then((res) => {
      if (res?.error) {
        toast({
          variant: "destructive",
          description: res.error,
          title: "UserName or password is wrong",
        });
        console.log("toast lunched");
      }
    });
  };

  return (
    <>
    <div className="w-screen h-screen bg-background container flex flex-col justify-center">
 <div className="lg:w-[500px] w-full h-max m-auto space-y-4 border p-6 border-gray-800 rounded-md">
        <h1 className="text-18-bold">
          Login with your cridentials to access thousends of popular songs
        </h1>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-gray w-full"
                      placeholder="amirsh"
                      {...field}
                      type="name"
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public Username
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
              />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-gray w-full"
                      placeholder="amirsh2831"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormDescription>Your password password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <span id="error" className="text-red-800 text-lg">
              {" "}
            </span>
            <Button
              className="w-full rounded-3xl bg-green text-white shadow-lg"
              type="submit"
            >
              Log in
            </Button>
            <span className="text-title_gray text-14-regular">
              Dont have an account? <Link href="/Signup">Sign Up</Link>
            </span>
          </form>
        </Form>
      </div>

    </div>
         </>
  );
};

export default Login;
