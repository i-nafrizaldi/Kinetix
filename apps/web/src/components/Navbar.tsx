'use client'
import Image from "next/image";
import logo from "../../public/next.svg";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  return (
    <main className="container mx-[132px] px-[16px] flex flex-row h-[70px]  justify-between">
      <div className="content-center">
        <Image src={logo} alt="logo" width={90} height={30} />
      </div>
      <div className="flex flex-row gap-10 font-bold">
        <div className="h-full content-center">
          <p>BROWSE ALL</p>
        </div>
        <div className="h-full content-center">
          <p>HOT ITEM</p>
        </div>
        <div className="h-full content-center">
          <p>CATEGORIES</p>
        </div>
        <div className="h-full content-center">
          <p>MORE</p>
        </div>
      </div>
      <div className="flex flex-row gap-5 place-items-center">
        <div>
          <p>cart</p>
        </div>
        <div>
          <p>favorite</p>
        </div>
        <div>
          <p>notif</p>
        </div>
        <div className="opacity-10">
          <p>|</p>
        </div>
        <div
          className="py-2 px-6 rounded-sm  border border-black cursor-pointer"
          onClick={() => router.push("/login")}
        >
          <p>Login</p>
        </div>
      </div>
    </main>
  );
};

export default Navbar;
