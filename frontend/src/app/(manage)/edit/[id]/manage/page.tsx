"use client";

import { ChevronLeft, MoreHorizontal, Plus, Search, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Role } from "@/lib/api";
import { $api } from "@/lib/client";

export default function UserManagement({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const members = $api.useQuery("get", "/v1/website/{websiteId}/member", {
    params: {
      path: {
        websiteId: params.id,
      },
    },
  });

  const deleteMember = $api.useMutation(
    "delete",
    "/v1/website/{websiteId}/member/{id}",
  );

  const addMember = $api.useMutation("post", "/v1/website/{websiteId}/member");

  const updateMember = $api.useMutation(
    "patch",
    "/v1/website/{websiteId}/member/{id}",
    {
      onError: () => {
        toast.error("Nie udało się zaktualizować roli użytkownika");
      },
    },
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [isInviteUserDialogOpen, setIsInviteUserDialogOpen] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState<Role>(Role.USER);

  const filteredUsers = members.data?.filter(
    (member) =>
      member.user.displayName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      member.user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const inviteUser = async () => {
    if (!newUserEmail) return;

    const toastId = toast.loading("Wysyłanie zaproszenia...");

    addMember.mutate(
      {
        body: {
          email: newUserEmail,
          role: newUserRole,
        },
        params: {
          path: {
            websiteId: params.id,
          },
        },
      },
      {
        onSuccess: async () => {
          toast.success(`Zaproszenie zostało wysłane do ${newUserEmail}.`, {
            id: toastId,
          });
          await members.refetch();
          setNewUserEmail("");
          setNewUserRole(Role.USER);
          setIsInviteUserDialogOpen(false);
        },
        onError: (err) => {
          if (err.statusCode === 404) {
            toast.error("Nie znaleziono konta", {
              description:
                "Użytkownik musi mieć już założone konto, żebyś mógł go zaprosić do swojej strony.",
              id: toastId,
              duration: 10000,
            });
          } else {
            toast.error("Nie udało się wysłać zaproszenia", {
              id: toastId,
            });
          }
        },
      },
    );
  };

  const updateUserRole = (memberId: number, newRole: Role) => {
    updateMember.mutate(
      {
        body: {
          role: newRole,
        },
        params: {
          path: {
            id: memberId.toString(),
            websiteId: params.id,
          },
        },
      },
      {
        onSuccess: async () => {
          await members.refetch();
        },
      },
    );
  };

  const removeUser = (memberId: number) => {
    const user = members.data?.find((member) => member.id === memberId);

    toast.promise(
      deleteMember.mutateAsync(
        {
          params: {
            path: {
              id: memberId.toString(),
              websiteId: params.id,
            },
          },
        },
        {
          onSuccess: async () => {
            await members.refetch();
          },
        },
      ),
      {
        loading: "Usuwanie użytkownika...",
        error: "Nie udało się usunąć użytkownika",
        success: `Użytkownik ${user?.user.displayName ?? user?.user.email} został usunięty.`,
      },
    );
  };

  return (
    <div className="container max-w-screen-lg py-10">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href={`/edit/${params.id}`}>
          <ChevronLeft className="mt-1" />
          Edytuj
        </Link>
      </Button>

      <h1 className="mb-5 text-2xl font-bold">Zarządzanie użytkownikami</h1>

      <div className="mb-4 flex items-center justify-between">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Szukaj użytkowników"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Dialog
          open={isInviteUserDialogOpen}
          onOpenChange={setIsInviteUserDialogOpen}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Zaproś użytkownika
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Zaproś nowego użytkownika</DialogTitle>
              <DialogDescription>
                Wprowadź adres e-mail użytkownika, którego chcesz zaprosić.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="email" className="text-right">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="role" className="text-right">
                  Rola
                </label>
                <Select
                  value={newUserRole}
                  onValueChange={(value: Role) => setNewUserRole(value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Wybierz rolę" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={Role.USER}>Członek</SelectItem>
                    <SelectItem value={Role.ADMIN}>Właściciel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={inviteUser}
                disabled={addMember.isPending || !newUserEmail}
              >
                {addMember.isPending ? "Wysyłanie..." : "Wyślij zaproszenie"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-md border">
        {members.isLoading ? (
          <div className="p-4 text-center">Wczytywanie...</div>
        ) : members.isError ? (
          <div className="p-4 text-center text-red-600">
            Błąd wczytywania użytkowników
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nazwa</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rola</TableHead>
                <TableHead className="text-right">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers?.map(({ user, role, id }) => (
                <TableRow key={user.id}>
                  <TableCell>{user.displayName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Select
                      value={role}
                      onValueChange={(value: Role) => updateUserRole(id, value)}
                      disabled={updateMember.isPending}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={Role.USER}>Członek</SelectItem>
                        <SelectItem value={Role.ADMIN}>Właściciel</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Otwórz menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Akcje</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => removeUser(id)}
                          className="text-red-600"
                          disabled={deleteMember.isPending}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          {deleteMember.isPending ? "Usuwanie..." : "Usuń"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
