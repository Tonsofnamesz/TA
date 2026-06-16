import { useEffect, useState } from "react";

import AppLayout from "../../components/layout/AppLayout";

import {
    getWarrantyReport,
    getAssetReport,
} from "../../api/reports";

export default function ReportsPage() {

    const [
        warrantyReport,
        setWarrantyReport
    ] = useState<any[]>([]);

    const [
        assetReport,
        setAssetReport
    ] = useState<any[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        const loadReports =
            async () => {

                try {

                    const [
                        warrantyData,
                        assetData
                    ] = await Promise.all([
                        getWarrantyReport(),
                        getAssetReport(),
                    ]);

                    setWarrantyReport(
                        warrantyData
                    );

                    setAssetReport(
                        assetData
                    );

                } catch (error) {

                    console.error(error);

                } finally {

                    setLoading(false);

                }
            };

        loadReports();

    }, []);

    if (loading) {
        return (
            <AppLayout>
                Loading...
            </AppLayout>
        );
    }

    return (
        <AppLayout>

            <h1 className="text-2xl font-bold mb-6">
                Reports
            </h1>

            {/* Warranty Report */}
            <div className="bg-white rounded shadow mb-8 overflow-x-auto">

                <div className="p-4 border-b">
                    <h2 className="text-lg font-semibold">
                        Warranty Report
                    </h2>
                </div>

                <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">
                                Serial Number
                            </th>

                            <th className="p-3 text-left">
                                Latest User
                            </th>

                            <th className="p-3 text-left">
                                Warranty Start
                            </th>

                            <th className="p-3 text-left">
                                Warranty End
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {warrantyReport.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="p-4 text-center text-gray-500"
                                >
                                    No data found
                                </td>
                            </tr>
                        ) : (
                            warrantyReport.map((asset) => (
                                <tr
                                    key={asset.id}
                                    className="border-t"
                                >
                                    <td className="p-3">
                                        {asset.serial_number}
                                    </td>

                                    <td className="p-3">
                                        {asset.latest_user ?? "-"}
                                    </td>

                                    <td className="p-3">
                                        {asset.warranty_start ?? "-"}
                                    </td>

                                    <td className="p-3">
                                        {asset.warranty_end ?? "-"}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

            </div>

            {/* Asset Report */}
            <div className="bg-white rounded shadow overflow-x-auto">

                <div className="p-4 border-b">
                    <h2 className="text-lg font-semibold">
                        Asset Report
                    </h2>
                </div>

                <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>

                            <th className="p-3 text-left">
                                Serial Number
                            </th>

                            <th className="p-3 text-left">
                                Latest User
                            </th>

                            <th className="p-3 text-left">
                                Activation Date
                            </th>

                            <th className="p-3 text-left">
                                Value
                            </th>

                            <th className="p-3 text-left">
                                Invoice
                            </th>

                            <th className="p-3 text-left">
                                CAPEX
                            </th>

                        </tr>
                    </thead>

                    <tbody>

                        {assetReport.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="p-4 text-center text-gray-500"
                                >
                                    No data found
                                </td>
                            </tr>
                        ) : (
                            assetReport.map((asset) => (
                                <tr
                                    key={asset.id}
                                    className="border-t"
                                >
                                    <td className="p-3">
                                        {asset.serial_number}
                                    </td>

                                    <td className="p-3">
                                        {asset.latest_user ?? "-"}
                                    </td>

                                    <td className="p-3">
                                        {asset.activation_date ?? "-"}
                                    </td>

                                    <td className="p-3">
                                        {asset.value ?? "-"}
                                    </td>

                                    <td className="p-3">
                                        {asset.invoice ?? "-"}
                                    </td>

                                    <td className="p-3">
                                        {asset.capex ?? "-"}
                                    </td>
                                </tr>
                            ))
                        )}

                    </tbody>
                </table>

            </div>

        </AppLayout>
    );
}