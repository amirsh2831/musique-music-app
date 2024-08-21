"use client";
import React from "react";
import { FaChevronDown, FaChevronLeft } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import BottomBar from "@/components/BottomBar";
import Tracks from "@/components/Tracks";
import TracksPLaySection from "@/components/TracksPLaySection";
import { useEffect, useState } from "react";

const LikedSongs = () => {
  const [likedSongs, setLikedSongs] = useState<any[]>([]);
  useEffect(() => {
    const fetchLikedSongs = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/Library/get-liked-songs`
      );
      if (response.ok) {
        const data = await response.json();
        setLikedSongs(data.likedSongs);
        console.log(data.likedSongs);
      } else {
        console.error("Failed to fetch liked songs");
      }
    };

    fetchLikedSongs();
  }, []);
  console.log(likedSongs);
  return (
    <>
      <div className="max-w-screen h-screen font-popins container pt-4 relative overflow-hidden space-y-5 glass remove-scrollbar">
        <section className="space-y-2">
          <FaChevronLeft className="text-title_gray" />
          <div className="w-full flex gap-x-3">
            {/* <SearchBar Rounded="3xl" Height="11" /> */}
            <Button
              type="button"
              className="dark:bg-gradient-to-bl dark:from-glass1 dark:to-glass2 h-11 rounded-3xl shadow-lg dark:text-white"
            >
              <span className="flex gap-x-2 items-center">
                Sort <FaChevronDown />
              </span>
            </Button>
          </div>
        </section>
        <section className="space-y-4">
          <Image
            alt="Playlist Banner"
            src="/assets/icons/liked songs.png"
            width={224}
            height={224}
            className="size-56 m-auto"
          />
          <h4 className="text-12-medium text-title_gray text-center">
            Liked Songs
          </h4>
        </section>
        <section className="w-full flex justify-between items-center">
          {/* implement playist capability */}
          <TracksPLaySection tracks={likedSongs} />
        </section>
        <section>
          <Tracks tracks={likedSongs} />
        </section>
      </div>
      <section className=" bottom-0 w-full sticky z-10 px-3">
        <BottomBar />
      </section>
    </>
  );
};

export default LikedSongs;
