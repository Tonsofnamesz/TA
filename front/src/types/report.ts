export interface WarrantyReport {
    serial_number: string;
    warranty_start: string;
    warranty_end: string;
    latest_user: string;
}

export interface AssetReport {
    serial_number: string;
    activation_date: string;
    value: number;
    invoice: string;
    capex: string;
    latest_user: string;
}