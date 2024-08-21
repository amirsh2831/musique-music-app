"use client";
import React from "react";
import Image from "next/image";
import { RiHeartLine } from "react-icons/ri";
import { BsArrowDownCircle } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { SetImage, setPlaylist, Track } from "@/redux/PlayerSlice";

interface TrackProps {
  id: string;
  title: string;
  artistName: string;
  audioUrl: string;
  albumCover?: string;
  artistId: string;
  albumId?: string;
  duration: string;
}

const TracksPLaySection = ({ tracks }: { tracks: TrackProps[] }) => {
  const dispatch = useAppDispatch();
  const { isPlaying } = useAppSelector((state) => state.player);

  const handlePlaylistSelect = (tracks: Track[], imageUrl: string) => {
    dispatch(setPlaylist(tracks));
    dispatch(SetImage(imageUrl));
  };

  return (
    <>
      <div className="flex items-center gap-x-8 text-2xl text-title_gray">
        <RiHeartLine />
        <BsArrowDownCircle />
        <BsThreeDots />
      </div>
      <Image
        alt="Play Button"
        src="/assets/icons/playButton.svg"
        width={56}
        height={56}
        className="size-14 shadow-lg"
        onClick={() => {
          handlePlaylistSelect(
            tracks,
            tracks[0].albumCover ? tracks[0].albumCover : " "
          );
        }}
      />
    </>
  );
};

export default TracksPLaySection;
