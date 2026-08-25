import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { AddVehicleDialog } from "@/components/vehicles/add-vehicle";
import { VehicleActions } from "@/components/vehicles/vehicle-actions";
import { getVehicles } from "@/lib/vehicles";
import type { Vehicle } from "@/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const currency = new Intl.NumberFormat("en-GH", {
  style: "currency",
  currency: "GHS",
  maximumFractionDigits: 0,
});

const PAGE_SIZE = 10;
const SEARCH_DEBOUNCE_MS = 300;

const columns: ColumnDef<Vehicle>[] = [
  {
    accessorKey: "name",
    header: "Vehicle",
  },
  {
    accessorKey: "rider",
    header: "Rider",
  },
  {
    accessorKey: "cost",
    header: () => <div className="text-right">Cost</div>,
    cell: ({ row }) => (
      <div className="text-right">{currency.format(row.original.cost)}</div>
    ),
  },
  {
    accessorKey: "expectedReturn",
    header: () => <div className="text-right">Expected Return</div>,
    cell: ({ row }) => (
      <div className="text-right">
        {currency.format(row.original.expectedReturn)}
      </div>
    ),
  },
  {
    accessorKey: "totalPaid",
    header: () => <div className="text-right">Paid</div>,
    cell: ({ row }) => (
      <div className="text-right">
        {currency.format(row.original.totalPaid)}
      </div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => (
      <div className="flex justify-end">
        <VehicleActions vehicle={row.original} />
      </div>
    ),
  },
];

export default function Vehicles() {
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
      getVehicles({
        page,
        limit: PAGE_SIZE,
        search: debouncedSearch,
      }),
    queryKey: ["vehicles", { page, search: debouncedSearch }],
    placeholderData: keepPreviousData,
  });

  return (
    <section className="pb-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-lg font-bold tracking-tightest text-foreground md:text-xl">
            Vehicles
          </h1>
          <p className="text-sm text-muted-foreground">
            Cost, payments, and completion for every vehicle you've financed
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
          toolbarAction={<AddVehicleDialog />}
          emptyState={{
            title: "No vehicles yet",
            description:
              "Add your first vehicle to start tracking cost, payments, and completion.",
            action: <AddVehicleDialog />,
          }}
        />
      </div>
    </section>
  );
}
