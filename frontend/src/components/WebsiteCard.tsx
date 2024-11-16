"use client";

import { subject } from "@casl/ability";
import { Link1Icon } from "@radix-ui/react-icons";
import { formatDate, formatDistanceToNow } from "date-fns";
import { ArrowUpRight, Globe, MoreVertical } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

import { Can } from "@/hooks/use-permissions";
import type { SchemaWebsiteEntity } from "@/lib/api";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const WebsiteCard = ({ project }: { project: SchemaWebsiteEntity }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const deleteProject = $api.useMutation("delete", "/v1/website/{id}", {
    onMutate: () => {
      setIsLoading(true);
    },
  });
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
              <Can I="delete" this={subject("Website", project)}>
                <DropdownMenuItem
                  onClick={() => {
                    setIsOpen(true);
                  }}
                  className="text-red-600 hover:bg-red-50"
                >
                  Usuń
                </DropdownMenuItem>
              </Can>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Link1Icon className="h-4 w-4" />
            <Link
              className={buttonVariants({
                variant: "link",
                className: "-ml-2 text-slate-500 hover:text-slate-700",
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge className="cursor-default" variant={"default"}>
                  {formatDistanceToNow(new Date(project.updatedAt), {
                    addSuffix: true,
                  })}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                {formatDate(new Date(project.updatedAt), "HH:mm dd.MM.yyyy")}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
              loading={isLoading}
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
                      setIsLoading(false);
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
