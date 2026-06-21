<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Asset;

class ReportController extends Controller
{

    public function warrantyReport()
    {
        return Asset::with([
            'latestAssignment',
            'deviceType'
        ])
            ->select(
                'id',
                'serial_number',
                'manufacturer',
                'model',
                'ship_date',
                'warranty_start',
                'warranty_end',
                'device_type_id',
                'status'
            )

            ->get()
            ->sortByDesc(function ($asset) {
                return $asset->latestAssignment?->created_at;
            })
            ->values()
            ->map(function ($asset) {

                return [
                    'id' => $asset->id,

                    'serial_number' => $asset->serial_number,

                    'computer_name' =>
                    $asset->latestAssignment?->computer_name ?? '-',

                    'manufacturer' =>
                    $asset->manufacturer,

                    'model' =>
                    $asset->model,

                    'warranty_start' =>
                    $asset->warranty_start,

                    'warranty_end' =>
                    $asset->warranty_end,

                    'latest_user' =>
                    $asset->latestAssignment?->assigned_to ?? '-',

                    'device_type' =>
                    $asset->deviceType?->name ?? '-',

                    'status' => $asset->status,

                    'device_age' =>
                    $asset->ship_date
                        ? round(
                            \Carbon\Carbon::parse($asset->ship_date)
                                ->floatDiffInYears(now()),
                            1
                        )
                        : null,
                ];
            });
    }

    public function assetReport()
    {
        return Asset::with([
            'latestAssignment',
            'firstAssignment',
            'deviceType'
        ])
            ->select(
                'id',
                'serial_number',
                'manufacturer',
                'model',
                'ship_date',
                'purchase_price',
                'invoice_number',
                'capex_number',
                'device_type_id'
            )
            ->get()
            ->sortByDesc(function ($asset) {
                return $asset->latestAssignment?->created_at;
            })
            ->values()
            ->map(function ($asset) {

                return [
                    'id' => $asset->id,

                    'serial_number' =>
                    $asset->serial_number,

                    'computer_name' =>
                    $asset->latestAssignment?->computer_name ?? '-',

                    'manufacturer' =>
                    $asset->manufacturer,

                    'model' =>
                    $asset->model,

                    'activation_date' =>
                    $asset->firstAssignment?->start_date,

                    'activation_status' =>
                    $asset->firstAssignment
                        ? 'Activated'
                        : 'Not Activated',

                    'value' =>
                    $asset->purchase_price,

                    'invoice' =>
                    $asset->invoice_number,

                    'capex' =>
                    $asset->capex_number,

                    'device_type' =>
                    $asset->deviceType?->name ?? '-',

                    'latest_user' =>
                    $asset->latestAssignment?->assigned_to ?? '-',
                ];
            });
    }
}
