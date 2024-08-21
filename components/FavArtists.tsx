import React from "react";
import { Artists } from "@/constants";
import Image from "next/image";

const FavArtists = () => {
  return (
    <>
      <div className="w-full flex flex-wrap justify-between items-center space-y-3">
        {Artists.map((artist, i) => (
          <div
            className="flex flex-col items-center gap-y-3"
            key={artist.Name + i}
          >
            <Image
              alt="artist image"
              src={artist.Image}
              width={96}
              height={96}
              className="size-24 rounded-full"
            />
            <h4 className="text-14-regular text-white ">{artist.Name}</h4>
          </div>
        ))}
      </div>
    </>
  );
};

export default FavArtists;
