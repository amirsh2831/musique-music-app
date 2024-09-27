"use client";
import React from "react";
import { SidebarData } from "../constants";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import {useState} from "react";
const Sidebar = () => {
        const [listItem, setListItem] = useState(1);
        const handleListItem = (id) => {
                setListItem(id)
        }
  return (
    <>
      <div className="w-[300px] hidden lg:block bg-gray-900 h-screen left-0 space-y-10 pt-4 px-6  overflow-hidden border-r-2 border-gray-800">
        <h1 className="sub-header text-white">Wellcome to Musique</h1>
        <div className="space-y-2">
          {SidebarData.map((item, i) => (
            <Link href={item.url} key={item.text + i} onClick={() => handleListItem(i + 1)}>
              <Button
                variant="shadow"
                radius="md"
                startContent={item.icon}
                className={`hover:bg-green transition-colors w-full h-12 items-center justify-start bg-transparent shadow-none ${listItem - 1 === i ? "bg-green" : " "}`}
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
