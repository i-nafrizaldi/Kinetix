"use client";

import * as React from "react";
import { z } from "zod";

import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";

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

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  EllipsisVerticalIcon,
  PlusIcon,
} from "lucide-react";
import { Product } from "@/types/product.type";

// ======================================================
// SCHEMA
// ======================================================

// export const productTableRowSchema = z.object({
//   id: z.number().int().positive(),
//   productName: z.string().min(1),
//   category: z.string().min(1),
//   brand: z.string().min(1),
//   price: z.number().nonnegative(),
//   status: z.string().min(1),
// });

// export type ProductTableRow = z.infer<typeof productTableRowSchema>;

// ======================================================
// FORMATTER
// ======================================================

const formatCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

// ======================================================
// COLUMNS
// ======================================================

const columns: ColumnDef<Product>[] = [
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

  {
    accessorKey: "productName",
    header: "Product Name",

    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,

    enableHiding: false,
  },

  {
    accessorKey: "category",
    header: "Category",

    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground">
        {row.original.category?.name}
      </Badge>
    ),
  },

  {
    accessorKey: "brand",

    header: "Brand",

    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.original.brand}</span>
    ),
  },

  {
    accessorKey: "price",

    header: () => <div className="text-right">Price</div>,

    cell: ({ row }) => (
      <div className="text-right font-medium">
        {formatCurrency.format(row.original.basePrice)}
      </div>
    ),
  },

  {
    accessorKey: "status",

    header: () => <div className="text-right">Status</div>,

    cell: ({ row }) => <div className="text-right">{row.original.status}</div>,
  },

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
                  console.log("Delete product:", product.id);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

// ======================================================
// DATA TABLE
// ======================================================

interface DataTableProps {
  data: Product[];
  setPage: number;
}

export function DataTable({ data, setPage }: DataTableProps) {
  const [rowSelection, setRowSelection] = React.useState({});

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },

    getRowId: (row) => row.id.toString(),

    enableRowSelection: true,

    onRowSelectionChange: setRowSelection,

    onSortingChange: setSorting,

    onColumnFiltersChange: setColumnFilters,

    onColumnVisibilityChange: setColumnVisibility,

    onPaginationChange: setPagination,

    getCoreRowModel: getCoreRowModel(),

    getFilteredRowModel: getFilteredRowModel(),

    getPaginationRowModel: getPaginationRowModel(),

    getSortedRowModel: getSortedRowModel(),

    getFacetedRowModel: getFacetedRowModel(),

    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="flex w-full flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between lg:px-6">
        <Input
          placeholder="Search products..."
          value={
            (table.getColumn("productName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("productName")?.setFilterValue(event.target.value)
          }
          className="w-full sm:max-w-sm"
        />

        <Button size="sm">
          <PlusIcon />
          Add Product
        </Button>
      </div>

      {/* Table */}
      <div className="px-4 lg:px-6">
        <div className="overflow-hidden rounded-lg border">
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
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
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

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 lg:px-6">
        <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} product(s) selected.
        </div>

        <div className="flex w-full items-center gap-4 lg:w-fit lg:gap-8">
          {/* Rows per page */}
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Rows per page
            </Label>

            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>

              <SelectContent side="top">
                <SelectGroup>
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Page info */}
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>

          {/* Navigation */}
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              size="icon"
              className="hidden size-8 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>

              <ChevronsLeftIcon />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>

              <ChevronLeftIcon />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>

              <ChevronRightIcon />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="hidden size-8 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
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
