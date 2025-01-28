import React from "react";
import BottomBar from "@/components/BottomBar";
// import SearchBar from "@/components/SearchBar";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import TracksPLaySection from "@/components/TracksPLaySection";
import { normalquery } from "@/lib/utils";
import Tracks from "@/components/Tracks";
{
  /* TODO: figure how to implement playlists with invidual pictures */
}

interface PlaylistProps {
  params: {
    slug: string;
  };
}

export default async function PlayLists({ params }: PlaylistProps) {
  const fetchAlbumSongs = async (albumTitle: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/MusicData/${encodeURIComponent(
          albumTitle
        )}`,
        { cache: "no-store" }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch songs");
      }

      const songs = await res.json();
      return songs;
    } catch (error) {
      console.error("Error fetching album songs:", error);
      return [];
    }
  };

  const tracksInfo = await fetchAlbumSongs(params.slug);
  // console.log(tracksInfo);
  return (
    <>
      <div className="max-w-screen top-0 font-popins relative  remove-scrollbar">
        {/* <section className="space-y-2">
          <FaChevronLeft className="text-title_gray lg:hidden" />
          <div className="w-full flex gap-x-3">
            <SearchBar Rounded="3xl" Height="11" />
            <Button
              type="button"
              className="dark:bg-gradient-to-bl dark:from-glass1 dark:to-glass2 h-11 rounded-3xl shadow-lg dark:text-white"
            >
              <span className="flex gap-x-2 items-center">
                Sort <FaChevronDown />
              </span>
            </Button>
          </div>
        </section> */}
        <section className="relative w-full top-0 h-[400px] md:h-auto pt-8 md:pt-0">
          <div className="absolute w-full h-full top-0 left-0 md:hidden">
            <Image
              alt="Playlist Banner"
              src={tracksInfo[0]?.albumCover}
              width={1000}
              height={1000}
              className="w-full h-full object-cover z-0"
            />
          </div>
          <div className=" z-10 absolute w-full h-full top-0 left-0 glass md:hidden">
            {/* mask */}
          </div>
          <Image
            alt="Playlist Banner"
            src={tracksInfo[0]?.albumImage}
            width={1000}
            height={1000}
            className="relative z-20 w-full md:h-72 lg:h-[400px]  object-cover rounded-md overflow-hidden hidden md:block mb-8"
          />

          <Image
            alt="Playlist Banner"
            src={tracksInfo[0]?.albumCover}
            width={1000}
            height={1000}
            className="md:hidden relative z-20 w-42 object-contain h-52 rounded-md overflow-hidden mb-8"
          />
          <h4 className=" relative z-20 text-2xl font-bold md:pl-8 px-4 text-[#f5f5f5] capitalize">
            {normalquery(tracksInfo[0]?.albumTitle)}
          </h4>
          <p className="text-lg md:pl-8 px-4 text-[#c9c9c9] relative z-20">
            By {tracksInfo[0]?.artistName}
          </p>
          <section className="w-full md:px-8 px-4 absolute md:relative md:bottom-0 bottom-[-16px] z-20 flex justify-between items-center">
            {/* implement playist capability */}
            <TracksPLaySection tracks={tracksInfo} />
          </section>
        </section>
        <section className="px-4 md:px-8 bg-black pt-8">
          {" "}
          <Tracks tracks={tracksInfo} />
        </section>
      </div>
    </>
  );
}
