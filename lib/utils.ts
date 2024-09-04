import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

// FORMAT DATE TIME
export const formatDateTime = (
  dateString: Date | string,
  timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone
) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    // weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    year: "numeric", // numeric year (e.g., '2023')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false),
    timeZone: timeZone, // use the provided timezone
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    year: "numeric", // numeric year (e.g., '2023')
    month: "2-digit", // abbreviated month name (e.g., 'Oct')
    day: "2-digit", // numeric day of the month (e.g., '25')
    timeZone: timeZone, // use the provided timezone
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
    timeZone: timeZone, // use the provided timezone
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
    timeZone: timeZone, // use the provided timezone
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "en-US",
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

// utils/search.ts
// export const fetchSearchResults = async (query: string) => {
//   const [albumsResponse, artistsResponse] = await Promise.all([
//     fetch('/data/albums.json'),
//     fetch('/data/tracks.json'),
//     // fetch('/path/to/songs.json'),
//   ]);

//   const [albums, artists] = await Promise.all([
//     albumsResponse.json(),
//     artistsResponse.json(),
//     // songsResponse.json(),
//   ]);

export const lowerquery = (query: string) => {
  const lowerQuery = query.replace(/\s+/g, "-").toLowerCase();
  return lowerQuery;
};

export const normalquery = (query: string) => {
  const modStr = query.replace(/-/g, " ");
  const normalQuery = modStr[0].toUpperCase() + modStr.slice(1);
  return normalQuery;
};

// const filteredAlbums = albums.filter((album: any) =>
//   album.name.toLowerCase().includes(lowerQuery)
// );

// const filteredArtists = artists.filter((artist: any) =>
//   artist.name.toLowerCase().includes(lowerQuery)
// );

// const filteredSongs = songs.filter((song: any) =>
//   song.name.toLowerCase().includes(lowerQuery) ||
//   song.artist.toLowerCase().includes(lowerQuery)
// );

// return {
//   albums: filteredAlbums,
//   tracks: filteredArtists,
//   // songs: filteredSongs,
// };
// };

// lib/fetchSearchResults.ts
export const fetchSearchResults = async (query: string) => {
  const [albumsResponse, tracksResponse] = await Promise.all([
    fetch("/data/albums.json"),
    fetch("/data/tracks.json"),
  ]);

  const [albums, songs] = await Promise.all([
    albumsResponse.json(),
    tracksResponse.json(),
  ]);

  const lowerQuery = query.toLowerCase();

  const filteredAlbums = albums.filter((album: any) =>
    album.title.toLowerCase().includes(lowerQuery)
  );
  const filteredTracks = songs
    .filter(
      (song: any) =>
        song.name.toLowerCase().includes(lowerQuery) ||
        song.artist.toLowerCase().includes(lowerQuery)
    )
    .map((track: any) => {
      if (!track.coverImage) {
        const album = albums.find((album: any) => album.id === track.albumId);
        return {
          ...track,
          coverImage: album ? album.coverImage : null,
        };
      }
      return track;
    });

  return {
    albums: filteredAlbums,
    tracks: filteredTracks,
  };
};

export function encryptKey(passkey: string) {
  return btoa(passkey);
}

export function decryptKey(passkey: string) {
  return atob(passkey);
}
