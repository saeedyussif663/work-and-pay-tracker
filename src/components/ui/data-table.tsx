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
import { Skeleton } from "@/components/ui/skeleton";
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

interface ServerPagination {
  /** Current page, 1-based — matches the backend's `currentPage`. */
  page: number;
  pageCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onPageChange: (page: number) => void;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  /** Rendered next to the search input — e.g. an "Add vehicle" button. */
  toolbarAction?: ReactNode;
  /** Shown when there's no data and no active search. */
  emptyState?: EmptyState;
  /** Shows a skeleton table instead of rows while data is being fetched. */
  isLoading?: boolean;
  /** Number of skeleton rows to render while loading. */
  skeletonRowCount?: number;
  /**
   * Controlled search box value. Pass this together with `onSearchChange`
   * to run search server-side — `data` is displayed as-is, and it's up to
   * the caller to fetch results matching the search term.
   * Omit both to fall back to client-side filtering of `data`.
   */
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  /**
   * Pass this to paginate server-side using the backend's response
   * metadata. Omit it to fall back to client-side pagination of `data`.
   */
  pagination?: ServerPagination;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  toolbarAction,
  emptyState,
  isLoading = false,
  skeletonRowCount = 6,
  searchValue,
  onSearchChange,
  pagination,
}: DataTableProps<TData, TValue>) {
  const isServerSearch = searchValue !== undefined;
  const isServerPagination = pagination !== undefined;

  const [internalFilter, setInternalFilter] = useState("");
  const filterValue = isServerSearch ? searchValue : internalFilter;
  const handleFilterChange = onSearchChange ?? setInternalFilter;

  const {
    page: serverPage,
    pageCount: serverPageCount,
    hasNextPage: serverHasNextPage,
    hasPreviousPage: serverHasPreviousPage,
    onPageChange,
  } = pagination ?? {
    page: 1,
    pageCount: 1,
    hasNextPage: false,
    hasPreviousPage: false,
    onPageChange: () => {},
  };

  const table = useReactTable({
    data,
    columns,
    state: isServerSearch ? {} : { globalFilter: internalFilter },
    onGlobalFilterChange: isServerSearch ? undefined : setInternalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: isServerSearch ? undefined : getFilteredRowModel(),
    getPaginationRowModel: isServerPagination
      ? undefined
      : getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  const rows = table.getRowModel().rows;

  const pageIndex = isServerPagination
    ? serverPage - 1
    : table.getState().pagination.pageIndex;
  const pageCount = isServerPagination ? serverPageCount : table.getPageCount();
  const canPreviousPage = isServerPagination
    ? serverHasPreviousPage
    : table.getCanPreviousPage();
  const canNextPage = isServerPagination
    ? serverHasNextPage
    : table.getCanNextPage();

  function goToPreviousPage() {
    if (isServerPagination) onPageChange(serverPage - 1);
    else table.previousPage();
  }

  function goToNextPage() {
    if (isServerPagination) onPageChange(serverPage + 1);
    else table.nextPage();
  }

  const hasActiveSearch = filterValue.trim().length > 0;
  const hasNoRows = rows.length === 0;
  const disableSearch = isLoading || (hasNoRows && !hasActiveSearch);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div className="relative max-w-xs flex-1">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={filterValue}
            onChange={(e) => handleFilterChange(e.target.value)}
            placeholder="Search..."
            className="pl-9"
            disabled={disableSearch}
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
            {isLoading ? (
              Array.from({ length: skeletonRowCount }).map((_, rowIndex) => (
                <TableRow
                  key={`skeleton-${rowIndex}`}
                  className={
                    rowIndex === skeletonRowCount - 1
                      ? "[&_td:first-child]:rounded-bl-md [&_td:last-child]:rounded-br-md"
                      : ""
                  }
                >
                  {columns.map((_, colIndex) => (
                    <TableCell key={`skeleton-cell-${colIndex}`}>
                      <Skeleton className="h-4 w-full max-w-32" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : rows.length ? (
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
                  {hasActiveSearch ? (
                    <div className="flex flex-col items-center justify-center gap-2">
                      <p className="font-medium text-foreground">
                        No matches for &ldquo;{filterValue}&rdquo;
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Try a different search term.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleFilterChange("")}
                      >
                        Clear search
                      </Button>
                    </div>
                  ) : (
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
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-4 w-24" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      ) : (
        !hasNoRows && (
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
              Page {pageCount === 0 ? 0 : pageIndex + 1} of {pageCount}
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={goToPreviousPage}
                disabled={!canPreviousPage}
              >
                <CaretLeftIcon />
                Prev
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={goToNextPage}
                disabled={!canNextPage}
              >
                Next
                <CaretRightIcon />
              </Button>
            </div>
          </div>
        )
      )}
    </div>
  );
}
