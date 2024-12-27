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
import { usePageContext } from "@/components/contexts/PageContext";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
const App = async () => {
  // const { page, setPage } = usePageContext();
  const session = await getServerSession(options);
  if (!session) {
    redirect("/Login");
  }
  console.log("sessionn name is: ", session.user?.name);
  return (
    <>
      <div className="h-full font-popins overflow-y-auto container pt-4 space-y-4 relative overflow-x-hidden">
        <section className=" w-full flex items-center justify-between ">
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
              <p className="text-12-bold text-title_gray capitalize">
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
              <h3 className="text-16-regular text-white">Trending Now</h3>
              <p className="text-14-regular text-title_gray">
                New singles to listen to
              </p>
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
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
};
export default App;
