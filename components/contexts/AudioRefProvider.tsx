// src/context/AudioRefContext.tsx
"use client";
import React, { createContext, useContext, useRef } from "react";

interface AudioRefContextProps {
  audioRef: React.RefObject<HTMLAudioElement>;
}

const AudioRefContext = createContext<AudioRefContextProps | undefined>(
  undefined
);

export const useAudioRef = () => {
  const context = useContext(AudioRefContext);
  if (!context) {
    throw new Error("useAudioRef must be used within an AudioRefProvider");
  }
  return context;
};

export const AudioRefProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <AudioRefContext.Provider value={{ audioRef }}>
      {children}
    </AudioRefContext.Provider>
  );
};
