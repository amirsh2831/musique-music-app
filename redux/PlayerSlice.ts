// src/store/playerSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of the state
interface PlayerState {
  playlist: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  ImageUrl: string
}

export interface Track {
  id: string;
  title: string;
  artistName: string;
  audioUrl: string;
  artistId: string;
  albumId?: string;
  duration: string;
  coverAlbum?: string;
}

// Initial state
const initialState: PlayerState = {
  playlist: [],
  currentTrackIndex: 0,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  ImageUrl: "",
};
// Create a slice
const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlaylist: (state, action: PayloadAction<Track[]>) => {
      state.playlist = action.payload;
      state.currentTrackIndex = 0;
      state.currentTime = 0;
      state.duration = 0;
    },
    setCurrentTrackIndex: (state, action: PayloadAction<number>) => {
      state.currentTrackIndex = action.payload;
      state.currentTime = 0;
      state.duration = 0;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    nextTrack: (state) => {
      if (state.currentTrackIndex < state.playlist.length - 1) {
        state.currentTrackIndex += 1;
      }
      state.currentTime = 0;
      state.duration = 0;
    },
    previousTrack: (state) => {
      if (state.currentTrackIndex > 0) {
        state.currentTrackIndex -= 1;
      }
      state.currentTime = 0;
      state.duration = 0;
    },
    SetImage: (state, action: PayloadAction<string>) => {
      state.ImageUrl = action.payload;
    },
  },
});

// Export the actions
export const {
  setPlaylist,
  setCurrentTrackIndex,
  setIsPlaying,
  setCurrentTime,
  setDuration,
  setVolume,
  nextTrack,
  previousTrack,
  SetImage,
} = playerSlice.actions;

// Export the reducer
export default playerSlice.reducer;
