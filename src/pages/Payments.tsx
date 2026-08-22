import type { ColumnDef } from "@tanstack/react-table";

import { AddPaymentDialog } from "@/components/payments/add-payment";
import { DataTable } from "@/components/ui/data-table";
import { getPayments } from "@/lib/payments";
import type { Payment } from "@/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const currency = new Intl.NumberFormat("en-GH", {
  style: "currency",
  currency: "GHS",
  maximumFractionDigits: 0,
});

const dateTimeFormat = new Intl.DateTimeFormat("en-GH", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const PAGE_SIZE = 10;
const SEARCH_DEBOUNCE_MS = 300;

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "vehicleName",
    header: "Vehicle",
  },
  {
    accessorKey: "riderName",
    header: "Rider",
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => (
      <div className="text-right">{currency.format(row.original.amount)}</div>
    ),
  },
  {
    accessorKey: "paidAt",
    header: () => <div className="text-right">Paid At</div>,
    cell: ({ row }) => (
      <div className="text-right font-mono text-xs text-muted-foreground">
        {dateTimeFormat.format(new Date(row.original.paidAt))}
      </div>
    ),
  },
];

export default function Payments() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [search]);

  const { data, isLoading } = useQuery({
    queryFn: () =>
      getPayments({
        page,
        limit: PAGE_SIZE,
        search: debouncedSearch,
      }),
    queryKey: ["payments", { page, search: debouncedSearch }],
    placeholderData: keepPreviousData,
  });

  return (
    <section className="pb-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-lg font-bold tracking-tightest text-foreground md:text-xl">
            Payments
          </h1>
          <p className="text-sm text-muted-foreground">
            Every payment logged against your vehicles
          </p>
        </div>
      </div>

      <div className="mt-4">
        <DataTable
          columns={columns}
          data={data?.data || []}
          isLoading={isLoading}
          searchValue={search}
          onSearchChange={setSearch}
          pagination={{
            page: data?.metadata.currentPage ?? page,
            pageCount: data?.metadata.numberOfPages ?? 1,
            hasNextPage: data?.metadata.hasNextPage ?? false,
            hasPreviousPage: data?.metadata.hasPreviousPage ?? false,
            onPageChange: setPage,
          }}
          toolbarAction={<AddPaymentDialog />}
          emptyState={{
            title: "No payments yet",
            description:
              "Payments will show up here once riders start paying against a vehicle.",
          }}
        />
      </div>
    </section>
  );
}
