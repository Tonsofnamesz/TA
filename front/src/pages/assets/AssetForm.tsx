import { useEffect, useState } from "react";
import { getDeviceTypes } from "../../api/deviceTypes";
import { getSuppliers } from "../../api/suppliers";
import type { DeviceType } from "../../types/deviceType";
import type { Supplier } from "../../types/supplier";
import type { Asset } from "../../types/assets";

interface Props {
    initialData?: Partial<Asset>;
    onSubmit: (data: any) => Promise<void>;
    loading?: boolean;
}

export default function AssetForm({
    initialData,
    onSubmit,
    loading,
}: Props) {
    console.log("INITIAL DATA:", initialData);
    const [deviceTypes, setDeviceTypes] = useState<DeviceType[]>([]);
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);

    const [form, setForm] = useState({
        serial_number: "",
        device_type_id: "",
        supplier_id: "",
        manufacturer: "",
        model: "",
        version: "",
        ram_gb: "",
        storage_gb: "",
        invoice_number: "",
        purchase_price: "",
        capex_number: "",
        ship_date: "",
        warranty_start: "",
        warranty_end: "",
        country: "",
        status: "available",
    });

    useEffect(() => {
        const loadMeta = async () => {
            const [dt, sp] = await Promise.all([
                getDeviceTypes(),
                getSuppliers(),
            ]);

            setDeviceTypes(dt);
            setSuppliers(sp);
        };

        loadMeta();
    }, []);

    useEffect(() => {
        if (!initialData) return;

        setForm({
            serial_number: initialData.serial_number ?? "",

            device_type_id: String(
                initialData.device_type_id ?? ""
            ),

            supplier_id: String(
                initialData.supplier_id ?? ""
            ),

            manufacturer:
                initialData.manufacturer ?? "",

            model:
                initialData.model ?? "",

            version:
                initialData.version ?? "",

            ram_gb:
                initialData.ram_gb?.toString() ?? "",

            storage_gb:
                initialData.storage_gb?.toString() ?? "",

            invoice_number:
                initialData.invoice_number ?? "",

            purchase_price:
                initialData.purchase_price?.toString() ?? "",

            capex_number:
                initialData.capex_number ?? "",

            ship_date:
                initialData.ship_date ?? "",

            warranty_start:
                initialData.warranty_start ?? "",

            warranty_end:
                initialData.warranty_end ?? "",

            country:
                initialData.country ?? "",

            status:
                initialData.status ?? "available",
        });
    }, [initialData]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await onSubmit({
            ...form,
            device_type_id: Number(form.device_type_id),
            supplier_id: form.supplier_id ? Number(form.supplier_id) : null,
            ram_gb: form.ram_gb ? Number(form.ram_gb) : null,
            storage_gb: form.storage_gb ? Number(form.storage_gb) : null,
            purchase_price: form.purchase_price
                ? Number(form.purchase_price)
                : null,
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow space-y-4"
        >
            {/* Serial */}
            <div>
                <label className="text-sm">Serial Number</label>
                <input
                    name="serial_number"
                    value={form.serial_number}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />
            </div>

            {/* Device Type */}
            <div>
                <label className="text-sm">Device Type</label>
                <select
                    name="device_type_id"
                    value={form.device_type_id}
                    onChange={handleChange}
                    className="border p-2 w-full"
                >
                    <option value="">Select</option>
                    {deviceTypes.map((dt) => (
                        <option key={dt.id} value={dt.id}>
                            {dt.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Supplier */}
            <div>
                <label className="text-sm">Supplier</label>
                <select
                    name="supplier_id"
                    value={form.supplier_id}
                    onChange={handleChange}
                    className="border p-2 w-full"
                >
                    <option value="">None</option>
                    {suppliers.map((s) => (
                        <option key={s.id} value={s.id}>
                            {s.supplier_name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Model */}
            <div className="grid grid-cols-2 gap-4">
                <input
                    name="manufacturer"
                    placeholder="Manufacturer"
                    value={form.manufacturer}
                    onChange={handleChange}
                    className="border p-2"
                />
                <input
                    name="model"
                    placeholder="Model"
                    value={form.model}
                    onChange={handleChange}
                    className="border p-2"
                />
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-4">
                <input
                    name="ram_gb"
                    placeholder="RAM (GB)"
                    value={form.ram_gb}
                    onChange={handleChange}
                    className="border p-2"
                />
                <input
                    name="storage_gb"
                    placeholder="Storage (GB)"
                    value={form.storage_gb}
                    onChange={handleChange}
                    className="border p-2"
                />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label className="text-sm">Ship Date</label>
                    <input
                        type="date"
                        name="ship_date"
                        value={form.ship_date}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </div>


                <div>
                    <label className="text-sm">Warranty Start</label>
                    <input
                        type="date"
                        name="warranty_start"
                        value={form.warranty_start}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </div>

                <div>
                    <label className="text-sm">Warranty End</label>
                    <input
                        type="date"
                        name="warranty_end"
                        value={form.warranty_end}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </div>
            </div>

            {/* Country */}
            <div>
                <label className="text-sm">Country</label>
                <input
                    name="country"
                    placeholder="Country"
                    value={form.country}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />
            </div>

            {/* Status */}
            <div>
                <label className="text-sm">Status</label>
                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="border p-2 w-full"
                >
                    <option value="available">Available</option>
                    <option value="assigned">Assigned</option>
                    <option value="broken">Broken</option>
                    <option value="lost">Lost</option>
                    <option value="disposed">Disposed</option>
                </select>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                {loading ? "Saving..." : "Save Asset"}
            </button>
        </form>
    );
}