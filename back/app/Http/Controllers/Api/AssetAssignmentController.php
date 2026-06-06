<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AssetAssignment;
use App\Models\Asset;

class AssetAssignmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return AssetAssignment::with([
            'asset',
            'site',
            'department'
        ])
            ->latest()
            ->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'asset_id' => 'required|exists:assets,id',
            'assigned_to' => 'nullable|string|max:255',
            'site_id' => 'nullable|exists:sites,id',
            'department_id' => 'nullable|exists:departments,id',
            'computer_name' => 'nullable|string|max:255',
            'fqdn' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
        ]);

        $existingAssignment = AssetAssignment::where(
            'asset_id',
            $validated['asset_id']
        )
            ->whereNull('end_date')
            ->exists();

        if ($existingAssignment) {
            return response()->json([
                'message' => 'Asset is already assigned.'
            ], 422);
        }

        $assignment = AssetAssignment::create($validated);

        Asset::find($validated['asset_id'])
            ?->update([
                'status' => 'assigned'
            ]);

        return response()->json(
            $assignment->load([
                'asset',
                'site',
                'department'
            ]),
            201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(AssetAssignment $assetAssignment)
    {
        return $assetAssignment->load([
            'asset',
            'site',
            'department'
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        Request $request,
        AssetAssignment $assetAssignment
    ) {
        $validated = $request->validate([
            'asset_id' => 'required|exists:assets,id',
            'assigned_to' => 'nullable|string|max:255',
            'site_id' => 'nullable|exists:sites,id',
            'department_id' => 'nullable|exists:departments,id',
            'computer_name' => 'nullable|string|max:255',
            'fqdn' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
        ]);

        $assetAssignment->update($validated);

        return response()->json(
            $assetAssignment->load([
                'asset',
                'site',
                'department'
            ])
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(
        AssetAssignment $assetAssignment
    ) {
        $assetAssignment->asset?->update([
            'status' => 'available'
        ]);

        $assetAssignment->delete();

        return response()->json([
            'message' =>
            'Assignment deleted successfully'
        ]);
    }

    public function returnAsset(
        AssetAssignment $assetAssignment
    ) {
        $assetAssignment->update([
            'end_date' => now()
        ]);

        $assetAssignment->asset?->update([
            'status' => 'available'
        ]);

        return response()->json([
            'message' => 'Asset returned'
        ]);
    }
}
