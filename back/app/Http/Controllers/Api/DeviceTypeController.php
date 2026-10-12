<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DeviceType;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class DeviceTypeController extends Controller
{
    /**
     * Display all device types.
     */
    public function index()
    {
        return response()->json(
            DeviceType::orderBy('name')->get()
        );
    }

    /**
     * Store a new device type.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                'unique:device_types,name',
            ],
        ]);

        $deviceType = DeviceType::create($validated);

        return response()->json($deviceType, 201);
    }

    /**
     * Display a specific device type.
     */
    public function show(DeviceType $deviceType)
    {
        return response()->json($deviceType);
    }

    /**
     * Update an existing device type.
     */
    public function update(Request $request, DeviceType $deviceType)
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('device_types', 'name')
                    ->ignore($deviceType->id),
            ],
        ]);

        $deviceType->update($validated);

        return response()->json($deviceType->fresh());
    }

    /**
     * Delete a device type.
     */
    public function destroy(DeviceType $deviceType)
    {
        if ($deviceType->assets()->exists()) {
            return response()->json([
                'message' => 'This device type cannot be deleted because assets are using it.',
            ], 422);
        }

        $deviceType->delete();

        return response()->json([
            'message' => 'Device type deleted successfully.',
        ]);
    }
}

