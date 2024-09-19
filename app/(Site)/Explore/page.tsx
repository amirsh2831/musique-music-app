"use client";
import React from "react";
import { IoMdAdd } from "react-icons/io";
import Badgeer from "@/components/Badgeer";
import { PiArrowsDownUpBold } from "react-icons/pi";
import { MdGridView } from "react-icons/md";
import { Playlists, ArtistFav } from "@/constants";
import { MdPushPin } from "react-icons/md";
import BottomBar from "@/components/BottomBar";
import SearchBar from "@/components/SearchBar";
import FavArtists from "@/components/FavArtists";
import SearchResults from "@/components/SearchResults";
import { fetchSearchResults } from "@/lib/utils";
import { useState } from "react";
import { lowerquery } from "@/lib/utils";

const App = () => {
  const [results, setResults] = useState({ albums: [], tracks: [] });
  const fetchSearchResults = async (searchQuery: string) => {
    try {
      const res = await fetch(
        `/api/Search/${encodeURIComponent(
          searchQuery
        )}`,
        { cache: "no-store", method: "GET", }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch songs");
      }
      const songs = await res.json();
      return songs;
    } catch (error) {
      console.error("Error fetching album songs:", error);
      return [];
    }
  };
  const handleSearch = async (query: string) => {
    if (!query) {
      setResults({ albums: [], tracks: [] });
      return;
    }
    const modifiedQuery = lowerquery(query);
    if(modifiedQuery) {
      const searchResults = await fetchSearchResults(modifiedQuery);
      setResults(searchResults);
    }
  };

  const hasResults = results.albums.length > 0 || results.tracks.length > 0;
  return (
    <>
      <div className="max-w-screen h-screen font-popins container pt-4 relative overflow-hidden space-y-5">
        <section>
          <h1 className="header text-white">
            Search Your Favorite Artist Or Music Here
          </h1>
        </section>
        <section>
          <SearchBar onSearch={handleSearch} />
        </section>
        {hasResults ? (
          <SearchResults results={results} />
        ) : (
          <>
            <section>
              <h2 className="text-white sub-header">Chose Your Genre</h2>
              <Badgeer wrap={true} />
            </section>
            <section>
              <h2 className="text-white sub-header">Chose Your Artist</h2>
              <FavArtists />
              <FavArtists />
            </section>
          </>
        )}
      </div>
    </>
  );
};
export default App;
