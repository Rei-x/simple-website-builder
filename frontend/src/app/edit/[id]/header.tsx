import { IconButton, usePuck } from "@measured/puck";
import { ChevronLeft, ChevronUp, PanelLeft, PanelRight } from "lucide-react";
import Link from "next/link";
import React, { type ReactNode } from "react";

import { Button } from "@/components/ui/button";

import type config from "../../../../puck.config";

export const Header = ({
  children,
  actions,
}: {
  children: ReactNode;
  actions: ReactNode;
}) => {
  const puck = usePuck<typeof config>();
  return (
    <header
      style={{
        background: "var(--puck-color-white)",
        borderBottom: "1px solid var(--puck-color-grey-09)",
        color: "var(--puck-color-black)",
        gridArea: "header",
        position: "relative",
        maxWidth: "100vw",
      }}
    >
      <div
        style={{
          alignItems: "end",
          display: "grid",
          gap: "var(--puck-space-px)",
          gridTemplateAreas: `"left middle right"`,
          gridTemplateColumns: "1fr auto 1fr",
          gridTemplateRows: "auto",
          padding: "var(--puck-space-px)",
        }}
      >
        <div className="flex">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ChevronLeft className="mt-1" />
              Twoje strony
            </Link>
          </Button>
        </div>
        <div className="self-center">
          <p className="font-bold">{puck.appState.data.root.props.name}</p>
        </div>
        <div className="flex justify-end gap-4">{actions}</div>
      </div>
    </header>
  );
};
