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
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const formschema = z.object({
  email: z.string().min(2).max(50),
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
  confirmPassword: z.string().min(2).max(50),
});

const Signup = () => {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/");
    }
  });
  const { toast } = useToast();
  async function onSubmit(values: z.infer<typeof formschema>) {
    const { email, username, password, confirmPassword } = values;
    if (password === confirmPassword) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, username, password }),
        }
      ).then((response) => {
        if (response.statusText === "User Exists") {
          toast({
            title: "Email is already used",
            description: "Please try to Login or use a different email",
            action: (
              <ToastAction altText="Login">
                <Link href="/LogIn">Login</Link>
              </ToastAction>
            ),
          });
        } else if (response.ok) {
          toast({
            variant: "success",
            title: "Account Created",
            description: "You can Log into the website now..",
            action: (
              <ToastAction altText="Login">
                <Link href="/Login">Login</Link>
              </ToastAction>
            ),
          });
          //   router.replace("./LogIn");
        } else {
          toast({
            variant: "destructive",
            title: "Unknown error occured",
            description: "Try again in a few minutes",
            action: (
              <ToastAction altText="Login">
                <Link href="/Login">Login</Link>
              </ToastAction>
            ),
          });
        }
      });
    } else {
      toast({
        variant: "destructive",
        title: "Password confirmation is wrong..",
        description: "Passwords dont match",
      });
    }
  }
  const form = useForm<z.infer<typeof formschema>>({
    resolver: zodResolver(formschema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <>
      <div className="w-screen h-screen overflow-hidden bg-background container pt-4 space-y-4">
        <h1 className="text-18-bold">
          Sign up to our great app to unlock the world of musique
        </h1>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-slate-950 w-full"
                      placeholder="amirsh"
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-slate-950 w-full"
                      placeholder="amirsh"
                      {...field}
                      type="name"
                    />
                  </FormControl>
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
                      className="bg-slate-950 w-full"
                      placeholder="amirsh2831"
                      {...field}
                      type="password"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-slate-950 w-full"
                      placeholder="amirsh2831"
                      {...field}
                      type="password"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full rounded-3xl bg-green text-white shadow-lg"
              type="submit"
            >
              Sign Up
            </Button>
            <span className="text-title_gray text-14-regular">
              Already have an account?{" "}
              <Link href="/Signup" className="underline text-blue-800">
                Login
              </Link>
            </span>
          </form>
        </Form>
      </div>
    </>
  );
};

export default Signup;
