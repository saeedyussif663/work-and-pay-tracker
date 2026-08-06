"use client";

import {
  CaretLeftIcon,
  CaretRightIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface EmptyState {
  title: string;
  description?: string;
  action?: ReactNode;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  /** Rendered next to the search input — e.g. an "Add vehicle" button. */
  toolbarAction?: ReactNode;
  /** Shown when `data` itself is empty (no rows exist yet). */
  emptyState?: EmptyState;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  toolbarAction,
  emptyState,
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();
  const rows = table.getRowModel().rows;

  const hasNoDataAtAll = data.length === 0;
  // const hasNoSearchMatches = !hasNoDataAtAll && rows.length === 0;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div className="relative max-w-xs flex-1">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
            className="pl-9"
            disabled={hasNoDataAtAll}
          />
        </div>
        {toolbarAction}
      </div>

      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="[&_th:first-child]:rounded-tl-md [&_th:last-child]:rounded-tr-md"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="bg-muted font-mono  text-xs uppercase tracking-wide text-foreground"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="bg-white">
            {rows.length ? (
              rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={
                    index === rows.length - 1
                      ? "[&_td:first-child]:rounded-bl-md [&_td:last-child]:rounded-br-md"
                      : ""
                  }
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
                  className="h-64 text-center"
                >
                  {hasNoDataAtAll ? (
                    <div className="flex flex-col items-center justify-center gap-2">
                      <p className="font-medium text-foreground">
                        {emptyState?.title ?? "No records yet"}
                      </p>
                      {emptyState?.description && (
                        <p className="max-w-xs text-sm text-muted-foreground">
                          {emptyState.description}
                        </p>
                      )}
                      {emptyState?.action}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2">
                      <p className="font-medium text-foreground">
                        No matches for &ldquo;{globalFilter}&rdquo;
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Try a different search term.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setGlobalFilter("")}
                      >
                        Clear search
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {!hasNoDataAtAll && (
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
            Page {pageCount === 0 ? 0 : pageIndex + 1} of {pageCount}
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <CaretLeftIcon />
              Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
              <CaretRightIcon />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
