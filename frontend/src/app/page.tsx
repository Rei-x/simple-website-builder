import {
  ArrowUpRight,
  GitBranch,
  Globe,
  MoreVertical,
  PlusIcon,
} from "lucide-react";
import Link from "next/link";

import { CreateWebsite } from "@/components/CreateWebsite";
import { NavUser } from "@/components/nav-user";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchClient } from "@/lib/client";

export default async function Page() {
  const projectsResponse = await fetchClient.GET("/v1/website");

  if (projectsResponse.error) {
    return (
      <div className="min-h-screen bg-slate-50">
        Błąd
        <pre>{JSON.stringify(projectsResponse.error, null, 2)}</pre>
      </div>
    );
  }

  const projects = projectsResponse.data;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="mb-2 mt-16 flex h-16 shrink-0 items-center gap-2 bg-white shadow-sm transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="container mb-8 flex w-full justify-between">
          <div className="flex items-center gap-3">
            <Globe className="h-8 w-8" />
            <h1 className="text-3xl font-bold">Strony</h1>
          </div>
          <CreateWebsite />
          <NavUser
            user={{
              name: "Bartosz Gotowski",
              email: "272647@student.pwr.edu.pl",
              avatar: "/avatars/shadcn.jpg",
            }}
          />
        </div>
      </header>

      <div className="container mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Card
            key={project.id}
            className="transition-shadow duration-300 hover:shadow-lg"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-bold">
                {project.name}
              </CardTitle>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
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
        ))}
      </div>
    </div>
  );
}
