import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import AppLayout from "../../components/layout/AppLayout";

import {
    getWarrantyReport,
    getAssetReport,
} from "../../api/reports";

export default function ReportsPage() {

    const [showComputerList, setShowComputerList] =
        useState(false);

    const [showFixedAssets, setShowFixedAssets] =
        useState(false);

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

    const exportComputerList = () => {

        const exportData =
            warrantyReport.map(
                (asset) => ({
                    "Serial Number":
                        asset.serial_number,

                    "Computer Name":
                        asset.computer_name,

                    Manufacturer:
                        asset.manufacturer,

                    Model:
                        asset.model,

                    "Latest User":
                        asset.latest_user,

                    "Device Age":
                        asset.device_age,

                    "Warranty Start":
                        asset.warranty_start,

                    "Warranty End":
                        asset.warranty_end,
                })
            );

        const worksheet =
            XLSX.utils.json_to_sheet(
                exportData
            );

        const workbook =
            XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Computer List"
        );

        XLSX.writeFile(
            workbook,
            "Computer_List.xlsx"
        );
    };

    const exportFixedAssets = () => {

        const exportData =
            assetReport.map(
                (asset) => ({
                    "Serial Number":
                        asset.serial_number,

                    "Computer Name":
                        asset.computer_name,

                    Manufacturer:
                        asset.manufacturer,

                    Model:
                        asset.model,

                    "Latest User":
                        asset.latest_user,

                    "Activation Date":
                        asset.activation_date,

                    Value:
                        asset.value,

                    Invoice:
                        asset.invoice,

                    CAPEX:
                        asset.capex,
                })
            );

        const worksheet =
            XLSX.utils.json_to_sheet(
                exportData
            );

        const workbook =
            XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Fixed Assets"
        );

        XLSX.writeFile(
            workbook,
            "Fixed_Assets_Activation.xlsx"
        );
    };

    return (
        <AppLayout>

            <h1 className="text-2xl font-bold mb-6">
                Reports
            </h1>

            {/* Warranty Report */}
            <div className="bg-white rounded shadow mb-8 overflow-x-auto">

                <div className="p-4 border-b flex justify-between items-center">
                    <button
                        onClick={exportComputerList}
                        className="
            bg-green-600
            text-white
            px-4
            py-2
            rounded
            hover:bg-green-700
            ml-2
            "
                    >
                        Export Excel
                    </button>
                    <h2 className="text-lg font-semibold">
                        Computer List
                    </h2>

                    <button
                        onClick={() =>
                            setShowComputerList(
                                !showComputerList
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
                        {showComputerList
                            ? "Hide Table"
                            : "Show Table"}
                    </button>

                </div>


                {showComputerList && (
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 text-left">
                                    Serial Number
                                </th>

                                <th className="p-3 text-left">
                                    Computer Name
                                </th>

                                <th className="p-3 text-left">
                                    Manufacturer
                                </th>

                                <th className="p-3 text-left">
                                    Model
                                </th>

                                <th className="p-3 text-left">
                                    Latest User
                                </th>

                                <th className="p-3 text-left">
                                    Device Age
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
                                            {asset.computer_name ?? "-"}
                                        </td>

                                        <td className="p-3">
                                            {asset.manufacturer ?? "-"}
                                        </td>

                                        <td className="p-3">
                                            {asset.model ?? "-"}
                                        </td>

                                        <td className="p-3">
                                            {asset.latest_user ?? "-"}
                                        </td>

                                        <td className="p-3">
                                            {asset.device_age
                                                ? `${asset.device_age} years`
                                                : "-"}
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
                )}
            </div>

            {/* Asset Report */}
            <div className="bg-white rounded shadow overflow-x-auto">

                <div className="p-4 border-b flex justify-between items-center">
                    <button
                        onClick={exportFixedAssets}
                        className="
            bg-green-600
            text-white
            px-4
            py-2
            rounded
            hover:bg-green-700
            ml-2
            "
                    >
                        Export Excel
                    </button>
                    <h2 className="text-lg font-semibold">
                        Fixed Assets Activation
                    </h2>

                    <button
                        onClick={() =>
                            setShowFixedAssets(
                                !showFixedAssets
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
                        {showFixedAssets
                            ? "Hide Table"
                            : "Show Table"}
                    </button>

                </div>

                {showFixedAssets && (
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

                                <th className="p-3 text-left">
                                    Computer Name
                                </th>

                                <th className="p-3 text-left">
                                    Manufacturer
                                </th>

                                <th className="p-3 text-left">
                                    Model
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

                                        <td className="p-3">
                                            {asset.computer_name ?? "-"}
                                        </td>

                                        <td className="p-3">
                                            {asset.manufacturer ?? "-"}
                                        </td>

                                        <td className="p-3">
                                            {asset.model ?? "-"}
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