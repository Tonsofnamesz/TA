import { useEffect, useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import {
    getDeviceTypes,
    createDeviceType,
    updateDeviceType,
    deleteDeviceType,
} from "../../api/deviceTypes";
import Swal from "sweetalert2";

interface DeviceType {
    id: number;
    name: string;
    created_at?: string;
    updated_at?: string;
}

export default function DeviceTypeList() {
    const [deviceTypes, setDeviceTypes] = useState<DeviceType[]>([]);
    const [name, setName] = useState("");
    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const loadDeviceTypes = async () => {
        setLoading(true);

        try {
            const data = await getDeviceTypes();
            setDeviceTypes(data);
        } catch (error) {
            console.error("Failed to load device types:", error);
            await Swal.fire(
                "Error",
                "Failed to load device types.",
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDeviceTypes();
    }, []);

    const resetForm = () => {
        setName("");
        setEditingId(null);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const trimmedName = name.trim();

        if (!trimmedName) {
            await Swal.fire(
                "Validation Error",
                "Device type name is required.",
                "warning"
            );
            return;
        }

        setSaving(true);

        try {
            if (editingId !== null) {
                await updateDeviceType(editingId, { name: trimmedName });
                await Swal.fire(
                    "Updated",
                    "Device type updated successfully.",
                    "success"
                );
            } else {
                await createDeviceType({ name: trimmedName });
                await Swal.fire(
                    "Created",
                    "Device type created successfully.",
                    "success"
                );
            }

            resetForm();
            await loadDeviceTypes();
        } catch (error: any) {
            console.error("Failed to save device type:", error);

            const message =
                error?.response?.data?.errors?.name?.[0] ??
                error?.response?.data?.message ??
                "Failed to save device type.";

            await Swal.fire("Error", message, "error");
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (deviceType: DeviceType) => {
        setEditingId(deviceType.id);
        setName(deviceType.name);
    };

    const handleDelete = async (deviceType: DeviceType) => {
        const result = await Swal.fire({
            title: "Delete device type?",
            text: `Are you sure you want to delete "${deviceType.name}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel",
        });

        if (!result.isConfirmed) return;

        try {
            await deleteDeviceType(deviceType.id);

            if (editingId === deviceType.id) {
                resetForm();
            }

            await Swal.fire(
                "Deleted",
                "Device type deleted successfully.",
                "success"
            );

            await loadDeviceTypes();
        } catch (error: any) {
            console.error("Failed to delete device type:", error);

            const message =
                error?.response?.data?.message ??
                "Failed to delete device type.";

            await Swal.fire("Error", message, "error");
        }
    };

    const filteredDeviceTypes = deviceTypes.filter((deviceType) =>
        deviceType.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AppLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Device Types</h1>

                {/* Add / Edit Form */}
                <div className="bg-white rounded shadow p-4 mb-6">
                    <h2 className="text-lg font-semibold mb-4">
                        {editingId !== null
                            ? "Edit Device Type"
                            : "Add Device Type"}
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="device-type-name"
                                className="block text-sm font-medium mb-1"
                            >
                                Device Type Name
                            </label>

                            <input
                                id="device-type-name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Laptop, Desktop, Network Switch"
                                maxLength={255}
                                required
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="submit"
                                disabled={saving}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                            >
                                {saving
                                    ? "Saving..."
                                    : editingId !== null
                                      ? "Update Device Type"
                                      : "Add Device Type"}
                            </button>

                            {editingId !== null && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Device Types Table */}
                <div className="bg-white rounded shadow p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
                        <h2 className="text-lg font-semibold">
                            Device Type List
                        </h2>

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search device types..."
                            className="border rounded px-3 py-2"
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="text-left p-3">No.</th>
                                    <th className="text-left p-3">
                                        Device Type Name
                                    </th>
                                    <th className="text-left p-3">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={3} className="text-center p-4">
                                            Loading device types...
                                        </td>
                                    </tr>
                                ) : filteredDeviceTypes.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="text-center p-4">
                                            No device types found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredDeviceTypes.map((deviceType, index) => (
                                        <tr
                                            key={deviceType.id}
                                            className="border-t hover:bg-slate-50"
                                        >
                                            <td className="p-3">{index + 1}</td>
                                            <td className="p-3">{deviceType.name}</td>
                                            <td className="p-3">
                                                <div className="flex gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleEdit(deviceType)}
                                                        className="text-green-600 hover:underline"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(deviceType)}
                                                        className="text-red-600 hover:underline"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
