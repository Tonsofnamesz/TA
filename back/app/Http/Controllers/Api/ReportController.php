<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Asset;

class ReportController extends Controller
{
    /**
     * Report Table 1
     * Serial Number
     * Warranty Start
     * Warranty End
     * Latest User
     */
    public function warrantyReport()
    {
        return Asset::with([
            'latestAssignment'
        ])
            ->select(
                'id',
                'serial_number',
                'warranty_start',
                'warranty_end'
            )
            ->get()
            ->sortByDesc(function ($asset) {
                return $asset->latestAssignment?->created_at;
            })
            ->values()
            ->map(function ($asset) {

                return [
                    'serial_number' => $asset->serial_number,

                    'warranty_start' => $asset->warranty_start,

                    'warranty_end' => $asset->warranty_end,

                    'latest_user' =>
                    $asset->latestAssignment?->assigned_to
                        ?? '-',
                ];
            });
    }

    /**
     * Report Table 2
     * Serial Number
     * Activation Date
     * Value
     * Invoice
     * CAPEX
     * Latest User
     */
    public function assetReport()
    {
        return Asset::with([
            'latestAssignment'
        ])
            ->select(
                'id',
                'serial_number',
                'ship_date',
                'purchase_price',
                'invoice_number',
                'capex_number'
            )
            ->get()
            ->sortByDesc(function ($asset) {
                return $asset->latestAssignment?->created_at;
            })
            ->values()
            ->map(function ($asset) {

                return [
                    'serial_number' =>
                    $asset->serial_number,

                    'activation_date' =>
                    $asset->ship_date,

                    'value' =>
                    $asset->purchase_price,

                    'invoice' =>
                    $asset->invoice_number,

                    'capex' =>
                    $asset->capex_number,

                    'latest_user' =>
                    $asset->latestAssignment?->assigned_to
                        ?? '-',
                ];
            });
    }
}
