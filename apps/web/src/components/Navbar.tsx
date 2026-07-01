"use client";

import {
  Bell,
  ChevronRight,
  Heart,
  Menu,
  Search,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "../../public/next.svg";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
        <div className="  items-center md:hidden">
          <Search />
        </div>
        {/* Logo */}
        <div
          className=" shrink-0 items-center"
          onClick={() => router.push("/")}
        >
          <Image src={logo} alt="logo" width={90} height={30} />
        </div>

        {/* Search Mobile */}
        <div className="mx-3 flex-1 hidden">
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm outline-none focus:border-black"
          />
        </div>

        {/* Menu Desktop */}
        <div className="hidden flex-row gap-10 font-bold md:flex">
          <div className="content-center">
            <p>BROWSE ALL</p>
          </div>
          <div className="content-center">
            <p>HOT ITEM</p>
          </div>
          <div className="content-center">
            <p>CATEGORIES</p>
          </div>
          <div className="content-center">
            <p>MORE</p>
          </div>
        </div>

        {/* Action Desktop */}
        <div className="hidden flex-row items-center gap-5 md:flex">
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
            className="cursor-pointer rounded-sm border border-black px-6 py-2"
            onClick={() => router.push("/login")}
          >
            <p>Login</p>
          </div>
        </div>

        {/* Dropdown Button Mobile */}

        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Menu />
            </SheetTrigger>
            <SheetContent
              showCloseButton={false}
              className="p-4 flex justify-between"
            >
              <div>
                {/* logo */}
                <div
                  className=" flex items-center justify-center h-[57px]  "
                  onClick={() => {
                    setIsMenuOpen(false);
                    router.push("/");
                  }}
                >
                  <Image src={logo} alt="logo" width={90} height={30} />
                </div>
                {/* menu */}
                <div className=" flex items-center gap-2 h-[57px]  ">
                  <ChevronRight />
                  <p>BROWSE ALL</p>
                </div>
                <div className=" flex items-center gap-2 h-[57px]  ">
                  <ChevronRight />
                  <p>HOT ITEM</p>
                </div>
                <div className=" flex items-center gap-2 h-[57px]  ">
                  <ChevronRight />
                  <p>CATEGORIES</p>
                </div>
                <div className=" flex items-center gap-2 h-[57px]  ">
                  <ChevronRight />
                  <p>MORE</p>
                </div>
              </div>

              {/* SEPARATOR */}
              <div className="">
                {/* menu */}
                <div className=" flex items-center justify-between h-[52px]  ">
                  <div className="flex gap-4">
                    <ShoppingCart />
                    <p>Keranjang Belanja</p>
                  </div>
                  <ChevronRight />
                </div>
                <div className=" flex items-center justify-between h-[52px]  ">
                  <div className="flex gap-4">
                    <Heart />
                    <p>KWishlist</p>
                  </div>
                  <ChevronRight />
                </div>
                <div className=" flex items-center justify-between h-[52px]  ">
                  <div className="flex gap-4">
                    <Bell />
                    <p>Notifikasi</p>
                  </div>
                  <ChevronRight />
                </div>

                <div className=" flex items-center justify-center  h-[52px]  ">
                  <div
                    className="w-full text-center p-2 border border-black rounded-sm"
                    onClick={() => {
                      setIsMenuOpen(false);
                      router.push("/login");
                    }}
                  >
                    Login
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
