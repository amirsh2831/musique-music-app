"use client";
import React from "react";
import { Recant } from "@/constants";
import Image from "next/image";
import { Card, CardFooter } from "@nextui-org/card";
import { FaRegCirclePlay } from "react-icons/fa6";

import Link from "next/link";

const RecantSongs = () => {
  return (
    <>
      <div className="flex gap-x-4 mt-3 overflow-x-scroll remove-scrollbar">
        {Recant.map((item, i) => (
          <Link href={`/Albums/${item.AlbumName}`} key={item.Name + i}>
            <Card
              className="bg-black/30 lg:w-48 relative w-36 h-40 lg:h-48 rounded-lg shadow-lg z-0"
              isPressable
            >
              <Image
                width={1000}
                height={1000}
                alt="Cover"
                src={item.image}
                className="z-0 w-full h-full lg:object-contain object-cover rounded-md "
              />
              <div className=" absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10 ">
                <FaRegCirclePlay className="text-4xl" />
              </div>
              <div className=" w-full  absolute bottom-2 left-1 z-10 text-white whitespace-nowrap overflow-hidden text-ellipsis line-clamp-1 md:text-md text-sm text-left">
                {item.Name}
              </div>
              {/* <CardFooter>
                <p className="text-12-bold text-white absolute left-2 bottom-2 text-ellipsis text-nowrap">
                  {item.Name}
                </p>
              </CardFooter> */}
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default RecantSongs;
