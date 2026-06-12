<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Asset;
use Carbon\Carbon;
use App\Models\DeviceType;
use App\Models\Site;
use App\Models\Department;

class DashboardController extends Controller
{
    public function summary()
    {
        return response()->json([
            'total_assets' =>
            Asset::count(),

            'available_assets' =>
            Asset::where('status', 'available')->count(),

            'assigned_assets' =>
            Asset::where('status', 'assigned')->count(),

            'broken_assets' =>
            Asset::where('status', 'broken')->count(),

            'lost_assets' =>
            Asset::where('status', 'lost')->count(),

            'disposed_assets' =>
            Asset::where('status', 'disposed')->count(),
        ]);
    }

    public function warranty()
    {
        $today = Carbon::today();

        return response()->json([
            'expired' =>
            Asset::whereDate(
                'warranty_end',
                '<',
                $today
            )->count(),

            'expiring_30_days' =>
            Asset::whereBetween(
                'warranty_end',
                [$today, $today->copy()->addDays(30)]
            )->count(),

            'expiring_60_days' =>
            Asset::whereBetween(
                'warranty_end',
                [$today, $today->copy()->addDays(60)]
            )->count(),

            'expiring_90_days' =>
            Asset::whereBetween(
                'warranty_end',
                [$today, $today->copy()->addDays(90)]
            )->count(),
        ]);
    }

    public function deviceTypes()
    {
        return DeviceType::withCount('assets')
            ->get();
    }

    public function sites()
    {
        return Site::select(
            'id',
            'site_code',
            'site_name'
        )
            ->withCount('assignments')
            ->get();
    }

    public function expiringAssets()
    {
        return Asset::with([
            'currentAssignment'
        ])
            ->select(
                'id',
                'serial_number',
                'manufacturer',
                'model',
                'warranty_start',
                'warranty_end',
                'status'
            )
            ->whereBetween(
                'warranty_end',
                [
                    now(),
                    now()->addDays(90)
                ]
            )
            ->orderBy('warranty_end')
            ->get()
            ->map(function ($asset) {

                $deviceAge = null;

                if ($asset->warranty_start) {
                    $deviceAge =
                        Carbon::parse(
                            $asset->warranty_start
                        )->diffForHumans(
                            now(),
                            [
                                'parts' => 2,
                                'short' => true,
                                'syntax' => Carbon::DIFF_ABSOLUTE
                            ]
                        );
                }

                return [
                    'id' => $asset->id,
                    'serial_number' => $asset->serial_number,
                    'manufacturer' => $asset->manufacturer,
                    'model' => $asset->model,
                    'status' => $asset->status,
                    'warranty_start' => $asset->warranty_start,
                    'warranty_end' => $asset->warranty_end,

                    'assigned_to' =>
                    $asset->currentAssignment?->assigned_to,

                    'device_age' =>
                    $deviceAge,
                ];
            });
    }

    public function departments()
    {
        return Department::select(
            'id',
            'name'
        )
            ->withCount('assignments')
            ->get();
    }
}
