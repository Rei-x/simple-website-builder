import { ChevronsUpDown, LogOut } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { serverFetchClient } from "@/lib/client.server";

import { Button } from "./ui/button";

export async function NavUser() {
  const user = await serverFetchClient.GET("/v1/user");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-none">
          <Avatar className="h-8 w-8 rounded-lg">
            {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
            <AvatarFallback className="rounded-lg">
              {user.data?.displayName
                .split(" ")
                .map((name) => name[0])
                .slice(0, 2)
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              {user.data?.displayName}
            </span>
            <span className="truncate text-xs">{user.data?.email}</span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side={"bottom"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarFallback className="rounded-lg">
                {user.data?.displayName
                  .split(" ")
                  .map((name) => name[0])
                  .slice(0, 2)
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {user.data?.displayName}
              </span>
              <span className="truncate text-xs">{user.data?.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <form method="POST" action="/api/v1/auth/logout">
            <button className="flex w-full items-center gap-2">
              Wyloguj się
              <LogOut />
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
