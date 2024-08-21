"use client";
import { Track } from "@/redux/PlayerSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import {
  setIsPlaying,
  setCurrentTime,
  setDuration,
  setVolume,
  nextTrack,
  previousTrack,
  setPlaylist,
} from "@/redux/PlayerSlice";
import React, { createContext, useContext, useRef } from "react";
interface AudioPlayerstateProps {
  PlayingSet: Track[];
}

const AudioPlayerContext = createContext<AudioPlayerstateProps | undefined>(
  undefined
);

export const useTrackPlaying = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error("Error");
  }
  return context;
};

export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { playlist } = useAppSelector((state) => state.player);
  const PlayingSet = playlist;
  return (
    <AudioPlayerContext.Provider value={{ PlayingSet }}>
      {children}
    </AudioPlayerContext.Provider>
  );
};
