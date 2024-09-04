import React from "react";
import { TbFlame } from "react-icons/tb";
import { TrendingData } from "@/constants";
import Image from "next/image";
// import Link from "next/link";
import { Card, CardHeader, CardFooter } from "@nextui-org/card";

const Trending = () => {
  return (
    <>
      <div className="w-max flex gap-2 remove-scrollbar overflow-scroll">
        {TrendingData.map((Data, i) => (
          <Card
            isFooterBlurred
            className=" w-[300px] h-[162px] rounded-xl flex-shrink-0 p-0"
            key={Data.Name + i}
          >
            <CardHeader className="absolute z-50 top-1 left-3 flex backdrop-blur-[100px] rounded-3xl px-3 py-1 items-start bg-black/20 w-fit">
              <TbFlame className="text-orange-700 text-xl" />
              <p className="text-12-regular">Trending</p>
            </CardHeader>
            <Image
              alt="trending background "
              className="w-full h-full rounded-2xl"
              width={400}
              height={145}
              src={Data.image}
            />
            <CardFooter className=" absolute bg-black/40 bottom-2 z-10 left-2  w-fit px-3 py-1 rounded-3xl">
              <Image
                alt="sub image"
                src={Data.subImage}
                width={32}
                height={32}
                className="size-8 rounded-md"
              />
              <div className="ml-1">
                <h4 className="text-14-regular">{Data.Name}</h4>
                <p className="text-12-regular text-title_gray">{Data.By}</p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Trending;
