export interface Supplier {
  id: number;
  supplier_code: string;
  supplier_name: string;
  country?: string | null;
  created_at?: string;
  updated_at?: string;
}