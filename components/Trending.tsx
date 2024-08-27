import React from "react";
import { TbFlame } from "react-icons/tb";
import { TrendingData } from "@/constants";
import Image from "next/image";
import Link from "next/link";
const Trending = () => {
  return (
    <>
      <div className="w-max flex gap-2 remove-scrollbar overflow-scroll">
        {TrendingData.map((Data, i) => (
          <Link href="/Playlists" key={Data.Name + i}>
            <div className=" w-[300px] h-[162px] rounded-xl relative flex-shrink-0">
              <Image
                alt="Trending Banner"
                className="w-full h-full rounded-2xl"
                width={400}
                height={145}
                src={Data.image}
              />
              <div className=" backdrop-blur-[250px] rounded-full flex gap-x-1 items-center w-fit px-3 py-1 absolute top-3 left-3">
                <TbFlame className="text-orange-700 text-xl" />
                <p className="text-12-regular text-white">Trending</p>
              </div>
              <div className=" backdrop-blur-[250px] rounded-full flex gap-x-4 items-center w-fit px-3 py-1 absolute bottom-3 left-3">
                <Image
                  alt="sub image"
                  src={Data.subImage}
                  width={32}
                  height={32}
                  className="size-8 rounded-md"
                />
                <div>
                  <h4 className="text-14-regular text-white">{Data.Name}</h4>
                  <p className="text-12-regular text-white">{Data.By}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Trending;
