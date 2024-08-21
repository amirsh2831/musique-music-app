"use client";
import React from "react";
import { Recant } from "@/constants";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { SetImage, setPlaylist } from "@/redux/PlayerSlice";
import { Track } from "@/redux/PlayerSlice";
import { IoPlayCircleOutline, IoPauseCircleOutline } from "react-icons/io5";
import Link from "next/link";

const RecantSongs = () => {
  const dispatch = useAppDispatch();
  const { isPlaying } = useAppSelector((state) => state.player);
  const handlePlaylistSelect = async (
    metadataUrl: string,
    imageUrl: string
  ) => {
    try {
      const response = await fetch(metadataUrl);
      if (!response.ok) {
        throw new Error("Failed to load playlist metadata");
      }
      const tracks: Track[] = await response.json();
      dispatch(setPlaylist(tracks));
      dispatch(SetImage(imageUrl));
    } catch (error) {
      console.error("Error loading playlist:", error);
    }
  };
  return (
    <>
      <div className="flex gap-x-2 mt-3 overflow-scroll remove-scrollbar">
        {Recant.map((item, i) => (
          <Link href={`/Albums/${item.AlbumName}`} key={item.Name + i}>
            <div className="relative flex-shrink-0">
              <Image
                alt="recant songs banner"
                src={item.PlayImage}
                width={1000}
                height={1000}
                className=" size-32 rounded-lg"
              />
              <p className="text-[12px] font-normal text-white absolute left-2 bottom-2 text-ellipsis text-nowrap">
                {item.Name}
              </p>
              {/* <div className="absolute left-0 right-0 m-auto w-6 text-white text-3xl">
                {isPlaying ? (
                  <IoPauseCircleOutline
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlaylistSelect(item.metadata, item.PlayImage);
                    }}
                  />
                ) : (
                  <IoPlayCircleOutline
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlaylistSelect(item.metadata, item.PlayImage);
                    }}
                  />
                )}
              </div> */}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default RecantSongs;
