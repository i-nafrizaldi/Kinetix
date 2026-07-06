"use client";

import { useEffect, useMemo, useState } from "react";

import debounce from "lodash/debounce";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type RowSelectionState,
} from "@tanstack/react-table";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  EllipsisVerticalIcon,
  PlusIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Product } from "@/types/product.type";

// ======================================================
// FORMATTER
// ======================================================

const formatCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

// ======================================================
// TYPES
// ======================================================

interface PaginationMeta {
  page: number;
  take: number;
  total: number;
}

interface CatalogueDataTableProps {
  data: Product[];

  meta: PaginationMeta;

  page: number;

  take: number;

  search: string;

  isLoading?: boolean;

  onSearchChange: (search: string) => void;

  onPageChange: (page: number) => void;

  onTakeChange: (take: number) => void;
}

// ======================================================
// COLUMNS
// ======================================================

const columns: ColumnDef<Product>[] = [
  // ====================================================
  // SELECT
  // ====================================================

  {
    id: "select",

    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all products"
        />
      </div>
    ),

    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label={`Select ${row.original.name}`}
        />
      </div>
    ),

    enableSorting: false,
    enableHiding: false,
  },

  // ====================================================
  // PRODUCT NAME
  // ====================================================

  {
    accessorKey: "name",

    header: "Product Name",

    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,

    enableHiding: false,
  },

  // ====================================================
  // CATEGORY
  // ====================================================

  {
    id: "category",

    accessorFn: (row) => row.category?.name ?? "-",

    header: "Category",

    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground">
        {row.original.category?.name ?? "-"}
      </Badge>
    ),
  },

  // ====================================================
  // SKU
  // ====================================================

  {
    accessorKey: "sku",

    header: "SKU",

    cell: ({ row }) => (
      <span className="font-mono text-sm text-muted-foreground">
        {row.original.sku}
      </span>
    ),
  },

  // ====================================================
  // BRAND
  // ====================================================

  {
    accessorKey: "brand",

    header: "Brand",

    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.original.brand ?? "-"}</span>
    ),
  },

  // ====================================================
  // PRICE
  // ====================================================

  {
    accessorKey: "basePrice",

    header: () => <div className="text-right">Price</div>,

    cell: ({ row }) => (
      <div className="text-right font-medium">
        {formatCurrency.format(row.original.basePrice)}
      </div>
    ),
  },

  // ====================================================
  // STATUS
  // ====================================================

  {
    accessorKey: "status",

    header: () => <div className="text-right">Status</div>,

    cell: ({ row }) => (
      <div className="flex justify-end">
        <Badge variant="outline">{row.original.status}</Badge>
      </div>
    ),
  },

  // ====================================================
  // ACTIONS
  // ====================================================

  {
    id: "actions",

    enableSorting: false,
    enableHiding: false,

    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 text-muted-foreground"
              >
                <EllipsisVerticalIcon />

                <span className="sr-only">Open product menu</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onClick={() => {
                  console.log("View product:", product.id);
                }}
              >
                View Detail
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  console.log("Edit product:", product.id);
                }}
              >
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  console.log("Copy product:", product.id);
                }}
              >
                Make a Copy
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                variant="destructive"
                onClick={() => {
                  console.log("Archive product:", product.id);
                }}
              >
                Archive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

// ======================================================
// COMPONENT
// ======================================================

