"use client";
import React from "react";
import { setCurrentTrackIndex } from "@/redux/PlayerSlice";
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
// import { SetImage, setPlaylist } from "@/redux/PlayerSlice";
import HeartIcon from "./HeartIcon";
import { Card, CardBody } from "@nextui-org/card";
import { normalquery } from "@/lib/utils";

interface TrackProps {
  id: string;
  title: string;
  artistName: string;
  audioUrl: string;
  albumCover?: string;
}

const Tracks = ({ tracks }: { tracks: TrackProps[] }) => {
  const dispatch = useAppDispatch();
  //   const { isPlaying } = useAppSelector((state) => state.player);

  const handleTrackSelect = (index: number) => {
    dispatch(setCurrentTrackIndex(index - 1));
  };

  return (
    <>
      {tracks.map((item, i) => (
        <Card
          className="w-full mb-2 bg-transparent border-none outline-none shadow-lg"
          key={item.id}
          onClick={(e) => {
            e.stopPropagation();
            handleTrackSelect(parseInt(item.id));
          }}
        >
          <CardBody className="overflow-visible p-2 ">
            <div className=" flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                {/* Implement playlist capability */}
                {item.albumCover && (
                  <Image
                    alt="Play list Image"
                    src={item.albumCover}
                    width={40}
                    height={40}
                    className="size-10"
                  />
                )}

                <div className="space-y-1">
                  <h3 className="text-white text-16-regular">
                    {normalquery(item.title)}
                  </h3>
                  <p className="text-12-regular text-title_gray">
                    {item.artistName}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <BsThreeDots className="text-title_gray text-xl " />
                <HeartIcon songId={item.id} />
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
            <div className="lg:block">
        <br />
        <br />
        <br />
        <br />
        <br />

      </div>
    </>
  );
};

export default Tracks;
