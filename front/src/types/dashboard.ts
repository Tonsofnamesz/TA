export interface DashboardSummary {
    total_assets: number;
    available_assets: number;
    assigned_assets: number;
    broken_assets: number;
    lost_assets: number;
    disposed_assets: number;
}

export interface WarrantySummary {
    expired: number;
    expiring_30_days: number;
    expiring_60_days: number;
    expiring_90_days: number;
}

export interface ExpiringAsset {
    id: number;
    serial_number: string;
    manufacturer: string;
    model: string;
    warranty_end: string;
    status: string;
}