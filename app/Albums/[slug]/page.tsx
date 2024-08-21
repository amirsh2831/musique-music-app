import React from "react";
import BottomBar from "@/components/BottomBar";
import SearchBar from "@/components/SearchBar";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

import { BsThreeDots } from "react-icons/bs";
import { Songs } from "@/constants";
import Image from "next/image";
import { Track } from "@/redux/PlayerSlice";
import TracksPLaySection from "@/components/TracksPLaySection";
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
  // const handleFetch = async (PlayListParams: string) => {
  //   try {
  //     const [albumResponse, trackResponse] = await Promise.all([
  //       fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data/albums.json`, {
  //         cache: "no-store",
  //       }),
  //       fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data/tracks.json`, {
  //         cache: "no-store",
  //       }),
  //     ]);
  //     if (!albumResponse.ok || !trackResponse.ok) {
  //       throw new Error("Failed to load playlist metadata");
  //     }
  //     const [albums, tracks] = await Promise.all([
  //       albumResponse.json(),
  //       trackResponse.json(),
  //     ]);

  //     const filteredAlbums: AlbumProps[] = albums.filter(
  //       (album: any) => album.title === PlayListParams
  //     );
  //     const filteredTracks: TrackProps[] = tracks.filter(
  //       (track: any) => track?.albumId === filteredAlbums[0].id
  //     );

  //     return {
  //       filteredAlbums,
  //       filteredTracks,
  //     };
  //   } catch (error) {
  //     console.error("Error loading playlist:", error);
  //     const ErrorData = {
  //       filteredAlbums: [],
  //       filteredTracks: [],
  //     };
  //     return ErrorData;
  //   }
  // };
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
  console.log(tracksInfo);
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
            src={tracksInfo[0].albumCover}
            width={224}
            height={224}
            className="size-56 m-auto"
          />
          <h4 className="text-12-medium text-title_gray text-center">30</h4>
        </section>
        <section className="w-full flex justify-between items-center">
          {/* implement playist capability */}
          <TracksPLaySection tracks={tracksInfo} />
        </section>
        <section>
          {" "}
          <Tracks tracks={tracksInfo} />{" "}
        </section>
      </div>
      <section className=" bottom-0 w-full sticky z-10 px-3">
        <BottomBar />
      </section>
    </>
  );
}
