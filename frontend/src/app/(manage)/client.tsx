"use client";

import { Rocket } from "lucide-react";

import { CreateWebsite } from "@/components/CreateWebsite";
import { WebsiteCard } from "@/components/WebsiteCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { $api } from "@/lib/client";

export function Client() {
  const projectsQuery = $api.useSuspenseQuery("get", "/v1/website");

  const projects = projectsQuery.data ?? [];

  return (
    <>
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
    </>
  );
}
