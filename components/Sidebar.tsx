import React from "react";
import { SidebarData } from "../constants";
import Link from "next/link";

const Sidebar = () => {
  return (
    <>
      <div className="w-[300px] hidden lg:block bg-gray-900 h-screen left-0 space-y-10 pt-4 px-6  overflow-hidden border-r-2 border-gray-800">
        <h1 className="sub-header text-white">Wellcome to Musique</h1>
        <div className="space-y-2">
          {SidebarData.map((item, i) => (
            <Link href={item.url} key={item.text + i}>
              <div className="flex gap-4 pl-2 cursor-pointer hover:bg-green transition-colors hover:shadow-sm w-full h-12 rounded-md items-center">
                <span className="text-2xl text-white">{item.icon}</span>
                <p className="text-18-bold text-white">{item.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
