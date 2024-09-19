import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils";
import { Providers } from "@/redux/Provider";
import AudioPlayer from "@/components/AudioPlayer";
import { AudioRefProvider } from "@/components/contexts/AudioRefProvider";
import PlayerDrawer from "@/components/PlayerDrawer";
import { NextAuthProvider } from "@/components/NextAuthProvider";
import Sidebar from "@/components/Sidebar";
import LargePlayerControls from "@/components/LargePlayerControls";
import BottomBar from "@/components/BottomBar";

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
    <>
    <div className="flex w-full h-full overflow-hidden">
      <Sidebar />
      <div className="lg:overflow-scroll w-full remove-scrollbar">
        <AudioPlayer />
        {children}
        <PlayerDrawer />
      </div>
    </div>
    <LargePlayerControls />
    <BottomBar/>
    
    </>
  );
}
