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

const App = () => {
  const [results, setResults] = useState({ albums: [], tracks: [] });

  const handleSearch = async (query: string) => {
    if (!query) {
      setResults({ albums: [], tracks: [] });
      return;
    }

    const searchResults = await fetchSearchResults(query);
    setResults(searchResults);
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
            <section className=" bottom-0 w-full sticky">
              <BottomBar />
            </section>
          </>
        )}
      </div>
    </>
  );
};
export default App;
