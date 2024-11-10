"use client";

import { ArrowUpRight, Globe, MoreVertical } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

import { $api } from "@/lib/client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Badge } from "./ui/badge";
import { Button, buttonVariants } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const WebsiteCard = ({
  project,
}: {
  project: {
    id: number;
    name: string;
    domain: string;
  };
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const deleteProject = $api.useMutation("delete", "/v1/website/{id}");
  return (
    <>
      <Card className="transition-shadow duration-300 hover:shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-bold">{project.name}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  setIsOpen(true);
                }}
                className="text-red-600 hover:bg-red-50"
              >
                Usuń
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Globe className="h-4 w-4" />
            <Link
              className={buttonVariants({
                variant: "link",
                className: "mx-2",
              })}
              target="_blank"
              rel="noopener noreferrer"
              href={`http://${project.domain}.localhost:3000`}
            >
              {project.domain}.localhost:3000
            </Link>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Badge variant={"default"}>{project.id}</Badge>
          <Button variant="ghost" size="sm" asChild>
            <Link
              href={`/edit/${project.id}`}
              className="flex items-center space-x-1"
            >
              <span>Edytuj</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Czy na pewno chcesz to zrobić?</AlertDialogTitle>
            <AlertDialogDescription>
              <code>{project.name}</code> zostanie trwale usunięta. Nie można
              tego cofnąć.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anuluj</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={() => {
                deleteProject.mutate(
                  {
                    params: {
                      path: { id: project.id.toString() },
                    },
                  },
                  {
                    onSuccess: () => {
                      setIsOpen(false);
                      toast.success("Strona została usunięta");
                    },
                    onError: (error, lol) => {
                      console.error(error);
                      toast.error("Wystąpił błąd podczas usuwania strony");
                    },
                    onSettled: () => {
                      router.refresh();
                    },
                  },
                );
              }}
            >
              Usuń
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
