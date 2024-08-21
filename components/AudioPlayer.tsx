"use client";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { setCurrentTime, setDuration, nextTrack } from "@/redux/PlayerSlice";
import { useEffect } from "react";
import { useAudioRef } from "./contexts/AudioRefProvider";

const AudioPlayer = () => {
  const dispatch = useAppDispatch();
  const { audioRef } = useAudioRef();
  const { playlist, currentTrackIndex, isPlaying, volume } = useAppSelector(
    (state) => state.player
  );

  const currentTrack = playlist[currentTrackIndex];

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleEnded = () => {
    dispatch(nextTrack());
  };
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      dispatch(setCurrentTime(audioRef.current.currentTime));
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      dispatch(setDuration(audioRef.current.duration));
    }
  };

  return (
    <audio
      ref={audioRef}
      src={currentTrack?.audioUrl}
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleLoadedMetadata}
      onEnded={handleEnded}
    />
  );
};

export default AudioPlayer;
