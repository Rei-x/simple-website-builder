import { PanelsTopLeft, Rocket } from "lucide-react";
import { redirect } from "next/navigation";

import { CreateWebsite } from "@/components/CreateWebsite";
import { NavUser } from "@/components/nav-user";
import { checkAuth, isLoggedIn } from "@/lib/auth";

import { Client } from "./client";

export const dynamic = "force-dynamic";

export default async function Page() {
  checkAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="mb-2 mt-16 flex h-16 shrink-0 items-center gap-2 bg-white shadow-sm transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="container mb-8 flex w-full justify-between">
          <div className="flex items-center gap-3">
            <PanelsTopLeft className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Simple Website Builder</h1>
          </div>
          <CreateWebsite className="ml-auto mr-4" />
          <NavUser />
        </div>
      </header>
      <Client />
    </div>
  );
}
