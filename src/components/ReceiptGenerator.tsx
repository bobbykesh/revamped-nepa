import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReceiptPreview } from "./ReceiptPreview";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";

export interface ReceiptData {
  amount: number;
  customerName: string;
  serviceAddress: string;
  dateTime: string;
  meterNumber: string;
  transactionNo: string;
}

export const ReceiptGenerator = () => {
  const { toast } = useToast();
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [formData, setFormData] = useState({
    amount: "1000.00",
    customerName: "TETEDE ABIODUN",
    serviceAddress: "1004 AREA, ILARO ILAROSANGO OGUN",
    dateTime: new Date().toISOString().slice(0, 16),
  });

  const generateRandomNumber = (length: number): string => {
    return Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
  };

  const handleGenerateReceipt = () => {
    const data: ReceiptData = {
      amount: parseFloat(formData.amount),
      customerName: formData.customerName.toUpperCase(),
      serviceAddress: formData.serviceAddress.toUpperCase(),
      dateTime: formData.dateTime,
      meterNumber: generateRandomNumber(11),
      transactionNo: generateRandomNumber(28),
    };

    setReceiptData(data);
    toast({
      title: "Receipt Generated",
      description: "Your OPay receipt has been generated successfully!",
    });
  };

  const handleDownloadImage = async () => {
    const element = document.getElementById("receipt-container");
    if (!element) return;

    try {
      // Get the current dimensions of the receipt container
      const rect = element.getBoundingClientRect();
      
      // Calculate scale to maintain aspect ratio while ensuring good quality
      // Target a reasonable output size (e.g., 1200px width max)
      const targetWidth = Math.min(1200, rect.width * 2);
      const scale = targetWidth / rect.width;

      const canvas = await html2canvas(element, {
        scale: scale,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#ffffff",
        width: rect.width,
        height: rect.height,
        logging: false,
      });

      // Create download link
      const link = document.createElement("a");
      link.download = "opay_receipt.png";
      link.href = canvas.toDataURL("image/png");
      link.click();

      toast({
        title: "Download Started",
        description: "Your receipt image is being downloaded.",
      });
    } catch (error) {
      console.error("Error generating image:", error);
      toast({
        title: "Download Failed",
        description: "Failed to generate image. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            OPay Receipt Generator
          </h1>
          <p className="text-muted-foreground">
            Generate professional OPay transaction receipts
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Form Section */}
          <Card>
            <CardHeader>
              <CardTitle>Receipt Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₦)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  placeholder="1000.00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) =>
                    setFormData({ ...formData, customerName: e.target.value })
                  }
                  placeholder="Enter customer name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceAddress">Service Address</Label>
                <Textarea
                  id="serviceAddress"
                  value={formData.serviceAddress}
                  onChange={(e) =>
                    setFormData({ ...formData, serviceAddress: e.target.value })
                  }
                  placeholder="Enter service address"
                  className="min-h-20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateTime">Date and Time</Label>
                <Input
                  id="dateTime"
                  type="datetime-local"
                  value={formData.dateTime}
                  onChange={(e) =>
                    setFormData({ ...formData, dateTime: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={handleGenerateReceipt} className="flex-1">
                  Generate Receipt
                </Button>
                {receiptData && (
                  <Button
                    onClick={handleDownloadImage}
                    variant="outline"
                    className="flex-1"
                  >
                    Download Image
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Receipt Preview Section */}
          <div className="flex justify-center">
            {receiptData ? (
              <ReceiptPreview data={receiptData} />
            ) : (
              <Card className="w-full max-w-md">
                <CardContent className="flex items-center justify-center h-96">
                  <div className="text-center text-muted-foreground">
                    <p className="text-lg mb-2">No receipt generated</p>
                    <p className="text-sm">Fill the form and generate a receipt to see the preview</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
