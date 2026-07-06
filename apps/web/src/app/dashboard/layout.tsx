import { TooltipProvider } from "@/components/ui/tooltip";

import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="  ">
      {/* <Header /> */}
      <div className=" ">
        <TooltipProvider>{children}</TooltipProvider>
      </div>
    </main>
  );
}
