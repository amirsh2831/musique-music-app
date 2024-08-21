import type { Metadata } from "next";
import "./global.css";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils";
import { Providers } from "@/redux/Provider";
import AudioPlayer from "@/components/AudioPlayer";
import { AudioRefProvider } from "@/components/contexts/AudioRefProvider";
import PlayerDrawer from "@/components/PlayerDrawer";
import { NextAuthProvider } from "@/components/NextAuthProvider";

// const fontSans = FontSans({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700"],
//   variable: "--font-sans",
// });

export const metadata: Metadata = {
  title: "Musique",
  description:
    "An app to access al your favorite music and artists in a blink of an eye and enjoy high quality music",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background  antialiased relative")}>
        <NextAuthProvider>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <Providers>
              <AudioRefProvider>
                <AudioPlayer />
                {children}
                <PlayerDrawer />
              </AudioRefProvider>
            </Providers>
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
