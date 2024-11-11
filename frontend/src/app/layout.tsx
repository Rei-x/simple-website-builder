import { Toaster } from "@/components/ui/sonner";

import { DateLocale } from "./date-locale";
import { Providers } from "./providers";
import "./styles.css";

export const metadata = {
  title: "Simple Website Builder",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <Toaster />
        <DateLocale />
      </body>
    </html>
  );
}
