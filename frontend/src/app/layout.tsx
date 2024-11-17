import { Toaster } from "@/components/ui/sonner";
import { isLoggedIn } from "@/lib/auth";

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
        <Providers isLoggedIn={isLoggedIn()}>{children}</Providers>
        <Toaster richColors />
        <DateLocale />
      </body>
    </html>
  );
}
