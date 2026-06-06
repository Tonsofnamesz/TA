import { useEffect, useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import { useNavigate } from "react-router-dom";

import {
    getAssignments,
    returnAssignment,
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
        const confirmed = window.confirm(
            "Return this asset?"
        );

        if (!confirmed) return;

        try {
            await returnAssignment(id);

            await loadAssignments();
        } catch (error) {
            console.error(error);

            alert(
                "Failed to return asset"
            );
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
                                    assignment.asset
                                        ?.status ===
                                    "available";

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
