"use client";

import { useCallback, useState, type CSSProperties } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import useGetProductList from "@/hooks/api/product/useGetProductList";
import { ProductStatus } from "@/types/product.type";
import { CatalogueDataTable } from "./components/CatalaogueDataTable";

export default function Page() {
  // ====================================================
  // SERVER QUERY STATE
  // ====================================================

  const [page, setPage] = useState(1);
  const [take, setTake] = useState(10);
  const [search, setSearch] = useState("");

  // ====================================================
  // GET PRODUCT LIST
  // ====================================================

  const { data, isLoading, meta } = useGetProductList({
    status: ProductStatus.ACTIVE,
    page,
    take,
    search,
    sortOrder: "desc",
  });

  // ====================================================
  // HANDLERS
  // ====================================================

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);

    // Search result may have fewer pages
    setPage(1);
  }, []);

  const handlePageChange = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const handleTakeChange = useCallback((nextTake: number) => {
    setTake(nextTake);

    // Page count changes when page size changes
    setPage(1);
  }, []);

  // ====================================================
  // RENDER 
  // ====================================================

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",

          "--header-height": "calc(var(--spacing) * 12)",
        } as CSSProperties
      }
    >
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader />

        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <CatalogueDataTable
                data={data ?? []}
                meta={
                  meta ?? {
                    page,
                    take,
                    total: 0,
                  }
                }
                page={page}
                take={take}
                search={search}
                isLoading={isLoading}
                onSearchChange={handleSearchChange}
                onPageChange={handlePageChange}
                onTakeChange={handleTakeChange}
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
