import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Player from "./hoverPlay";
import PlayerControls from "@/app/MusicControler/page";

const PlayerDrawer = () => {
  return (
    <>
      <div className="w-full px-4 fixed bottom-16 z-40">
        <Drawer>
          <DrawerTrigger className="w-full">
            <Player />
          </DrawerTrigger>
          <DrawerContent>
            <PlayerControls />
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};

export default PlayerDrawer;
