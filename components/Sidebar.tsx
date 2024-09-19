import React from "react";
import { SidebarData } from "../constants";
import Link from "next/link";
import { Button } from "@nextui-org/button";

const Sidebar = () => {
  return (
    <>
      <div className="w-[300px] hidden lg:block bg-gray-900 h-screen left-0 space-y-10 pt-4 px-6  overflow-hidden border-r-2 border-gray-800">
        <h1 className="sub-header text-white">Wellcome to Musique</h1>
        <div className="space-y-2">
          {SidebarData.map((item, i) => (
            <Link href="/" key={item.text + i}>
              <Button
                variant="shadow"
                radius="md"
                startContent={item.icon}
                className="hover:bg-green transition-colors w-full h-12 items-center justify-start bg-transparent shadow-none"
              >
                <p className="text-18-bold text-white">{item.text}</p>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
