import { useEffect, useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
    getAssignments,
    returnAssignment,
    deleteAssignment,
} from "../../api/assignments";

export default function AssignmentList() {
    const navigate = useNavigate();

    const [assignments, setAssignments] =
        useState<any[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        loadAssignments();
    }, []);

    const loadAssignments = async () => {
        try {
            const data =
                await getAssignments();

            setAssignments(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleReturn = async (
        id: number
    ) => {

        const result =
            await Swal.fire({
                title: "Return Asset?",
                text: "This asset will become available again.",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Return",
                cancelButtonText: "Cancel",
            });

        if (!result.isConfirmed)
            return;

        try {

            await returnAssignment(id);

            await Swal.fire({
                title: "Success",
                text: "Asset returned successfully.",
                icon: "success",
            });

            await loadAssignments();

        } catch (error: any) {

            Swal.fire({
                title: "Error",
                text:
                    error?.response?.data?.message ||
                    "Failed to return asset",
                icon: "error",
            });
        }
    };

    const handleDelete = async (
        id: number
    ) => {

        const result =
            await Swal.fire({
                title:
                    "Delete Assignment?",
                text:
                    "This action cannot be undone.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText:
                    "Delete",
                cancelButtonText:
                    "Cancel",
            });

        if (!result.isConfirmed)
            return;

        try {

            await deleteAssignment(id);

            await Swal.fire({
                title: "Deleted",
                text:
                    "Assignment deleted successfully.",
                icon: "success",
            });

            await loadAssignments();

        } catch (error: any) {

            Swal.fire({
                title: "Cannot Delete",
                text:
                    error?.response?.data?.message ||
                    "Failed to delete assignment",
                icon: "error",
            });
        }
    };

    if (loading) {
        return (
            <AppLayout>
                <p>Loading...</p>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">
                    Assignments
                </h1>

                <button
                    onClick={() =>
                        navigate(
                            "/assignments/create"
                        )
                    }
                    className="
                        bg-blue-600
                        text-white
                        px-4
                        py-2
                        rounded
                        hover:bg-blue-700
                    "
                >
                    + New Assignment
                </button>
            </div>

            <div className="bg-white rounded shadow overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">
                                Asset
                            </th>

                            <th className="p-3 text-left">
                                Assigned To
                            </th>

                            <th className="p-3 text-left">
                                Site
                            </th>

                            <th className="p-3 text-left">
                                Department
                            </th>

                            <th className="p-3 text-left">
                                Start Date
                            </th>

                            <th className="p-3 text-left">
                                End Date
                            </th>

                            <th className="p-3 text-left">
                                Status
                            </th>

                            <th className="p-3 text-left">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {assignments.map(
                            (assignment: any) => {
                                const isReturned =
                                    !!assignment.end_date;

                                return (
                                    <tr
                                        key={
                                            assignment.id
                                        }
                                        className="border-t hover:bg-slate-50"
                                    >
                                        <td className="p-3">
                                            {
                                                assignment
                                                    .asset
                                                    ?.serial_number
                                            }
                                        </td>

                                        <td className="p-3">
                                            {
                                                assignment.assigned_to
                                            }
                                        </td>

                                        <td className="p-3">
                                            {
                                                assignment
                                                    .site
                                                    ?.site_name
                                            }
                                        </td>

                                        <td className="p-3">
                                            {
                                                assignment
                                                    .department
                                                    ?.name
                                            }
                                        </td>

                                        <td className="p-3">
                                            {
                                                assignment.start_date
                                            }
                                        </td>

                                        <td className="p-3">
                                            {assignment.end_date ??
                                                "-"}
                                        </td>

                                        <td className="p-3">
                                            <span
                                                className={`px-2 py-1 rounded text-xs ${isReturned
                                                    ? "bg-gray-200 text-gray-700"
                                                    : "bg-green-100 text-green-700"
                                                    }`}
                                            >
                                                {isReturned
                                                    ? "Returned"
                                                    : "Active"}
                                            </span>
                                        </td>

                                        <td className="p-3 space-x-3">
                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/assignments/${assignment.id}`
                                                    )
                                                }
                                                className="
            text-blue-600
            hover:underline
        "
                                            >
                                                View
                                            </button>

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/assignments/${assignment.id}/edit`
                                                    )
                                                }
                                                className="
            text-green-600
            hover:underline
        "
                                            >
                                                Edit
                                            </button>

                                            {!isReturned && (
                                                <button
                                                    onClick={() =>
                                                        handleReturn(
                                                            assignment.id
                                                        )
                                                    }
                                                    className="
                text-orange-600
                hover:underline
            "
                                                >
                                                    Return
                                                </button>
                                            )}

                                            {isReturned && (
                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            assignment.id
                                                        )
                                                    }
                                                    className="
            text-red-600
            hover:underline
        "
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            }
                        )}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
