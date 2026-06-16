import type { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';

type PropertyLog = {
  id: string;
  property: string;
  invested: number;
  recouped: number;
  date: string;
  status: 'Active' | 'Recouped' | 'Outstanding';
};

const logs: PropertyLog[] = [
  {
    id: '1',
    property: 'Toyota Vitz — GR-1234-22',
    invested: 45000,
    recouped: 18000,
    date: '2026-01-12',
    status: 'Active',
  },
  {
    id: '2',
    property: 'Bajaj Tricycle — GT-5678-23',
    invested: 22000,
    recouped: 22000,
    date: '2025-11-03',
    status: 'Recouped',
  },
  {
    id: '3',
    property: 'Honda Motorbike — GW-9012-24',
    invested: 9500,
    recouped: 4200,
    date: '2026-03-21',
    status: 'Outstanding',
  },
];

const currency = new Intl.NumberFormat('en-GH', {
  style: 'currency',
  currency: 'GHS',
  maximumFractionDigits: 0,
});

const statusVariant: Record<
  PropertyLog['status'],
  'default' | 'secondary' | 'success'
> = {
  Active: 'default',
  Recouped: 'success',
  Outstanding: 'secondary',
};

const dateFormat = new Intl.DateTimeFormat('en-GH', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

const columns: ColumnDef<PropertyLog>[] = [
  {
    accessorKey: 'property',
    header: 'Property',
  },
  {
    accessorKey: 'invested',
    header: () => <div className="text-right">Invested</div>,
    cell: ({ row }) => (
      <div className="text-right">{currency.format(row.original.invested)}</div>
    ),
  },
  {
    accessorKey: 'recouped',
    header: () => <div className="text-right">Recouped</div>,
    cell: ({ row }) => (
      <div className="text-right">{currency.format(row.original.recouped)}</div>
    ),
  },
  {
    id: 'outstanding',
    header: () => <div className="text-right">Outstanding</div>,
    cell: ({ row }) => (
      <div className="text-right">
        {currency.format(row.original.invested - row.original.recouped)}
      </div>
    ),
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => dateFormat.format(new Date(row.original.date)),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant={statusVariant[row.original.status]}>
        {row.original.status}
      </Badge>
    ),
  },
];

export default function Investment() {
  return (
    <section>
      <div>
        <h1 className="text-[#333333] text-lg md:text-xl font-semibold">
          Investments
        </h1>
        <p>A log of every property and how much it has recouped</p>
      </div>

      <div className="mt-4">
        <DataTable columns={columns} data={logs} />
      </div>
    </section>
  );
}
