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
            <h1 className="text-2xl font-bold mb-6">
                Edit Assignment
            </h1>

            <AssignmentForm
                initialData={assignment}
                onSubmit={handleSubmit}
                isEdit={true}
            />
        </AppLayout>
    );
}