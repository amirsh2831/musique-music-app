import React from "react";
import { LuMusic4 } from "react-icons/lu";
import { FiCompass } from "react-icons/fi";
import { TbBookmarks } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
const BottomBar = () => {
  return (
    <>
      <div className="w-full flex justify-between items-center bg-background py-2">
        <Link href="/">
          <div className="flex flex-col items-center justify-center gap-y-1">
            <LuMusic4 className="text-3xl text-green" />
            <p className="text-[12px] font-normal text-green">Music</p>
          </div>
        </Link>
        <Link href="/Explore" className="cursor-pointer">
          <div className="flex flex-col items-center justify-center gap-y-1">
            <FiCompass className="text-3xl text-title_gray" />
            <p className="text-[12px] font-normal text-title_gray">Explore</p>
          </div>
        </Link>
        <Link href="/Library">
          <div className="flex flex-col items-center justify-center gap-y-1">
            <TbBookmarks className="text-3xl text-title_gray" />
            <p className="text-[12px] font-normal text-title_gray">Library</p>
          </div>
        </Link>
        <Link href="/">
          <div className="flex flex-col items-center justify-center gap-y-1">
            <FiSearch className="text-3xl text-title_gray" />
            <p className="text-[12px] font-normal text-title_gray">Search</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default BottomBar;
