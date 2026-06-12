import { useEffect, useState } from "react";

import { getAssets } from "../../api/assets";
import { getSites } from "../../api/sites";
import { getDepartments } from "../../api/departments";

import type { Site } from "../../types/site";
import type { Department } from "../../types/department";

interface Props {
    initialData?: any;
    onSubmit: (data: any) => Promise<void>;
    loading?: boolean;
    isEdit?: boolean;
}

export default function AssignmentForm({
    initialData,
    onSubmit,
    loading,
    isEdit = false,
}: Props) {
    const [assets, setAssets] = useState<any[]>([]);
    const [sites, setSites] = useState<Site[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);

    const [form, setForm] = useState({
        asset_id: "",
        assigned_to: "",
        site_id: "",
        department_id: "",
        computer_name: "",
        fqdn: "",
        notes: "",
        start_date: "",
        end_date: "",
    });

    useEffect(() => {
        const loadMeta = async () => {
            try {
                const [
                    assetsData,
                    sitesData,
                    departmentsData,
                ] = await Promise.all([
                    getAssets(),
                    getSites(),
                    getDepartments(),
                ]);

                if (isEdit && initialData?.asset_id) {
                    setAssets(assetsData);
                } else {
                    setAssets(
                        assetsData.filter(
                            (asset: any) =>
                                asset.status ===
                                "available"
                        )
                    );
                }

                setSites(sitesData);
                setDepartments(departmentsData);
            } catch (error) {
                console.error(error);
            }
        };

        loadMeta();
    }, [isEdit, initialData]);

    useEffect(() => {
        if (!initialData) return;

        setForm({
            asset_id: String(
                initialData.asset_id ?? ""
            ),

            assigned_to:
                initialData.assigned_to ?? "",

            site_id: String(
                initialData.site_id ?? ""
            ),

            department_id: String(
                initialData.department_id ?? ""
            ),

            computer_name:
                initialData.computer_name ?? "",

            fqdn:
                initialData.fqdn ?? "",

            notes:
                initialData.notes ?? "",

            start_date:
                initialData.start_date ?? "",

            end_date:
                initialData.end_date ?? "",
        });
    }, [initialData]);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLSelectElement |
            HTMLTextAreaElement
        >
    ) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]:
                e.target.value,
        }));
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        await onSubmit({
            ...form,

            asset_id:
                Number(form.asset_id),

            site_id:
                form.site_id
                    ? Number(form.site_id)
                    : null,

            department_id:
                form.department_id
                    ? Number(form.department_id)
                    : null,

            end_date:
                form.end_date || null,
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow space-y-5"
        >
            {/* Asset */}
            {!isEdit && (
                <>
                    {/* Asset */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Asset
                        </label>

                        <select
                            name="asset_id"
                            value={form.asset_id}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                            required
                        >
                            <option value="">
                                Select Asset
                            </option>

                            {assets.map((asset) => (
                                <option
                                    key={asset.id}
                                    value={asset.id}
                                >
                                    {asset.serial_number}
                                    {" - "}
                                    {asset.model ?? "No Model"}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Assigned To */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Assigned To
                        </label>

                        <input
                            type="text"
                            name="assigned_to"
                            value={form.assigned_to}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                            placeholder="Employee Name"
                        />
                    </div>

                    {/* Site + Department */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Site
                            </label>

                            <select
                                name="site_id"
                                value={form.site_id}
                                onChange={handleChange}
                                className="border rounded p-2 w-full"
                            >
                                <option value="">
                                    Select Site
                                </option>

                                {sites.map((site) => (
                                    <option
                                        key={site.id}
                                        value={site.id}
                                    >
                                        {site.site_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Department
                            </label>

                            <select
                                name="department_id"
                                value={form.department_id}
                                onChange={handleChange}
                                className="border rounded p-2 w-full"
                            >
                                <option value="">
                                    Select Department
                                </option>

                                {departments.map((department) => (
                                    <option
                                        key={department.id}
                                        value={department.id}
                                    >
                                        {department.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Computer Name + FQDN */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Computer Name
                            </label>

                            <input
                                type="text"
                                name="computer_name"
                                value={form.computer_name}
                                onChange={handleChange}
                                className="border rounded p-2 w-full"
                                placeholder="FIN-PC-001"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                FQDN
                            </label>

                            <input
                                type="text"
                                name="fqdn"
                                value={form.fqdn}
                                onChange={handleChange}
                                className="border rounded p-2 w-full"
                                placeholder="fin-pc-001.company.local"
                            />
                        </div>
                    </div>
                </>
            )}

            {/* Notes */}
            <div>
                <label className="block text-sm font-medium mb-1">
                    Notes
                </label>

                <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={4}
                    className="border rounded p-2 w-full"
                    placeholder="Optional notes..."
                />
            </div>

            {/* Start Date */}
            <div>
                <label className="block text-sm font-medium mb-1">
                    Start Date
                </label>

                <input
                    type="date"
                    name="start_date"
                    value={form.start_date}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                    required
                />
            </div>

            {/* End Date ONLY IN EDIT */}
            {isEdit && (
                <div>
                    <label className="block text-sm font-medium mb-1">
                        End Date
                    </label>

                    <input
                        type="date"
                        name="end_date"
                        value={form.end_date}
                        onChange={handleChange}
                        className="border rounded p-2 w-full"
                    />
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className="
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    px-4
                    py-2
                    rounded
                "
            >
                {loading
                    ? "Saving..."
                    : "Save Assignment"}
            </button>
        </form>
    );
}