export interface Asset {
  id: number;

  serial_number: string;

  device_type_id: number;
  supplier_id?: number | null;

  manufacturer?: string | null;
  model?: string | null;
  version?: string | null;

  ram_gb?: number | null;
  storage_gb?: number | null;

  invoice_number?: string | null;
  purchase_price?: number | null;
  capex_number?: string | null;

  ship_date?: string | null;
  warranty_start?: string | null;
  warranty_end?: string | null;

  status: "available" | "assigned" | "broken" | "lost" | "disposed";

  warranty_status?: "active" | "expiring" | "expired" | null;

  created_at?: string;
  updated_at?: string;
}