
import { useCallback, useEffect, useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import {
    createSite,
    deleteSite,
    getSites,
    updateSite,
} from "../../api/sites";
import type { Site, SitePayload } from "../../api/sites";
import Swal from "sweetalert2";

export default function SiteList() {
    const [sites, setSites] = useState<Site[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [search, setSearch] = useState("");

    const emptyForm: SitePayload = {
        site_code: "",
        site_name: "",
        country: "",
    };

    const [form, setForm] = useState<SitePayload>(emptyForm);

    const loadSites = useCallback(async () => {
        setLoading(true);

        try {
            const data = await getSites();
            setSites(data);
        } catch (error: any) {
            console.error(error);

            await Swal.fire({
                title: "Error",
                text:
                    error?.response?.data?.message ??
                    "Failed to load sites.",
                icon: "error",
            });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void loadSites();
    }, [loadSites]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const resetForm = () => {
        setForm(emptyForm);
        setEditingId(null);
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setSaving(true);

        const payload: SitePayload = {
            site_code: form.site_code.trim(),
            site_name: form.site_name.trim(),
            country: form.country.trim(),
        };

        try {
            if (editingId !== null) {
                await updateSite(editingId, payload);

                await Swal.fire({
                    title: "Updated",
                    text: "Site updated successfully.",
                    icon: "success",
                });
            } else {
                await createSite(payload);

                await Swal.fire({
                    title: "Saved",
                    text: "Site added successfully.",
                    icon: "success",
                });
            }

            resetForm();
            await loadSites();
        } catch (error: any) {
            console.error(error);

            const errors = error?.response?.data?.errors;
            const validationMessage = errors
                ? Object.values(errors).flat().join("\n")
                : null;

            await Swal.fire({
                title: "Error",
                text:
                    validationMessage ||
                    error?.response?.data?.message ||
                    "Failed to save site.",
                icon: "error",
            });
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (site: Site) => {
        setEditingId(site.id);
        setForm({
            site_code: site.site_code,
            site_name: site.site_name,
            country: site.country ?? "",
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (site: Site) => {
        const result = await Swal.fire({
            title: "Delete Site?",
            text: `Delete ${site.site_name} (${site.site_code})?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
        });

        if (!result.isConfirmed) return;

        try {
            await deleteSite(site.id);

            await Swal.fire({
                title: "Deleted",
                text: "Site deleted successfully.",
                icon: "success",
            });

            if (editingId === site.id) {
                resetForm();
            }

            await loadSites();
        } catch (error: any) {
            console.error(error);

            await Swal.fire({
                title: "Error",
                text:
                    error?.response?.data?.message ??
                    "Failed to delete site.",
                icon: "error",
            });
        }
    };

    const filteredSites = sites.filter((site) => {
        const query = search.toLowerCase();

        return (
            site.site_code.toLowerCase().includes(query) ||
            site.site_name.toLowerCase().includes(query) ||
            (site.country ?? "").toLowerCase().includes(query)
        );
    });

    return (
        <AppLayout>
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Sites</h1>
                <p className="text-gray-600 mt-1">
                    Manage site codes, names, and countries.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-white rounded shadow p-6 mb-6"
            >
                <h2 className="text-lg font-semibold mb-4">
                    {editingId !== null ? "Edit Site" : "Add Site"}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label
                            htmlFor="site_code"
                            className="block text-sm font-medium mb-1"
                        >
                            Site Code
                        </label>
                        <input
                            id="site_code"
                            name="site_code"
                            value={form.site_code}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                            placeholder="JKT-001"
                            maxLength={255}
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="site_name"
                            className="block text-sm font-medium mb-1"
                        >
                            Site Name
                        </label>
                        <input
                            id="site_name"
                            name="site_name"
                            value={form.site_name}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                            placeholder="Jakarta Office"
                            maxLength={255}
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="country"
                            className="block text-sm font-medium mb-1"
                        >
                            Country
                        </label>
                        <input
                            id="country"
                            name="country"
                            value={form.country ?? ""}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                            placeholder="Indonesia"
                            maxLength={255}
                        />
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-5">
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded"
                    >
                        {saving
                            ? "Saving..."
                            : editingId !== null
                                ? "Update Site"
                                : "Save Site"}
                    </button>

                    {editingId !== null && (
                        <button
                            type="button"
                            onClick={resetForm}
                            disabled={saving}
                            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
                        >
                            Cancel Edit
                        </button>
                    )}
                </div>
            </form>

            <div className="bg-white rounded shadow overflow-x-auto">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 p-4 border-b">
                    <div>
                        <h2 className="text-lg font-semibold">
                            Registered Sites
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Showing {filteredSites.length} of {sites.length} sites
                        </p>
                    </div>

                    <input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search sites..."
                        className="border rounded p-2 w-full sm:w-72"
                    />
                </div>

                {loading ? (
                    <p className="p-6 text-gray-600">Loading sites...</p>
                ) : (
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 text-left">Site Code</th>
                                <th className="p-3 text-left">Site Name</th>
                                <th className="p-3 text-left">Country</th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredSites.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="p-6 text-center text-gray-500"
                                    >
                                        {sites.length === 0
                                            ? "No sites have been added yet."
                                            : "No sites match your search."}
                                    </td>
                                </tr>
                            ) : (
                                filteredSites.map((site) => (
                                    <tr
                                        key={site.id}
                                        className="border-t hover:bg-slate-50"
                                    >
                                        <td className="p-3">
                                            {site.site_code}
                                        </td>
                                        <td className="p-3">
                                            {site.site_name}
                                        </td>
                                        <td className="p-3">
                                            {site.country || "-"}
                                        </td>
                                        <td className="p-3 whitespace-nowrap space-x-3">
                                            <button
                                                type="button"
                                                onClick={() => handleEdit(site)}
                                                className="text-green-600 hover:underline"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(site)}
                                                className="text-red-600 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </AppLayout>
    );
}
