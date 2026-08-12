import {
  DownloadSimpleIcon,
  ReceiptIcon,
  ShareNetworkIcon,
} from "@phosphor-icons/react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { useRef, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Tally from "@/components/ui/tally";
import { cn } from "@/lib/utils";
import type { PaymentDetail } from "@/types";

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

interface ReceiptDialogProps {
  payment: PaymentDetail;
  trigger?: ReactNode | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ReceiptDialog({
  payment,
  trigger,
  open: controlledOpen,
  onOpenChange,
}: ReceiptDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  const [isExporting, setIsExporting] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  const totalPaid = payment.totalPaid ?? 0;
  const amountRemaining = payment.amountRemaining ?? 0;
  const percentagePaid =
    totalPaid + amountRemaining > 0
      ? Math.round((totalPaid / (totalPaid + amountRemaining)) * 100)
      : 0;
  const filled = Math.round(percentagePaid / 10);

  async function renderPdf() {
    if (!receiptRef.current) return null;

    const scale = 2;
    const canvas = await html2canvas(receiptRef.current, {
      scale,
      backgroundColor: "#ffffff",
    });
    const imgData = canvas.toDataURL("image/png");

    const PX_TO_PT = 0.75;
    const widthPt = (canvas.width / scale) * PX_TO_PT;
    const heightPt = (canvas.height / scale) * PX_TO_PT;

    const pdf = new jsPDF({
      orientation: widthPt > heightPt ? "landscape" : "portrait",
      unit: "pt",
      format: [widthPt, heightPt],
    });
    pdf.addImage(imgData, "PNG", 0, 0, widthPt, heightPt);

    return pdf;
  }

  async function handleDownload() {
    setIsExporting(true);
    try {
      const pdf = await renderPdf();
      pdf?.save(`receipt-${payment.id}.pdf`);
    } finally {
      setIsExporting(false);
    }
  }

  async function handleShare() {
    setIsExporting(true);
    try {
      const pdf = await renderPdf();
      if (!pdf) return;

      const file = new File([pdf.output("blob")], `receipt-${payment.id}.pdf`, {
        type: "application/pdf",
      });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `Receipt #${payment.id}`,
        });
      } else {
        // Native sharing (or file sharing specifically) isn't supported —
        // fall back to a plain download so the button still does something.
        pdf.save(`receipt-${payment.id}.pdf`);
      }
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger !== null && (
        <DialogTrigger asChild>
          {trigger ?? (
            <Button variant="ghost" size="icon" aria-label="View receipt">
              <ReceiptIcon />
            </Button>
          )}
        </DialogTrigger>
      )}

      <DialogContent className="rounded-md sm:max-w-105">
        {/* Visually hidden — the receipt card below already communicates the title */}
        <DialogHeader className="sr-only">
          <DialogTitle>Payment receipt</DialogTitle>
          <DialogDescription>
            Receipt for the payment logged against {payment.vehicleName}
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center p-4">
          <div ref={receiptRef} className="w-full bg-background p-4">
            <div className="relative w-full max-w-100 rounded-2xl border border-border bg-card px-6 pb-5.5 pt-6.5 before:absolute before:-left-2.75 before:top-1/2 before:h-5.5 before:w-5.5 before:-translate-y-1/2 before:rounded-full before:bg-background before:content-[''] after:absolute after:-right-2.75 after:top-1/2 after:h-5.5 after:w-5.5 after:-translate-y-1/2 after:rounded-full after:bg-background after:content-['']">
              <div className="absolute -right-3.5 top-5 rotate-[-9deg] rounded-md border-2 border-primary bg-primary/10 px-2.5 py-1 font-mono text-[11px] font-semibold tracking-widest text-primary">
                LOGGED
              </div>

              <div className="grid grid-cols-[auto_1fr] items-baseline gap-3 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                <span className="whitespace-nowrap">LOG #{payment.id}</span>
                <span className="whitespace-nowrap text-right">PAYMENT</span>
              </div>

              {(
                [
                  ["Rider", payment.riderName, false],
                  ["Vehicle", payment.vehicleName, false],
                  ["Amount", currency.format(payment.amount), true],
                  [
                    "Time",
                    dateTimeFormat.format(new Date(payment.paidAt)),
                    false,
                  ],
                ] as const
              ).map(([label, value, green]) => (
                <div
                  key={label}
                  className="grid grid-cols-[auto_1fr] items-baseline gap-3 border-b border-border py-2.5 font-mono text-[13px] last:border-b-0"
                >
                  <span className="whitespace-nowrap text-muted-foreground">
                    {label}
                  </span>
                  <span
                    className={cn(
                      "whitespace-nowrap text-right font-semibold",
                      green && "text-success",
                    )}
                  >
                    {value}
                  </span>
                </div>
              ))}

              <div className="my-4 border-t border-dashed border-border" />
              <Tally filled={filled} />
              <div className="flex justify-between font-mono text-[11px] text-muted-foreground">
                <span>{percentagePaid}% paid</span>
                <span>{currency.format(amountRemaining)} left</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-2 gap-2 sm:justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={handleShare}
            disabled={isExporting}
            className="rounded-md"
          >
            <ShareNetworkIcon />
            Share
          </Button>
          <Button
            type="button"
            onClick={handleDownload}
            isLoading={isExporting}
          >
            <DownloadSimpleIcon />
            Download PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
