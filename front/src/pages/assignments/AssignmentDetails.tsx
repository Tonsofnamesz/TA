import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AppLayout from "../../components/layout/AppLayout";

import { getAssignment } from "../../api/assignments";

export default function AssignmentDetail() {
    const { id } = useParams();

    const [assignment, setAssignment] =
        useState<any>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const load = async () => {
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

        load();
    }, [id]);

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
                Assignment Details
            </h1>

            <div className="bg-white p-6 rounded shadow">
                <div className="grid grid-cols-2 gap-6">

                    <div>
                        <p className="text-gray-500">
                            Asset
                        </p>
                        <p>
                            {assignment.asset?.serial_number}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Assigned To
                        </p>
                        <p>
                            {assignment.assigned_to}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Site
                        </p>
                        <p>
                            {assignment.site?.site_name}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Department
                        </p>
                        <p>
                            {assignment.department?.name}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Computer Name
                        </p>
                        <p>
                            {assignment.computer_name}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            FQDN
                        </p>
                        <p>
                            {assignment.fqdn}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Start Date
                        </p>
                        <p>
                            {assignment.start_date}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            End Date
                        </p>
                        <p>
                            {assignment.end_date ?? "-"}
                        </p>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}