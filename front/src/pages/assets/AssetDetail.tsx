import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppLayout from "../../components/layout/AppLayout";
import api from "../../api/axios";

type Asset = {
  id: number;
  serial_number: string;
  manufacturer: string;
  model: string;
  version: string | null;

  ram_gb: number | null;
  storage_gb: number | null;

  invoice_number: string | null;
  purchase_price: number | null;
  capex_number: string | null;

  ship_date: string | null;
  warranty_start: string | null;
  warranty_end: string | null;

  status: string;
  warranty_status: "active" | "expiring" | "expired" | null;

  device_type?: {
    id: number;
    name: string;
  };

  supplier?: {
    id: number;
    supplier_name: string;
  };

  assignments?: any[];
};

export default function AssetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [asset, setAsset] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const res = await api.get(`/assets/${id}`);
        setAsset(res.data.data ?? res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAsset();
  }, [id]);

  if (loading) {
    return (
      <AppLayout>
        <p className="text-gray-500">Loading asset...</p>
      </AppLayout>
    );
  }

  if (!asset) {
    return (
      <AppLayout>
        <p className="text-red-500">Asset not found</p>
      </AppLayout>
    );
  }

  const warrantyColor =
    asset.warranty_status === "expired"
      ? "bg-red-100 text-red-700"
      : asset.warranty_status === "expiring"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";

  return (
    <AppLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            Asset Detail
          </h1>
          <p className="text-gray-500">
            Serial: {asset.serial_number}
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Back
        </button>
      </div>

      {/* Top Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500 text-sm">Status</p>
          <p className="font-semibold">{asset.status}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500 text-sm">Device Type</p>
          <p className="font-semibold">
            {asset.device_type?.name ?? "-"}
          </p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500 text-sm">Warranty</p>
          <span className={`px-2 py-1 rounded text-sm ${warrantyColor}`}>
            {asset.warranty_status ?? "N/A"}
          </span>
        </div>
      </div>

      {/* Main Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hardware Info */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-3">
            Hardware Information
          </h2>

          <div className="space-y-2 text-sm">
            <p>
              <span className="text-gray-500">Manufacturer:</span>{" "}
              {asset.manufacturer ?? "-"}
            </p>
            <p>
              <span className="text-gray-500">Model:</span>{" "}
              {asset.model ?? "-"}
            </p>
            <p>
              <span className="text-gray-500">Version:</span>{" "}
              {asset.version ?? "-"}
            </p>
            <p>
              <span className="text-gray-500">RAM:</span>{" "}
              {asset.ram_gb ?? "-"} GB
            </p>
            <p>
              <span className="text-gray-500">Storage:</span>{" "}
              {asset.storage_gb ?? "-"} GB
            </p>
          </div>
        </div>

        {/* Procurement Info */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-3">
            Procurement Information
          </h2>

          <div className="space-y-2 text-sm">
            <p>
              <span className="text-gray-500">Invoice:</span>{" "}
              {asset.invoice_number ?? "-"}
            </p>
            <p>
              <span className="text-gray-500">CAPEX:</span>{" "}
              {asset.capex_number ?? "-"}
            </p>
            <p>
              <span className="text-gray-500">Price:</span>{" "}
              {asset.purchase_price ?? "-"}
            </p>
          </div>
        </div>

        {/* Warranty Info */}
        <div className="bg-white p-4 rounded shadow md:col-span-2">
          <h2 className="font-semibold mb-3">
            Warranty Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 text-sm gap-2">
            <p>
              <span className="text-gray-500">Start:</span>{" "}
              {asset.warranty_start ?? "-"}
            </p>
            <p>
              <span className="text-gray-500">End:</span>{" "}
              {asset.warranty_end ?? "-"}
            </p>
          </div>
        </div>

        {/* Assignments */}
        <div className="bg-white p-4 rounded shadow md:col-span-2">
          <h2 className="font-semibold mb-3">
            Assignments
          </h2>

          {asset.assignments?.length ? (
            <ul className="text-sm space-y-2">
              {asset.assignments.map((a: any) => (
                <li key={a.id} className="border-b pb-2">
                  <p>
                    <span className="text-gray-500">Computer:</span>{" "}
                    {a.computer_name ?? "-"}
                  </p>
                  <p>
                    <span className="text-gray-500">Site:</span>{" "}
                    {a.site_id ?? "-"}
                  </p>
                  <p>
                    <span className="text-gray-500">Start:</span>{" "}
                    {a.start_date}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">
              No assignments found
            </p>
          )}
        </div>
      </div>
    </AppLayout>
  );
}