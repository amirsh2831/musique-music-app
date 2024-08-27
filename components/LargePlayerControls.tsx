"use client";
import React from "react";
import {
  FaShuffle,
  FaBackwardStep,
  FaForwardStep,
  FaRepeat,
} from "react-icons/fa6";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { LuMonitorSpeaker } from "react-icons/lu";
import { Slider } from "@/components/ui/slider";
import { MdVolumeUp } from "react-icons/md";
import { useAudioRef } from "@/components/contexts/AudioRefProvider";
import {
  setIsPlaying,
  setCurrentTime,
  nextTrack,
  previousTrack,
} from "@/redux/PlayerSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import Image from "next/image";
import { Button } from "./ui/button";

const LargePlayerControls = () => {
  const dispatch = useAppDispatch();
  const { playlist, currentTrackIndex, isPlaying, currentTime, ImageUrl } =
    useAppSelector((state) => state.player);
  const currentTrack = playlist[currentTrackIndex];
  const { audioRef } = useAudioRef();
  const handlePlayPause = () => {
    dispatch(setIsPlaying(!isPlaying));
    console.log(currentTrack);
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      const time = value[0];
      audioRef.current.currentTime = time;
      dispatch(setCurrentTime(time));
    }
  };

  const handleNextTrack = () => {
    dispatch(nextTrack());
  };

  const handlePreviousTrack = () => {
    dispatch(previousTrack());
  };

  return (
    <>
      <div className="w-screen max-h-24 bg-gray-900 bottom-0 px-6 py-2 hidden lg:block sticky overflow-x-hidden border-t-2 border-gray-800">
        <div className="w-full flex items-center">
          <div className="flex-1">
            <div className="flex items-center gap-x-2 ">
              {ImageUrl && (
                <Image
                  alt="song cover"
                  src={ImageUrl}
                  width={40}
                  height={40}
                  className="size-10 rounded-md"
                />
              )}
              <div className="text-white">
                <h2 className="text-14-regular">
                  {currentTrack?.title ? currentTrack.title : "Loading"}
                </h2>
                <p className="text-12-regular">
                  {currentTrack?.artistName
                    ? currentTrack.artistName
                    : "Loading"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center flex-1 w-full">
            <div className=" flex justify-between items-center text-title_gray text-xl w-[60%] mx-auto">
              <FaShuffle />
              <FaBackwardStep onClick={handlePreviousTrack} />
              <Button onClick={handlePlayPause} className="">
                {isPlaying ? (
                  <FaPauseCircle className={`text-4xl text-white`} />
                ) : (
                  <FaPlayCircle className={`text-4xl text-white`} />
                )}
              </Button>
              <FaForwardStep onClick={handleNextTrack} />
              <FaRepeat />
            </div>
            <div className="flex gap-2 w-full">
              <p>
                {Math.floor(currentTime / 60)}:
                {Math.floor(currentTime % 60).toLocaleString("en-US", {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                })}
              </p>
              <Slider
                min={0}
                value={[currentTime]}
                max={audioRef.current?.duration}
                step={5}
                onValueChange={handleSeek}
                className=" w-[90%]"
              />
              <p>
                {Math.floor((audioRef.current?.duration || 0) / 60)}:
                {Math.floor(
                  (audioRef.current?.duration || 0) % 60
                ).toLocaleString("en-US", {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                })}
              </p>
            </div>
          </div>
          <div className="w-[15%] justify-self-end flex-1">
            <div className="flex items-center justify-end text-3xl text-title_gray gap-4">
              <LuMonitorSpeaker />
              <MdVolumeUp />
              <Slider
                defaultValue={[33]}
                max={100}
                step={5}
                className=" w-[156px]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LargePlayerControls;
