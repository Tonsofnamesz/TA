
import { useEffect, useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
} from "../../api/users";
import type { User, CreateUserData, UpdateUserData } from "../../api/users";
import Swal from "sweetalert2";

export default function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [role, setRole] = useState<"admin" | "viewer">("viewer");
    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const loadUsers = async () => {
        setLoading(true);

        try {
            const data = await getUsers();
            setUsers(data);
        } catch (error: any) {
            console.error("Failed to load users:", error);

            await Swal.fire(
                "Error",
                error?.response?.data?.message ?? "Failed to load users.",
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void loadUsers();
    }, []);

    const resetForm = () => {
        setName("");
        setEmail("");
        setPassword("");
        setPasswordConfirmation("");
        setRole("viewer");
        setEditingId(null);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const trimmedName = name.trim();
        const trimmedEmail = email.trim();

        if (!trimmedName || !trimmedEmail) {
            await Swal.fire(
                "Validation Error",
                "Name and email are required.",
                "warning"
            );
            return;
        }

        if (editingId === null && !password) {
            await Swal.fire(
                "Validation Error",
                "Password is required for a new account.",
                "warning"
            );
            return;
        }

        if (password && password.length < 8) {
            await Swal.fire(
                "Validation Error",
                "Password must contain at least 8 characters.",
                "warning"
            );
            return;
        }

        if (password && password !== passwordConfirmation) {
            await Swal.fire(
                "Validation Error",
                "Passwords do not match.",
                "warning"
            );
            return;
        }

        setSaving(true);

        try {
            if (editingId !== null) {
                const data: UpdateUserData = {
                    name: trimmedName,
                    email: trimmedEmail,
                    role,
                };

                if (password) {
                    data.password = password;
                    data.password_confirmation = passwordConfirmation;
                }

                await updateUser(editingId, data);

                await Swal.fire(
                    "Updated",
                    "User updated successfully.",
                    "success"
                );
            } else {
                const data: CreateUserData = {
                    name: trimmedName,
                    email: trimmedEmail,
                    password,
                    password_confirmation: passwordConfirmation,
                    role,
                };

                await createUser(data);

                await Swal.fire(
                    "Created",
                    "User account created successfully.",
                    "success"
                );
            }

            resetForm();
            await loadUsers();
        } catch (error: any) {
            console.error("Failed to save user:", error);

            const errors = error?.response?.data?.errors;
            const message =
                errors?.email?.[0] ??
                errors?.password?.[0] ??
                errors?.role?.[0] ??
                errors?.name?.[0] ??
                error?.response?.data?.message ??
                "Failed to save user.";

            await Swal.fire("Error", message, "error");
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (user: User) => {
        setEditingId(user.id);
        setName(user.name);
        setEmail(user.email);
        setRole(user.roles?.[0]?.name === "admin" ? "admin" : "viewer");
        setPassword("");
        setPasswordConfirmation("");

        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (user: User) => {
        const result = await Swal.fire({
            title: "Delete user account?",
            text: `Are you sure you want to delete "${user.name}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel",
        });

        if (!result.isConfirmed) return;

        try {
            await deleteUser(user.id);

            if (editingId === user.id) {
                resetForm();
            }

            await Swal.fire(
                "Deleted",
                "User account deleted successfully.",
                "success"
            );

            await loadUsers();
        } catch (error: any) {
            console.error("Failed to delete user:", error);

            await Swal.fire(
                "Error",
                error?.response?.data?.message ?? "Failed to delete user.",
                "error"
            );
        }
    };

    const filteredUsers = users.filter((user) => {
        const query = search.toLowerCase();

        return (
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            user.roles?.some((userRole) =>
                userRole.name.toLowerCase().includes(query)
            )
        );
    });

    return (
        <AppLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">User Management</h1>

                {/* Add / Edit Form */}
                <div className="bg-white rounded shadow p-4 mb-6">
                    <h2 className="text-lg font-semibold mb-4">
                        {editingId !== null ? "Edit User" : "Create User"}
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="user-name"
                                className="block text-sm font-medium mb-1"
                            >
                                Full Name
                            </label>

                            <input
                                id="user-name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter full name"
                                maxLength={255}
                                required
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="user-email"
                                className="block text-sm font-medium mb-1"
                            >
                                Email Address
                            </label>

                            <input
                                id="user-email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="user@example.com"
                                maxLength={255}
                                required
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="user-password"
                                className="block text-sm font-medium mb-1"
                            >
                                Password {editingId !== null && "(leave blank to keep current password)"}
                            </label>

                            <input
                                id="user-password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={
                                    editingId !== null
                                        ? "Leave blank to keep current password"
                                        : "At least 8 characters"
                                }
                                minLength={8}
                                required={editingId === null}
                                autoComplete="new-password"
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="user-password-confirmation"
                                className="block text-sm font-medium mb-1"
                            >
                                Confirm Password
                            </label>

                            <input
                                id="user-password-confirmation"
                                type="password"
                                value={passwordConfirmation}
                                onChange={(e) =>
                                    setPasswordConfirmation(e.target.value)
                                }
                                placeholder="Re-enter password"
                                required={editingId === null || password.length > 0}
                                autoComplete="new-password"
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="user-role"
                                className="block text-sm font-medium mb-1"
                            >
                                Account Role
                            </label>

                            <select
                                id="user-role"
                                value={role}
                                onChange={(e) =>
                                    setRole(e.target.value as "admin" | "viewer")
                                }
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="admin">Admin</option>
                                <option value="viewer">Viewer</option>
                            </select>
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
                                      ? "Update User"
                                      : "Create User"}
                            </button>

                            {editingId !== null && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    disabled={saving}
                                    className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded shadow p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
                        <h2 className="text-lg font-semibold">User List</h2>

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search name, email, or role..."
                            className="border rounded px-3 py-2"
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="text-left p-3">No.</th>
                                    <th className="text-left p-3">Name</th>
                                    <th className="text-left p-3">Email</th>
                                    <th className="text-left p-3">Role</th>
                                    <th className="text-left p-3">Created At</th>
                                    <th className="text-left p-3">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="text-center p-4">
                                            Loading users...
                                        </td>
                                    </tr>
                                ) : filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center p-4">
                                            No users found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((user, index) => (
                                        <tr
                                            key={user.id}
                                            className="border-t hover:bg-slate-50"
                                        >
                                            <td className="p-3">{index + 1}</td>
                                            <td className="p-3">{user.name}</td>
                                            <td className="p-3">{user.email}</td>
                                            <td className="p-3">
                                                {user.roles?.map((userRole) => (
                                                    <span
                                                        key={userRole.id}
                                                        className={`inline-block rounded px-2 py-1 text-xs font-medium ${
                                                            userRole.name === "admin"
                                                                ? "bg-blue-100 text-blue-800"
                                                                : "bg-gray-100 text-gray-700"
                                                        }`}
                                                    >
                                                        {userRole.name === "admin"
                                                            ? "Admin"
                                                            : "Viewer"}
                                                    </span>
                                                ))}
                                            </td>
                                            <td className="p-3">
                                                {user.created_at
                                                    ? new Date(user.created_at).toLocaleDateString()
                                                    : "-"}
                                            </td>
                                            <td className="p-3">
                                                <div className="flex gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleEdit(user)}
                                                        className="text-green-600 hover:underline"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(user)}
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
