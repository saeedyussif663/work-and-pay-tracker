import type { ColumnDef } from "@tanstack/react-table";

import { AddPaymentDialog } from "@/components/add-payment";
import { DataTable } from "@/components/ui/data-table";

type Payment = {
  id: number;
  amount: number;
  paidAt: string;
  vehicleName: string;
  riderName: string;
};

const basePayments: Payment[] = [
  {
    id: 13,
    amount: 800,
    paidAt: "2026-08-03T21:16:16.159Z",
    vehicleName: "Royal 125 X",
    riderName: "Mohammed",
  },
  {
    id: 12,
    amount: 220,
    paidAt: "2026-07-27T09:42:10.000Z",
    vehicleName: "TVS Bike — GT-4471-23",
    riderName: "Kwame Mensah",
  },
  {
    id: 11,
    amount: 350,
    paidAt: "2026-07-24T14:05:00.000Z",
    vehicleName: "Bajaj Tricycle — GT-5678-23",
    riderName: "Abena Owusu",
  },
  {
    id: 10,
    amount: 150,
    paidAt: "2026-07-20T11:30:00.000Z",
    vehicleName: "Honda Motorbike — GW-9012-24",
    riderName: "Yaw Boateng",
  },
];

// Repeated to exercise pagination with mock data — ids stay unique per row.
const payments: Payment[] = Array.from({ length: 5 }, (_, page) =>
  basePayments.map((p, i) => ({
    ...p,
    id: page * basePayments.length + i + 1,
  })),
).flat();

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
          data={payments}
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
