import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="text-center">
        <Loader2 className="mx-auto h-16 w-16 animate-spin text-primary" />
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Ładujemy twoje stronki :)
        </h2>
        <p className="mt-2 text-muted-foreground">Chwilka i będzie gotowe</p>
      </div>
    </div>
  );
};

export default Loading;
