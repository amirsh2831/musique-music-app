"use client";
import React from "react";
import { SidebarData } from "../constants";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { useState } from "react";
const Sidebar = () => {
  const [listItem, setListItem] = useState(1);
  const handleListItem = (id: number) => {
    setListItem(id);
  };
  return (
    <>
      <div className="w-[300px] sticky top-0 hidden lg:block bg-gray-900 h-screen left-0 space-y-10 pt-4 px-6  border-r-2 border-gray-800">
        <h1 className="sub-header text-white">Musique</h1>
        <div className="space-y-6">
          {SidebarData.map((item, i) => (
            <Link
              href={item.url}
              key={item.text + i}
              onClick={() => handleListItem(item.id)}
            >
              <Button
                variant="shadow"
                radius="md"
                startContent={item.icon}
                className={`hover:bg-green transition-colors w-full h-12 items-center justify-start  bg-transparent shadow-none mb-4 ${
                  listItem === item.id ? "bg-green" : " "
                }`}
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
