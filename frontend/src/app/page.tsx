import { Globe, Rocket } from "lucide-react";

import { CreateWebsite } from "@/components/CreateWebsite";
import { WebsiteCard } from "@/components/WebsiteCard";
import { NavUser } from "@/components/nav-user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
          <CreateWebsite className="ml-auto mr-4" />
          <NavUser
            user={{
              name: "Bartosz Gotowski",
              email: "272647@student.pwr.edu.pl",
              avatar: "/avatars/shadcn.jpg",
            }}
          />
        </div>
      </header>
      {projects.length === 0 ? (
        <div className="flex justify-center">
          <Card className="mt-8 max-w-lg">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold">
                Czas zrobić pierwszy krok!
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Rocket className="mb-6 h-24 w-24 text-primary" />
              <p className="mb-6 max-w-md text-center text-gray-600 dark:text-gray-400">
                Zacznij przez stworzenie swojej pierwszej strony. Kliknij
                przycisk by zacząć kreować!
              </p>
              <CreateWebsite />
            </CardContent>
          </Card>
        </div>
      ) : null}
      <div className="container mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <WebsiteCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
