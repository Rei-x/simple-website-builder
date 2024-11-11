"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
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
import { $api } from "@/lib/client";

import { WithGoogle } from "../login/with-google";

const registerSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

export const RegisterForm = () => {
  const register = $api.useMutation("post", "/v1/auth/register", {
    onMutate: () => {
      setIsLoading(true);
    },
    onError: () => {
      setIsLoading(false);
    },
  });
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      confirmPassword: "",
      email: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (data) => {
          await register.mutateAsync(
            {
              body: data,
            },
            {
              onError: (error) => {
                toast.error("Błąd podczas rejestracji");
              },
              onSuccess: () => {
                router.push("/");
              },
            },
          );
        })}
      >
        <CardContent className="flex flex-col gap-2 space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="m@example.com"
                    required
                    {...field}
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
                <FormLabel>Hasło</FormLabel>
                <FormControl>
                  <Input type="password" required {...field} />
                </FormControl>
                <FormDescription>
                  Hasło musi zawierać co najmniej 8 znaków
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Potwierdź hasło</FormLabel>
                <FormControl>
                  <Input type="password" required {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter className="mb-2 flex flex-col gap-4">
          <Button type="submit" className="w-full" loading={isLoading}>
            Zarejestruj się
          </Button>
          <div className="flex gap-2 text-sm">
            <p>Masz już konto?</p>
            <Button variant="link" className="m-0 h-auto w-auto p-0" asChild>
              <Link href="/login">Zaloguj się</Link>
            </Button>
          </div>
        </CardFooter>
      </form>
      <WithGoogle />
    </Form>
  );
};