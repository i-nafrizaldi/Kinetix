export interface Invoice {
  id: number;

  orderId: number;

  invoiceNumber: string;

  fileUrl: string | null;

  issuedAt: string;
}