export function CatalogueDataTable({
  data,
  meta,
  page,
  take,
  search,
  isLoading = false,
  onSearchChange,
  onPageChange,
  onTakeChange,
}: CatalogueDataTableProps) {
  // ====================================================
  // LOCAL UI STATE
  // ====================================================

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const [searchInput, setSearchInput] = useState(search);

  // ====================================================
  // PAGINATION CALCULATION
  // ====================================================

  const totalPages = Math.max(1, Math.ceil(meta.total / take));

  // ====================================================
  // BACKEND SEARCH DEBOUNCE
  // ====================================================

  const handleSearch = useMemo(
    () =>
      debounce((value: string) => {
        onSearchChange(value);
      }, 500),
    [onSearchChange],
  );

  // ====================================================
  // CANCEL PENDING DEBOUNCE
  // ====================================================

  useEffect(() => {
    return () => {
      handleSearch.cancel();
    };
  }, [handleSearch]);

  // ====================================================
  // SYNC EXTERNAL SEARCH
  // ====================================================

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  // ====================================================
  // RESET SELECTION
  // ====================================================

  useEffect(() => {
    setRowSelection({});
  }, [page, take, search]);

  // ====================================================
  // TABLE
  // ====================================================

  const table = useReactTable({
    data,

    columns,

    state: {
      rowSelection,
    },

    getRowId: (row) => row.id.toString(),

    enableRowSelection: true,

    onRowSelectionChange: setRowSelection,

    // Data already comes paginated from backend
    manualPagination: true,

    pageCount: totalPages,

    // Only build rows from current API response
    getCoreRowModel: getCoreRowModel(),
  });

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <div className="flex w-full flex-col gap-4">
      {/* ============================================== */}
      {/* TOOLBAR */}
      {/* ============================================== */}

      <div className="flex flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between lg:px-6">
        <Input
          placeholder="Search name, brand, or SKU..."
          value={searchInput}
          onChange={(event) => {
            const value = event.target.value;

            // Update input immediately
            setSearchInput(value);

            // Send search to backend after debounce
            handleSearch(value);
          }}
          className="w-full sm:max-w-sm"
        />

        <Button size="sm">
          <PlusIcon />
          Add Product
        </Button>
      </div>

      {/* ============================================== */}
      {/* TABLE */}
      {/* ============================================== */}

      <div className="px-4 lg:px-6">
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader className="bg-muted">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,

                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Loading products...
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() ? "selected" : undefined}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,

                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* ============================================== */}
      {/* PAGINATION */}
      {/* ============================================== */}

      <div className="flex items-center justify-between px-4 lg:px-6">
        {/* Selection info */}
        <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
          {table.getSelectedRowModel().rows.length} of {data.length} product(s)
          selected on this page.
        </div>

        <div className="flex w-full items-center gap-4 lg:w-fit lg:gap-8">
          {/* ========================================== */}
          {/* ROWS PER PAGE */}
          {/* ========================================== */}

          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Rows per page
            </Label>

            <Select
              value={String(take)}
              onValueChange={(value) => {
                onTakeChange(Number(value));
              }}
            >
              <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                <SelectValue />
              </SelectTrigger>

              <SelectContent side="top">
                <SelectGroup>
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={String(pageSize)}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* ========================================== */}
          {/* PAGE INFO */}
          {/* ========================================== */}

          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {page} of {totalPages}
          </div>

          {/* ========================================== */}
          {/* PAGE BUTTONS */}
          {/* ========================================== */}

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            {/* First page */}
            <Button
              variant="outline"
              size="icon"
              className="hidden size-8 lg:flex"
              onClick={() => {
                onPageChange(1);
              }}
              disabled={page <= 1 || isLoading}
            >
              <span className="sr-only">Go to first page</span>

              <ChevronsLeftIcon />
            </Button>

            {/* Previous page */}
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => {
                onPageChange(page - 1);
              }}
              disabled={page <= 1 || isLoading}
            >
              <span className="sr-only">Go to previous page</span>

              <ChevronLeftIcon />
            </Button>

            {/* Next page */}
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => {
                onPageChange(page + 1);
              }}
              disabled={page >= totalPages || isLoading}
            >
              <span className="sr-only">Go to next page</span>

              <ChevronRightIcon />
            </Button>

            {/* Last page */}
            <Button
              variant="outline"
              size="icon"
              className="hidden size-8 lg:flex"
              onClick={() => {
                onPageChange(totalPages);
              }}
              disabled={page >= totalPages || isLoading}
            >
              <span className="sr-only">Go to last page</span>

              <ChevronsRightIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
