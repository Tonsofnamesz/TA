<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Site;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SiteController extends Controller
{
    /**
     * Display all sites.
     */
    public function index()
    {
        return response()->json(
            Site::orderBy('site_name')->get()
        );
    }

    /**
     * Store a newly created site.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'site_code' => [
                'required',
                'string',
                'max:255',
                'unique:sites,site_code',
            ],
            'site_name' => [
                'required',
                'string',
                'max:255',
            ],
            'country' => [
                'nullable',
                'string',
                'max:255',
            ],
        ]);

        $site = Site::create($validated);

        return response()->json($site, 201);
    }

    /**
     * Display a specific site.
     */
    public function show(string $id)
    {
        return response()->json(
            Site::findOrFail($id)
        );
    }

    /**
     * Update an existing site.
     */
    public function update(Request $request, string $id)
    {
        $site = Site::findOrFail($id);

        $validated = $request->validate([
            'site_code' => [
                'required',
                'string',
                'max:255',
                Rule::unique('sites', 'site_code')
                    ->ignore($site->id),
            ],
            'site_name' => [
                'required',
                'string',
                'max:255',
            ],
            'country' => [
                'nullable',
                'string',
                'max:255',
            ],
        ]);

        $site->update($validated);

        return response()->json($site->fresh());
    }

    /**
     * Delete a site.
     */
    public function destroy(string $id)
    {
        $site = Site::findOrFail($id);

        // Prevent deletion if assignments reference this site.
        if ($site->assignments()->exists()) {
            return response()->json([
                'message' =>
                    'This site cannot be deleted because it has existing assignments.',
            ], 422);
        }

        $site->delete();

        return response()->json([
            'message' => 'Site deleted successfully.',
        ]);
    }
}

