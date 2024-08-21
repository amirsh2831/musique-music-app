"use client";
import React from "react";
import { FaChevronDown } from "react-icons/fa6";
import BottomBar from "@/components/BottomBar";
import { LuMonitorSpeaker } from "react-icons/lu";
import { RxUpload } from "react-icons/rx";
import { LuListMusic } from "react-icons/lu";
import { HiOutlineQueueList } from "react-icons/hi2";
import { BsThreeDots } from "react-icons/bs";
import {
  FaShuffle,
  FaBackwardStep,
  FaForwardStep,
  FaRepeat,
} from "react-icons/fa6";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import {
  setIsPlaying,
  setCurrentTime,
  nextTrack,
  previousTrack,
} from "@/redux/PlayerSlice";
import { Button } from "@/components/ui/button";
import { useAudioRef } from "@/components/contexts/AudioRefProvider";

const PlayerControls = () => {
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
      <div className="max-w-screen h-full font-popins container pt-4 relative overflow-hidden glass flex flex-col justify-between items-left pb-8">
        <section className="space-y-4">
          {ImageUrl && (
            <Image
              alt="song banner"
              src={ImageUrl}
              width={300}
              height={300}
              className="size-[300px] rounded-2xl m-auto shadow-lg"
            />
          )}
          <div>
            <h1 className="text-3xl text-white">{currentTrack?.title}</h1>
            <p className="text-16-regular text-title_gray">
              {currentTrack?.artistName}
            </p>
          </div>
        </section>
        <section className="space-y-5">
          <div className="w-full flex justify-between items-center text-2xl text-title_gray">
            <LuMonitorSpeaker />
            <RxUpload />
            <LuListMusic />
            <HiOutlineQueueList />
            <BsThreeDots />
          </div>
          <div className="w-full space-y-2">
            <Slider
              min={0}
              value={[currentTime]}
              max={audioRef.current?.duration}
              step={5}
              onValueChange={handleSeek}
              className=""
            />
            <div className="w-full flex justify-between items-center text-14-regular text-title_gray">
              <p>
                {Math.floor(currentTime / 60)}:
                {Math.floor(currentTime % 60).toLocaleString("en-US", {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                })}
              </p>
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
          <div className="w-full flex justify-between items-center text-title_gray text-2xl">
            <FaShuffle />
            <FaBackwardStep
              onClick={handlePreviousTrack}
              className="cursor-pointer"
            />
            <Button onClick={handlePlayPause} className="">
              {isPlaying ? (
                <FaPauseCircle className={`text-5xl text-white`} />
              ) : (
                <FaPlayCircle className={`text-5xl text-white`} />
              )}
            </Button>
            <FaForwardStep
              onClick={handleNextTrack}
              className="cursor-pointer"
            />
            <FaRepeat />
          </div>
        </section>
        {/* <section className=" bottom-0 w-full sticky">
          <BottomBar />
        </section> */}
      </div>
    </>
  );
};
export default PlayerControls;
