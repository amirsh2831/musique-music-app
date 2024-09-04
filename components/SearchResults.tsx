"use client";
import { lowerquery, normalquery } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { SetImage, setPlaylist, Track } from "@/redux/PlayerSlice";

interface SearchResultsProps {
  results: {
    albums: any[];
    tracks: any[];
  };
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const dispatch = useAppDispatch();

  const handlePlaylistSelect = (tracks: Track[]) => {
    console.log(tracks);
    dispatch(setPlaylist(tracks));
    tracks[0].coverAlbum && dispatch(SetImage(tracks[0].coverAlbum));
  };
  // const hasResults = results.albums.length > 0 || results.tracks.length > 0;

  // if (!hasResults) {
  // return null; // Do not render if there are no results
  // }
  console.log(results);
  return (
    <div className="space-y-4">
      <h2 className="text-2xl text-white">Search Results</h2>
      {results.albums.length > 0 ? (
        <div>
          <h3 className="text-xl text-title_gray mb-2">Albums</h3>
          <ul className="flex w-full gap-2 ">
            {results.albums.map((album, index) => (
              <Link href={`/Albums/${normalquery(album.title)}`} key={index}>
                <li className="space-x-2">
                  <div className="sapce-y-3 p-3 bg-gray-950 shadow-lg text-left rounded-xl hover:bg-gray-800 hover:shadow-xl">
                    <Image
                      src={album.coverUrl}
                      alt="album Banner"
                      width={128}
                      height={128}
                      className="size-32 m-auto rounded-lg shadow-md mb-2"
                    />
                    <div className="space-y-1">
                      <h2 className="text-14-regular text-white text-pretty">
                        {normalquery(album.title)}
                      </h2>
                      <h4 className="text-12-regular text-title_gray">
                        {album.artistName}
                      </h4>
                    </div>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      ) : (
        " "
      )}
      {results.tracks.length > 0 ? (
        <div>
          <h3 className="text-xl text-title_gray mb-2">Tracks</h3>
          <ul>
            {results.tracks.map((track, index) => (
              <li
                key={index}
                className="flex gap-x-2 cursor-pointer"
                onClick={() =>
                  handlePlaylistSelect([
                    {
                      id: track.id,
                      title: track.title,
                      artistName: track.artistName,
                      audioUrl: track.audioUrl,
                      coverAlbum: track?.albumCover,
                      artistId: track.artistId,
                      albumId: track?.albumId,
                      duration: track.duration,
                    },
                  ])
                }
              >
                {track.albumCover && (
                  <Image
                    src={track?.albumCover}
                    alt="banner for songs"
                    width={32}
                    height={32}
                    className="size-7 rounded-md"
                  />
                )}

                <div className="sapce-y-2 w-full border-b-[1px] border-title_gray mb-2">
                  <h2 className="text-16-regular text-white">
                    {normalquery(track.title)}
                  </h2>
                  <h4 className="text-12-regular text-title_gray">
                    {track.artistName}
                  </h4>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        " "
      )}
    </div>
  );
};

export default SearchResults;
