"use client";
import React from "react";
import { Recant } from "@/constants";
import Image from "next/image";
import { Card, CardFooter } from "@nextui-org/card";

import Link from "next/link";

const RecantSongs = () => {
  return (
    <>
      <div className="flex gap-x-2 mt-3 overflow-x-scroll remove-scrollbar">
        {Recant.map((item, i) => (
          <Link href={`/Albums/${item.AlbumName}`} key={item.Name + i}>
            <Card className="bg-black/30 lg:w-48 lg:h-56 w-40 h-48 rounded-lg p-4 shadow-lg z-0" isPressable>
              <Image
                width={1000}
                height={1000}
                alt="Cover"
                src={item.image}
                className="z-0 w-full h-full object-cover mb-2 rounded-md "
              />
              <CardFooter>
                <p className="text-12-bold text-white absolute left-2 bottom-2 text-ellipsis text-nowrap">
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
