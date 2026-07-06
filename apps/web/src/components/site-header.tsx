'use client'
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/catalogue": "Catalogue",
  "/dashboard/orders": "Orders",
  "/dashboard/users": "Users",
  "/dashboard/categories": "Categories",
  "/dashboard/sport-categories": "Sport Categories",
  "/dashboard/stock": "Stock Management",
  "/dashboard/vouchers": "Vouchers",
};

export function SiteHeader() {
  const pathname = usePathname();

  const title = pageTitles[pathname] ?? "Dashboard";
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{title}</h1>
      </div>
    </header>
  );
}
