import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { isLoggedIn } from "@/lib/auth";

import { RegisterForm } from "./register-form";

const Login = () => {
  if (isLoggedIn()) {
    return redirect("/");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="flex w-[400px] flex-col justify-center">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Stwórz konto</CardTitle>
          <CardDescription>
            Wpisz swój adres email i hasło, by móc budować super stronki
          </CardDescription>
        </CardHeader>
        <RegisterForm />
      </Card>
    </div>
  );
};

export default Login;
