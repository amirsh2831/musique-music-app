"use client";
import React from "react";
import { Recant } from "@/constants";
import Image from "next/image";
import { Card, CardFooter } from "@nextui-org/card";

import Link from "next/link";

const RecantSongs = () => {
  return (
    <>
      <div className="flex gap-x-2 mt-3 overflow-scroll remove-scrollbar">
        {Recant.map((item, i) => (
          <Link href={`/Albums/${item.AlbumName}`} key={item.Name + i}>
            <Card className="bg-black/30 rounded-lg p-2 shadow-lg" isPressable>
              <Image
                width={1000}
                height={1000}
                alt="Cover"
                src={item.image}
                className="z-0 w-full h-full object-cover"
              />
              <CardFooter>
                <p className="text-[12px] font-normal text-white absolute left-2 bottom-2 text-ellipsis text-nowrap">
                  {item.Name}
                </p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default RecantSongs;
