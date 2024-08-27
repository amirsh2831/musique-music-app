"use client";
import React from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { FaBackward } from "react-icons/fa";
import { FaForward } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { setIsPlaying, nextTrack, previousTrack } from "@/redux/PlayerSlice";

const Player = () => {
  const dispatch = useAppDispatch();
  const { playlist, currentTrackIndex, isPlaying, ImageUrl } = useAppSelector(
    (state) => state.player
  );
  const currentTrack = playlist[currentTrackIndex];

  const handleNextTrack = () => {
    dispatch(nextTrack());
  };

  const handlePreviousTrack = () => {
    dispatch(previousTrack());
  };
  const handlePlayPause = () => {
    dispatch(setIsPlaying(!isPlaying));
  };

  if (playlist.length === 0) {
    return null;
  }

  return (
    <>
      <div className="lg:hidden w-full h-[58px] bg-gradient-to-bl from-grad1 to-grad2 backdrop-blur-[250px] text-white shadow-lg flex items-center justify-between px-4 rounded-lg">
        <div className="flex items-center gap-x-2">
          {ImageUrl && (
            <Image
              alt="adele"
              src={ImageUrl}
              width={40}
              height={40}
              className="size-10 rounded-md"
            />
          )}
          <div className="text-left">
            <h2 className="text-16-regular">{currentTrack?.title}</h2>
            <p className="text-12-regular text-title_gray tracking-wide">
              {currentTrack?.artistName}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <FaBackward
            onClick={(e) => {
              e.stopPropagation();
              handlePreviousTrack();
            }}
          />
          {isPlaying ? (
            <FaPause
              onClick={(e) => {
                e.stopPropagation();
                handlePlayPause();
              }}
            />
          ) : (
            <FaPlay
              onClick={(e) => {
                e.stopPropagation();
                handlePlayPause();
              }}
            />
          )}
          <FaForward
            onClick={(e) => {
              e.stopPropagation();
              handleNextTrack();
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Player;
