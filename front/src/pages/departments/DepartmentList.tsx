
import { useEffect, useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import {
    getDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,
} from "../../api/departments";
import type { Department } from "../../api/departments";
import Swal from "sweetalert2";

function DepartmentList() {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [name, setName] = useState("");
    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const loadDepartments = async () => {
        setLoading(true);

        try {
            const data = await getDepartments();
            setDepartments(data);
        } catch (error) {
            console.error("Failed to load departments:", error);

            await Swal.fire(
                "Error",
                "Failed to load departments. Please try again.",
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDepartments();
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
                "Department name is required.",
                "warning"
            );
            return;
        }

        setSaving(true);

        try {
            if (editingId !== null) {
                await updateDepartment(editingId, { name: trimmedName });

                await Swal.fire(
                    "Updated",
                    "Department updated successfully.",
                    "success"
                );
            } else {
                await createDepartment({ name: trimmedName });

                await Swal.fire(
                    "Created",
                    "Department created successfully.",
                    "success"
                );
            }

            resetForm();
            await loadDepartments();
        } catch (error: any) {
            console.error("Failed to save department:", error);

            const message =
                error?.response?.data?.errors?.name?.[0] ??
                error?.response?.data?.message ??
                "Failed to save department. Please try again.";

            await Swal.fire("Error", message, "error");
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (department: Department) => {
        setEditingId(department.id);
        setName(department.name);
    };

    const handleDelete = async (department: Department) => {
        const result = await Swal.fire({
            title: "Delete department?",
            text: `Are you sure you want to delete "${department.name}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel",
        });

        if (!result.isConfirmed) return;

        try {
            await deleteDepartment(department.id);

            if (editingId === department.id) {
                resetForm();
            }

            await Swal.fire(
                "Deleted",
                "Department deleted successfully.",
                "success"
            );

            await loadDepartments();
        } catch (error: any) {
            console.error("Failed to delete department:", error);

            const message =
                error?.response?.data?.message ??
                "Failed to delete department. Please try again.";

            await Swal.fire("Error", message, "error");
        }
    };

    const filteredDepartments = departments.filter((department) =>
        department.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AppLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Departments</h1>

                {/* Add / Edit Form */}
                <div className="bg-white rounded shadow p-4 mb-6">
                    <h2 className="text-lg font-semibold mb-4">
                        {editingId !== null
                            ? "Edit Department"
                            : "Add Department"}
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="department-name"
                                className="block text-sm font-medium mb-1"
                            >
                                Department Name
                            </label>

                            <input
                                id="department-name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter department name"
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
                                      ? "Update Department"
                                      : "Add Department"}
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

                {/* Departments Table */}
                <div className="bg-white rounded shadow p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
                        <h2 className="text-lg font-semibold">
                            Department List
                        </h2>

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search departments..."
                            className="border rounded px-3 py-2"
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="text-left p-3">No.</th>
                                    <th className="text-left p-3">
                                        Department Name
                                    </th>
                                    <th className="text-left p-3">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td
                                            colSpan={3}
                                            className="text-center p-4"
                                        >
                                            Loading departments...
                                        </td>
                                    </tr>
                                ) : filteredDepartments.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={3}
                                            className="text-center p-4"
                                        >
                                            No departments found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredDepartments.map(
                                        (department, index) => (
                                            <tr
                                                key={department.id}
                                                className="border-t hover:bg-slate-50"
                                            >
                                                <td className="p-3">
                                                    {index + 1}
                                                </td>
                                                <td className="p-3">
                                                    {department.name}
                                                </td>
                                                <td className="p-3">
                                                    <div className="flex gap-3">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    department
                                                                )
                                                            }
                                                            className="text-green-600 hover:underline"
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    department
                                                                )
                                                            }
                                                            className="text-red-600 hover:underline"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

export default DepartmentList;
