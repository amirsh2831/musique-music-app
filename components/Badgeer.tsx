"use client";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { SelectionFilter } from "@/constants";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
const Badgeer = ({ wrap }: { wrap?: boolean }) => {
  const session = useSession();
  const [selected, setSelected] = useState("");
  const handleClick = (filter: string) => {
    setSelected(filter);
    if (session.status === "authenticated") {
      signOut();
    }
  };
  return (
    <>
      <div
        className={`flex gap-2 mt-4 overflow-scroll remove-scrollbar ${
          wrap === true ? "flex-wrap overflow-hidden" : "flex-nowrap"
        }`}
      >
        {SelectionFilter.map((filter, i) => (
          <Badge
            onClick={() => handleClick(filter)}
            key={filter + i}
            className={` border-green font-normal px-3 py-2 text-[16px] leading-[16px] cursor-pointer select-none text-nowrap ${
              selected === filter
                ? "bg-dark_green text-green"
                : "bg-transparent text-white "
            }`}
          >
            {filter}
          </Badge>
        ))}
      </div>
    </>
  );
};

export default Badgeer;
