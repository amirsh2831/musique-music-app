"use client";

// components/HeartIcon.tsx
import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface HeartIconProps {
  songId: string;
}

const HeartIcon = ({ songId }: HeartIconProps) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/Library/get-liked-songs`
        );

        const data = await res.json();

        const isLiked = data.likedSongs.some(
          (song: any) => song.id === parseInt(songId)
        );

        setLiked(isLiked);
      } catch (error) {
        console.error("Error checking if song is liked:", error);
      }
    };

    checkIfLiked();
  }, [songId]);

  const handleClick = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Library/${
        liked ? "unlike-songs" : "liked-songs"
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ songId }),
      }
    );

    if (res.ok) {
      setLiked(!liked);
    }
  };
  const songidd = parseInt(songId);

  return (
    <>
      <button onClick={handleClick}>
        {liked ? <FaHeart /> : <FaRegHeart />}
      </button>
    </>
  );
};

export default HeartIcon;