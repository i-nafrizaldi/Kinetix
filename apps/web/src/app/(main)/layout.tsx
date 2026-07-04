import Navbar from "@/components/Navbar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="">
      <Navbar />
      {/* <Header /> */}
      <div className=" ">{children}</div>
      {/* <Footer /> */}
    </main>
  );
}
