import Image from "next/image";
// components/SearchResults.tsx
interface SearchResultsProps {
  results: {
    albums: any[];
    tracks: any[];
  };
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const hasResults = results.albums.length > 0 || results.tracks.length > 0;

  if (!hasResults) {
    return null; // Do not render if there are no results
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl text-white">Search Results</h2>
      {results.albums.length > 0 ? (
        <div>
          <h3 className="text-xl text-title_gray mb-2">Albums</h3>
          <ul className="flex w-full gap-2 ">
            {results.albums.map((album, index) => (
              <li key={index} className="space-x-2">
                <div className="sapce-y-3 p-3 bg-gray-950 shadow-lg text-left rounded-xl hover:bg-gray-800 hover:shadow-xl">
                  <Image
                    src={album.coverImage}
                    alt="album Banner"
                    width={128}
                    height={128}
                    className="size-32 m-auto rounded-lg shadow-md mb-2"
                  />
                  <div className="space-y-1">
                    <h2 className="text-14-regular text-white text-pretty">
                      {album.title}
                    </h2>
                    <h4 className="text-12-regular text-title_gray">
                      {album.artistId}
                    </h4>
                  </div>
                </div>
              </li>
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
              <li key={index} className="flex gap-x-2">
                {track.coverImage && (
                  <Image
                    src={track?.coverImage}
                    alt="banner for songs"
                    width={32}
                    height={32}
                    className="size-7 rounded-md"
                  />
                )}

                <div className="sapce-y-2 w-full border-b-[1px] border-title_gray mb-2">
                  <h2 className="text-16-regular text-white">{track.name}</h2>
                  <h4 className="text-12-regular text-title_gray">
                    {track.artist}
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
