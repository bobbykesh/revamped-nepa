import { ReceiptData } from "./ReceiptGenerator";
import opayLogo from "@/assets/opay-logo.png";

interface ReceiptPreviewProps {
  data: ReceiptData;
}

export const ReceiptPreview = ({ data }: ReceiptPreviewProps) => {
  const formatDateTime = (dateTimeString: string): string => {
    const date = new Date(dateTimeString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const formatAmount = (amount: number): string => {
    return `₦${amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div
      id="receipt-container"
      className="bg-receipt-bg w-full max-w-md mx-auto relative overflow-hidden"
      style={{
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        padding: "32px",
        minHeight: "600px",
      }}
    >
      {/* Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          fontSize: "80px",
          fontWeight: "700",
          color: "rgba(0, 0, 0, 0.02)",
          transform: "rotate(-15deg)",
          userSelect: "none",
        }}
      >
        OPay
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-8 relative z-10">
        <img
          src={opayLogo}
          alt="OPay Logo"
          className="h-10 w-auto object-contain"
        />
        <div className="text-receipt-text font-bold text-lg">
          Transaction Receipt
        </div>
      </div>

      {/* Amount Section */}
      <div className="text-center mb-8 relative z-10">
        <div className="text-receipt-amount text-4xl font-bold mb-2">
          {formatAmount(data.amount)}
        </div>
        <div className="text-receipt-text text-xl mb-2">Successful</div>
        <div className="text-receipt-muted text-sm">
          {formatDateTime(data.dateTime)}
        </div>
      </div>

      {/* Divider */}
      <div
        className="border-b mb-8 relative z-10"
        style={{ borderColor: "hsl(var(--receipt-border))" }}
      />

      {/* Details Section */}
      <div className="space-y-4 mb-8 relative z-10">
        <div className="flex justify-between py-2 border-b border-receipt-border/30">
          <span className="text-receipt-muted text-sm">Provider</span>
          <span className="text-receipt-text text-sm font-medium text-right">
            Ibadan Electricity
          </span>
        </div>
        
        <div className="flex justify-between py-2 border-b border-receipt-border/30">
          <span className="text-receipt-muted text-sm">Meter Number</span>
          <span className="text-receipt-text text-sm font-medium text-right">
            {data.meterNumber}
          </span>
        </div>
        
        <div className="flex justify-between py-2 border-b border-receipt-border/30">
          <span className="text-receipt-muted text-sm">Customer Name</span>
          <span className="text-receipt-text text-sm font-medium text-right break-words">
            {data.customerName}
          </span>
        </div>
        
        <div className="flex justify-between py-2 border-b border-receipt-border/30">
          <span className="text-receipt-muted text-sm">Service Address</span>
          <span className="text-receipt-text text-sm font-medium text-right break-words max-w-[60%]">
            {data.serviceAddress}
          </span>
        </div>
        
        <div className="flex justify-between py-2 border-b border-receipt-border/30">
          <span className="text-receipt-muted text-sm">Meter Type</span>
          <span className="text-receipt-text text-sm font-medium text-right">
            Prepaid
          </span>
        </div>
        
        <div className="flex justify-between py-2">
          <span className="text-receipt-muted text-sm">Transaction No.</span>
          <span className="text-receipt-text text-sm font-medium text-right break-all">
            {data.transactionNo}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-receipt-muted text-xs leading-relaxed text-center relative z-10">
        Enjoy a better life with OPay. Get free transfers, withdrawals, bill
        payments, instant loans, and good annual interest on your savings. OPay
        is licensed by the Central Bank of Nigeria and insured by the NDIC.
      </div>

      {/* Decorative bottom border */}
      <div
        className="absolute bottom-0 left-0 w-full h-1"
        style={{
          background:
            "repeating-linear-gradient(90deg, #ccc 0, #ccc 2px, transparent 2px, transparent 4px)",
        }}
      />
    </div>
  );
};
