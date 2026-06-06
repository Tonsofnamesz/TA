import AppLayout from "../../components/layout/AppLayout";
import { useEffect, useState } from "react";

import {
    getSummary,
    getWarranty,
    getExpiringAssets,
} from "../../api/dashboard";

import type {
    DashboardSummary,
    WarrantySummary,
    ExpiringAsset,
} from "../../types/dashboard";

export default function Dashboard() {
    console.log("LOGIN PAGE RENDERED");
    const [summary, setSummary] =
        useState<DashboardSummary | null>(null);

    const [warranty, setWarranty] =
        useState<WarrantySummary | null>(null);

    const [expiringAssets, setExpiringAssets] =
        useState<ExpiringAsset[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const [
                    summaryData,
                    warrantyData,
                    expiringData,
                ] = await Promise.all([
                    getSummary(),
                    getWarranty(),
                    getExpiringAssets(),
                ]);

                setSummary(summaryData);
                setWarranty(warrantyData);
                setExpiringAssets(expiringData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, []);

    if (loading) {
        return (
            <AppLayout>
                <div className="text-center py-20 text-gray-500">
                    Loading dashboard...
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">
                    Dashboard
                </h1>

                <p className="text-gray-500 mt-2">
                    Asset Inventory Management Overview
                </p>
            </div>

            {/* Asset Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5 mb-8">
                <div className="bg-white rounded-xl shadow-sm p-5 border">
                    <p className="text-gray-500 text-sm">
                        Total Assets
                    </p>

                    <h2 className="text-3xl font-bold mt-2 text-slate-800">
                        {summary?.total_assets ?? 0}
                    </h2>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-5 border">
                    <p className="text-gray-500 text-sm">
                        Assigned
                    </p>

                    <h2 className="text-3xl font-bold mt-2 text-blue-600">
                        {summary?.assigned_assets ?? 0}
                    </h2>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-5 border">
                    <p className="text-gray-500 text-sm">
                        Available
                    </p>

                    <h2 className="text-3xl font-bold mt-2 text-green-600">
                        {summary?.available_assets ?? 0}
                    </h2>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-5 border">
                    <p className="text-gray-500 text-sm">
                        Broken
                    </p>

                    <h2 className="text-3xl font-bold mt-2 text-orange-600">
                        {summary?.broken_assets ?? 0}
                    </h2>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-5 border">
                    <p className="text-gray-500 text-sm">
                        Lost
                    </p>

                    <h2 className="text-3xl font-bold mt-2 text-red-600">
                        {summary?.lost_assets ?? 0}
                    </h2>
                </div>
            </div>

            {/* Warranty Section */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                    Warranty Monitoring
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                    <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                        <p className="text-red-600 text-sm">
                            Expired
                        </p>

                        <h3 className="text-3xl font-bold text-red-700 mt-2">
                            {warranty?.expired ?? 0}
                        </h3>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
                        <p className="text-yellow-700 text-sm">
                            Within 30 Days
                        </p>

                        <h3 className="text-3xl font-bold text-yellow-800 mt-2">
                            {warranty?.expiring_30_days ?? 0}
                        </h3>
                    </div>

                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
                        <p className="text-orange-700 text-sm">
                            Within 60 Days
                        </p>

                        <h3 className="text-3xl font-bold text-orange-800 mt-2">
                            {warranty?.expiring_60_days ?? 0}
                        </h3>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                        <p className="text-blue-700 text-sm">
                            Within 90 Days
                        </p>

                        <h3 className="text-3xl font-bold text-blue-800 mt-2">
                            {warranty?.expiring_90_days ?? 0}
                        </h3>
                    </div>
                </div>
            </div>

            {/* Expiring Assets Table */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="p-5 border-b">
                    <h2 className="text-xl font-semibold text-slate-800">
                        Assets Expiring Within 90 Days
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Devices that require attention soon
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="text-left px-4 py-3 font-semibold text-slate-700">
                                    Serial Number
                                </th>

                                <th className="text-left px-4 py-3 font-semibold text-slate-700">
                                    Manufacturer
                                </th>

                                <th className="text-left px-4 py-3 font-semibold text-slate-700">
                                    Model
                                </th>

                                <th className="text-left px-4 py-3 font-semibold text-slate-700">
                                    Warranty End
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {expiringAssets.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="text-center py-8 text-gray-500"
                                    >
                                        No assets approaching warranty expiration.
                                    </td>
                                </tr>
                            ) : (
                                expiringAssets.map(
                                    (asset) => (
                                        <tr
                                            key={asset.id}
                                            className="border-t hover:bg-slate-50"
                                        >
                                            <td className="px-4 py-3">
                                                {
                                                    asset.serial_number
                                                }
                                            </td>

                                            <td className="px-4 py-3">
                                                {
                                                    asset.manufacturer
                                                }
                                            </td>

                                            <td className="px-4 py-3">
                                                {asset.model}
                                            </td>

                                            <td className="px-4 py-3 text-red-600 font-medium">
                                                {
                                                    asset.warranty_end
                                                }
                                            </td>
                                        </tr>
                                    )
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}