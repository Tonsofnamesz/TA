import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams,
} from "react-router-dom";

import AppLayout from "../../components/layout/AppLayout";

import AssignmentForm from "./AssignmentForm";

import {
    getAssignment,
    updateAssignment,
} from "../../api/assignments";

export default function AssignmentEdit() {
    const { id } = useParams();

    const navigate = useNavigate();

    const [assignment, setAssignment] =
        useState<any>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const loadAssignment =
            async () => {
                try {
                    const data =
                        await getAssignment(
                            Number(id)
                        );

                    setAssignment(data);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };

        loadAssignment();
    }, [id]);

    const handleSubmit = async (
        data: any
    ) => {
        try {
            await updateAssignment(
                Number(id),
                data
            );

            navigate("/assignments");
        } catch (error) {
            console.error(error);

            alert(
                "Failed to update assignment"
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
            <div className="flex items-center gap-3 mb-6">

                <button
                    type="button"
                    onClick={() => navigate("/assignments")}
                    className="
            px-4 py-2
            border border-gray-300
            rounded-lg
            text-gray-700
            bg-blue-600
            hover:bg-blue-700
            text-white
            transition
        "
                >
                    ← Back
                </button>
                <h1 className="text-2xl font-bold">
                    Edit Assignment
                </h1>
            </div>

            {/* Assignment Information */}
            <div className="bg-white p-5 rounded-lg shadow mb-6">
                <h2 className="text-lg font-semibold mb-4">
                    Assignment Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-500">
                            Asset Serial Number
                        </p>

                        <p className="font-medium">
                            {assignment?.asset?.serial_number ?? "-"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Assigned User
                        </p>

                        <p className="font-medium">
                            {assignment?.assigned_to || "-"}
                        </p>
                    </div>
                </div>
            </div>

            <AssignmentForm
                initialData={assignment}
                onSubmit={handleSubmit}
                isEdit={true}
            />
        </AppLayout>
    );
}