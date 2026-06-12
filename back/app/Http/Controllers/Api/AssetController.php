<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Asset;

class AssetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Asset::with([
            'deviceType',
            'supplier',
            'assignments'
        ])->get();
    }

    public function available()
    {
        return Asset::where(
            'status',
            'available'
        )
            ->with([
                'deviceType',
                'supplier'
            ])
            ->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'serial_number' => 'required|unique:assets',

            'device_type_id' => 'required|exists:device_types,id',

            'supplier_id' => 'nullable|exists:suppliers,id',

            'manufacturer' => 'nullable|string|max:255',

            'model' => 'nullable|string|max:255',

            'version' => 'nullable|string|max:255',

            'ram_gb' => 'nullable|numeric|min:0',

            'storage_gb' => 'nullable|integer|min:0',

            'invoice_number' => 'nullable|string|max:255',

            'purchase_price' => 'nullable|numeric|min:0',

            'capex_number' => 'nullable|string|max:255',

            'ship_date' => 'nullable|date',

            'warranty_start' => 'nullable|date',

            'warranty_end' => 'nullable|date',

            'country' => 'nullable|string|max:255',

            'status' => [
                'required',
                'in:available,assigned,broken,lost,disposed'
            ],
        ]);

        $asset = Asset::create($validated);

        return response()->json($asset, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Asset $asset)
    {
        return $asset->load([
            'deviceType',
            'supplier',
            'assignments'
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Asset $asset)
    {
        $validated = $request->validate([
            'serial_number' =>
            'required|unique:assets,serial_number,' . $asset->id,

            'device_type_id' => 'required|exists:device_types,id',

            'supplier_id' => 'nullable|exists:suppliers,id',

            'manufacturer' => 'nullable|string|max:255',

            'model' => 'nullable|string|max:255',

            'version' => 'nullable|string|max:255',

            'ram_gb' => 'nullable|numeric|min:0',

            'storage_gb' => 'nullable|integer|min:0',

            'invoice_number' => 'nullable|string|max:255',

            'purchase_price' => 'nullable|numeric|min:0',

            'capex_number' => 'nullable|string|max:255',

            'ship_date' => 'nullable|date',

            'warranty_start' => 'nullable|date',

            'warranty_end' => 'nullable|date',

            'country' => 'nullable|string|max:255',

            'status' => [
                'required',
                'in:available,assigned,broken,lost,disposed'
            ],
        ]);

        $asset->update($validated);

        return response()->json($asset);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Asset $asset)
    {
        $asset->delete();

        return response()->json([
            'message' => 'Asset deleted successfully'
        ]);
    }
}
