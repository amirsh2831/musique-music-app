"use client";
import React from "react";
import { setCurrentTrackIndex, Track } from "@/redux/PlayerSlice";
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { SetImage, setPlaylist } from "@/redux/PlayerSlice";
import HeartIcon from "./HeartIcon";

interface TrackProps {
  id: string;
  title: string;
  artistName: string;
  audioUrl: string;
  albumCover?: string;
}

const Tracks = ({ tracks }: { tracks: TrackProps[] }) => {
  const dispatch = useAppDispatch();
  //   const { isPlaying } = useAppSelector((state) => state.player);

  const handleTrackSelect = (index: number) => {
    dispatch(setCurrentTrackIndex(index - 1));
  };

  return (
    <>
      {tracks.map((item, i) => (
        <div
          className="w-full flex items-center justify-between mb-3 hover:bg-title_gray cursor-pointer"
          key={item.id}
          onClick={(e) => {
            handleTrackSelect(parseInt(item.id));
          }}
        >
          <div className="flex items-center gap-x-2 ">
            {/* Implement playlist capability */}
            {item.albumCover && (
              <Image
                alt="Play list Image"
                src={item.albumCover}
                width={40}
                height={40}
                className="size-10"
              />
            )}

            <div className="space-y-1">
              <h3 className="text-white text-16-regular">{item.title}</h3>
              <p className="text-12-regular text-title_gray">
                {item.artistName}
              </p>
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <BsThreeDots className="text-title_gray text-xl " />
            <HeartIcon songId={item.id} />
          </div>
        </div>
      ))}
    </>
  );
};

export default Tracks;
