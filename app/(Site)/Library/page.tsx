import React from "react";
import { IoMdAdd } from "react-icons/io";
import Badgeer from "@/components/Badgeer";
import { PiArrowsDownUpBold } from "react-icons/pi";
import { MdGridView } from "react-icons/md";
import { Playlists, ArtistFav } from "@/constants";
import { MdPushPin } from "react-icons/md";
import BottomBar from "@/components/BottomBar";
import Image from "next/image";
import Link from "next/link";
const Library = () => {
  return (
    <>
      <div className="max-w-screen h-screen font-popins container pt-4 relative overflow-hidden">
        <section className="flex items-center justify-between mb-5">
          <div className="flex gap-x-2 items-center">
            <Image
              alt="Profile"
              src="/assets/images/memoji.png"
              width={40}
              height={40}
              className="rounded-full size-10"
            />
            <div className="">
              <h2 className="sub-header">Your Library</h2>
            </div>
          </div>
          <div className="text-white text-3xl">
            <IoMdAdd />
          </div>
        </section>
        <Badgeer />
        <section className="mt-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1 text-white">
              <PiArrowsDownUpBold className="text-sm" />
              <h4 className="text-14-regular">Recantly Played</h4>
            </div>
            <MdGridView className="text-white text-xl" />
          </div>
          <div className="space-y-5 mt-5 ">
            {Playlists.map((item, i) => (
              <Link href="/Library/Liked-Songs" key={item.name + i}>
                <div className="flex items-center gap-4 text-white">
                  <Image
                    alt="Liked Images"
                    src={item.image}
                    width={68}
                    height={68}
                    className="size-16"
                  />
                  <div className="">
                    <h3 className="text-14-regular">{item.name}</h3>
                    <div className="flex gap-2 items-center">
                      <MdPushPin className="text-green" />
                      <p className="text-title_gray text-12-regular">
                        Playlist
                      </p>{" "}
                      <span> . </span>{" "}
                      <p className="text-title_gray text-12-regular">
                        {item.count}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            {ArtistFav.map((item, i) => (
              <div
                key={item.name + i}
                className="flex items-center gap-4 text-white"
              >
                <Image
                  alt="Artists"
                  src={item.image}
                  width={68}
                  height={68}
                  className="size-16 rounded-full"
                />
                <div className="">
                  <h3 className="text-14-regular">{item.name}</h3>
                  <div className="flex gap-2 items-center">
                    <p className="text-title_gray text-12-regular">Artist</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className=" bottom-0 w-full sticky">
          <BottomBar />
        </section>
      </div>
    </>
  );
};
export default Library;
