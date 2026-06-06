export interface Assignment {
    id: number;

    asset_id: number;

    assigned_to: string | null;

    site_id: number | null;

    department_id: number | null;

    computer_name: string | null;

    fqdn: string | null;

    notes: string | null;

    start_date: string;

    end_date: string | null;

    asset?: any;

    site?: any;

    department?: any;
}