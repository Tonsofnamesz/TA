import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AppLayout from "../../components/layout/AppLayout";

import AssetForm from "./AssetForm";

import { createAsset } from "../../api/assets";

export default function AssetCreate() {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    data: any
  ) => {
    try {
      setLoading(true);

      await createAsset(data);

      navigate("/assets");
    } catch (error) {
      console.error(error);

      alert("Failed to create asset");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          Create Asset
        </h1>

        <AssetForm
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </AppLayout>
  );
}