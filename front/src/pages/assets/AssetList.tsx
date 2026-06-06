import { useEffect, useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import { getAssets } from "../../api/assets";
import { useNavigate } from "react-router-dom";
import { deleteAsset } from "../../api/assets";


export default function AssetsPage() {
    const navigate = useNavigate();
    const [assets, setAssets] = useState([]);
    const [showFull, setShowFull] = useState(false);
    const [filters, setFilters] = useState({
        serial: "",
        manufacturer: "",
        model: "",
        status: "",
        deviceType: "",
        warrantyStatus: "",
    });

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const data = await getAssets();
        setAssets(data);
    };
    const handleDelete = async (id: number) => {
        const confirmed = window.confirm(
            "Delete this asset?"
        );

        if (!confirmed) return;

        try {
            await deleteAsset(id);

            await load();
        } catch (error) {
            console.error(error);

            alert("Failed to delete asset");
        }
    };

    const filteredAssets = assets.filter((asset: any) => {
        const serialMatch =
            !filters.serial ||
            asset.serial_number
                ?.toLowerCase()
                .includes(filters.serial.toLowerCase());

        const manufacturerMatch =
            !filters.manufacturer ||
            asset.manufacturer
                ?.toLowerCase()
                .includes(filters.manufacturer.toLowerCase());

        const modelMatch =
            !filters.model ||
            asset.model
                ?.toLowerCase()
                .includes(filters.model.toLowerCase());

        const statusMatch =
            !filters.status ||
            asset.status === filters.status;

        const deviceTypeMatch =
            !filters.deviceType ||
            asset.device_type?.name === filters.deviceType;

        const warrantyMatch =
            !filters.warrantyStatus ||
            asset.warranty_status === filters.warrantyStatus;

        return (
            serialMatch &&
            manufacturerMatch &&
            modelMatch &&
            statusMatch &&
            deviceTypeMatch &&
            warrantyMatch
        );
    });

    return (
        <AppLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Assets</h1>

                <button
                    onClick={() => navigate("/assets/create")}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    + Add Asset
                </button>
            </div>
            <div className="bg-white rounded shadow p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-3">

                    <input
                        type="text"
                        placeholder="Serial Number"
                        value={filters.serial}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                serial: e.target.value,
                            })
                        }
                        className="border rounded p-2"
                    />

                    <input
                        type="text"
                        placeholder="Manufacturer"
                        value={filters.manufacturer}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                manufacturer: e.target.value,
                            })
                        }
                        className="border rounded p-2"
                    />

                    <input
                        type="text"
                        placeholder="Model"
                        value={filters.model}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                model: e.target.value,
                            })
                        }
                        className="border rounded p-2"
                    />

                    <select
                        value={filters.status}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                status: e.target.value,
                            })
                        }
                        className="border rounded p-2"
                    >
                        <option value="">All Status</option>
                        <option value="available">Available</option>
                        <option value="assigned">Assigned</option>
                        <option value="broken">Broken</option>
                        <option value="lost">Lost</option>
                        <option value="disposed">Disposed</option>
                    </select>

                    <select
                        value={filters.warrantyStatus}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                warrantyStatus: e.target.value,
                            })
                        }
                        className="border rounded p-2"
                    >
                        <option value="">Warranty</option>
                        <option value="active">Active</option>
                        <option value="expiring">Expiring</option>
                        <option value="expired">Expired</option>
                    </select>

                    <button
                        onClick={() =>
                            setFilters({
                                serial: "",
                                manufacturer: "",
                                model: "",
                                status: "",
                                deviceType: "",
                                warrantyStatus: "",
                            })
                        }
                        className="bg-slate-700 text-white rounded px-4 py-2"
                    >
                        Reset
                    </button>

                </div>
            </div>

            <div className="bg-white rounded shadow overflow-x-auto">
                <table className="w-full text-sm">
                    <tr>
                        <th className="p-3 text-left">Serial</th>
                        <th className="p-3 text-left">Model</th>
                        <th className="p-3 text-left">Status</th>

                        {showFull && (
                            <>
                                <th className="p-3 text-left">RAM</th>
                                <th className="p-3 text-left">Storage</th>
                                <th className="p-3 text-left">Assigned To</th>
                            </>
                        )}

                        <th className="p-3 text-left">Warranty</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>

                    <div className="flex justify-between items-center mb-3">
                        <p className="text-gray-600">
                            Showing {filteredAssets.length} assets
                        </p>

                        <button
                            onClick={() => setShowFull(!showFull)}
                            className="bg-slate-800 text-white px-4 py-2 rounded"
                        >
                            {showFull
                                ? "Simple View"
                                : "Full Details"}
                        </button>
                    </div>

                    <tbody>
                        {Array.isArray(filteredAssets) &&
                            filteredAssets.map((asset: any) => (
                                <tr
                                    key={asset.id}
                                    className="border-t hover:bg-slate-50 transition"
                                >
                                    <td className="p-3">{asset.serial_number}</td>
                                    <td className="p-3">{asset.model ?? "-"}</td>
                                    <td className="p-3">{asset.status}</td>

                                    {showFull && (
                                        <>
                                            <td className="p-3">{asset.ram_gb ?? "-"}</td>
                                            <td className="p-3">{asset.storage_gb ?? "-"}</td>
                                            <td className="p-3">
                                                {asset.assignments?.[0]?.assigned_to ?? "-"}
                                            </td>
                                        </>
                                    )}
                                    <td className="p-3">
                                        <span className="px-2 py-1 bg-gray-200 rounded text-xs">
                                            {asset.status}
                                        </span>
                                    </td>

                                    <td className="p-3">
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${asset.warranty_status === "expired"
                                                ? "bg-red-200 text-red-700"
                                                : asset.warranty_status === "expiring"
                                                    ? "bg-yellow-200 text-yellow-700"
                                                    : "bg-green-200 text-green-700"
                                                }`}
                                        >
                                            {asset.warranty_status ?? "N/A"}
                                        </span>
                                    </td>

                                    <td className="p-3 space-x-2">
                                        <button
                                            onClick={() => navigate(`/assets/${asset.id}`)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            View
                                        </button>

                                        <button
                                            onClick={() =>
                                                navigate(`/assets/${asset.id}/edit`)
                                            }
                                            className="text-green-600 hover:underline"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(asset.id)}
                                            className="text-red-600 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}