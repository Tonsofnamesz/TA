import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AppLayout from "../../components/layout/AppLayout";

import AssetForm from "./AssetForm";

import {
    getAsset,
    updateAsset,
} from "../../api/assets";

export default function AssetEdit() {
    const { id } = useParams();

    const navigate = useNavigate();

    const [asset, setAsset] =
        useState<any>(null);

    useEffect(() => {
        const loadAsset = async () => {
            const data = await getAsset(Number(id));

            console.log(data);

            setAsset(data);
        };

        loadAsset();
    }, [id]);

    const handleSubmit = async (
        formData: any
    ) => {
        try {
            await updateAsset(
                Number(id),
                formData
            );

            navigate("/assets");
        } catch (error) {
            console.error(error);

            alert("Failed to update asset");
        }
    };

    return (
        <AppLayout>
            <h1 className="text-2xl font-bold mb-6">
                Edit Asset
            </h1>

            <AssetForm
                initialData={asset}
                onSubmit={handleSubmit}
            />
        </AppLayout>
    );
}