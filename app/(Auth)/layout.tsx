import react from "react";
import { Toaster } from "@/components/ui/toaster";

export default function LogInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html suppressHydrationWarning>
        <body>
          {children}
          <Toaster />
        </body>
      </html>
    </>
  );
}
