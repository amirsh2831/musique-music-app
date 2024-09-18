import { FiSearch } from "react-icons/fi";
import { CgMoreVertical } from "react-icons/cg";
import { IoChevronForwardCircleOutline } from "react-icons/io5";
import Trending from "@/components/Trending";
import Badgeer from "@/components/Badgeer";
import RecantSongs from "@/components/RecantSongs";
import Player from "@/components/hoverPlay";
import BottomBar from "@/components/BottomBar";
import Image from "next/image";
import memoji from "@/public/assets/images/memoji.png";
import Link from "next/link";
import PlayerControls from "../MusicControler/page";

import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
const App = async () => {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/Login");
  }
  console.log("sessionn name is: ", session.user?.name);
  return (
    <>
      <div className="h-full font-popins container pt-4 relative overflow-x-hidden">
        <section className="flex items-center justify-between">
          <div className="flex gap-x-2 items-center">
            <Image
              src={memoji.src}
              width={40}
              height={40}
              alt="profile"
              className="rounded-full size-10"
            />
            <div className="">
              <h2 className="sub-header">{session.user?.name}</h2>
              <p className="text-12-regular text-title_gray capitalize">
                Welcome to musique
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-x-6 text-white text-3xl">
            <FiSearch />
            <CgMoreVertical />
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between gap-y-2">
            <div className="gap-y-2">
              <p className="text-12-regular text-title_gray">
                New singles to listen to
              </p>
              <h3 className="text-16-regular text-white">Trending Now</h3>
            </div>
            <IoChevronForwardCircleOutline className="text-2xl text-green" />
          </div>
          <div className="overflow-scroll remove-scrollbar scroll-auto">
            <Trending />
          </div>
        </section>

        <section>
          <div className="flex items-end justify-between">
            <div className="gap-y-2">
              <p className="text-12-regular text-title_gray">Listen Again</p>
              <h3 className="text-16-regular text-white">Recant Songs</h3>
            </div>
            <IoChevronForwardCircleOutline className="text-2xl text-green" />
          </div>
          <Badgeer />
          <RecantSongs />
        </section>
        <section className=" bottom-0 w-full sticky lg:hidden">
          <BottomBar />
        </section>
      </div>
    </>
  );
};
export default App;
