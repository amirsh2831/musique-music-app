export const GenderOptions = ["Male", "Female", "Other"];
import { LuMusic4 } from "react-icons/lu";
import { FiCompass } from "react-icons/fi";
import { TbBookmarks } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";

export const SelectionFilter = [
  "Music",
  "Podcasts",
  "Artists",
  "Events",
  "Audio Books",
];

export const TrendingData = [
  {
    image: "/assets/images/tingi.jpg",
    subImage: "/assets/images/taylor.jfif",
    Name: "1999 Happy Album",
    By: "By Jordan Peterson",
  },
  {
    image: "/assets/images/somting.png",
    subImage: "/assets/images/Travis.png",
    Name: "Best Of Mumble Rap",
    By: "By Travis Scott",
  },
  {
    image: "/assets/images/somting.png",
    subImage: "/assets/images/Travis.png",
    Name: "Best Of Mumble Rap",
    By: "By Travis Scott",
  },
];

export const Recant = [
  {
    image: "/assets/images/Adeleee.png",
    Name: "Adele 30",
    metadata: "/Music/30/Metadata.json",
    PlayImage: "/assets/images/adele.jpg",
    AlbumName: "30",
  },
  {
    image: "/assets/images/Eminemmm.png",
    Name: "The Death Of Slim ..",
    metadata: "/Music/The Death of Slim Shady/Metadata.json",
    PlayImage: "/assets/images/eminem.png",
    AlbumName: "the-death-of-slim-shady",
  },
  {
    image: "/assets/images/lana del ray play.png",
    Name: "Born To Die",
    metadata: "/Music/HIT-ME-HARD-AND-SOFT/Metadata.json",
    PlayImage: "/assets/images/lana del ray.jpg",
    AlbumName: "hit-me-hard-and-soft",
  },
];

export const Playlists = [
  {
    image: "/assets/icons/liked songs.png",
    name: "Liked Songs",
    count: 58,
  },
  {
    image: "/assets/icons/episodes.png",
    name: "New Episodes",
    count: 11,
  },
];

export const ArtistFav = [
  {
    image: "/assets/images/artist1.png",
    name: "Lolo zouai",
  },
  {
    image: "/assets/images/artist2.png",
    name: "Lana del ray",
  },
  {
    image: "/assets/images/artist1.png",
    name: "Lolo zouai",
  },
  {
    image: "/assets/images/artist2.png",
    name: "Lana del ray",
  },
  {
    image: "/assets/images/artist1.png",
    name: "Lolo zouai",
  },
  {
    image: "/@/public/assets/images/artist2.png",
    name: "Lana del ray",
  },
];

export const Artists = [
  {
    Name: "Billie Eilish",
    Image: "/assets/images/Billie Eilish.png",
  },
  {
    Name: "Adele",
    Image: "/assets/images/Adele.png",
  },
  {
    Name: "Eminem",
    Image: "/assets/images/Eminem Artist.png",
  },
  {
    Name: "Imagine Dragons",
    Image: "/assets/images/Imagine Dragons.png",
  },
  {
    Name: "Drake",
    Image: "/assets/images/Drake.png",
  },
  {
    Name: "NF",
    Image: "/assets/images/nf.png",
  },
];

export const Songs = [
  {
    Image: "/assets/Images/song2.png",
    Song_name: "Easy",
    Artist_name: "Troye Sivan",
  },
  {
    Image: "/assets/Images/song1.png",
    Song_name: "Chance with you",
    Artist_name: "mehro",
  },
  {
    Image: "/assets/Images/song2.png",
    Song_name: "Easy",
    Artist_name: "Troye Sivan",
  },
  {
    Image: "/assets/Images/song1.png",
    Song_name: "Chance with you",
    Artist_name: "mehro",
  },
];

export const SidebarData = [
  {
    id: 1,
    text: "Home",
    icon: <LuMusic4 className="text-xl" />,
    url: "/",
  },
  {
    id: 2,
    text: "Home",
    text: "Explore",
    icon: <FiCompass className="text-xl" />,
    url: "/Explore",
  },
  {
    id: 3,
    text: "Home",
    text: "Library",
    icon: <TbBookmarks className="text-xl" />,
    url: "/Library",
  },
  {
    id: 4,
    text: "Home",
    text: "Search",
    icon: <FiSearch className="text-xl" />,
    url: "/",
  },
];
