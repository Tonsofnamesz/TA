<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class DepartmentController extends Controller
{
    /**
     * Display all departments.
     */
    public function index()
    {
        return response()->json(
            Department::orderBy('name')->get()
        );
    }

    /**
     * Store a new department.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:departments,name'],
        ]);

        $department = Department::create($validated);

        return response()->json($department, 201);
    }

    /**
     * Display a specific department.
     */
    public function show(Department $department)
    {
        return response()->json($department);
    }

    /**
     * Update an existing department.
     */
    public function update(Request $request, Department $department)
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('departments', 'name')->ignore($department->id),
            ],
        ]);

        $department->update($validated);

        return response()->json($department->fresh());
    }

    /**
     * Delete a department.
     */
    public function destroy(Department $department)
    {
        if ($department->assignments()->exists()) {
            return response()->json([
                'message' => 'This department cannot be deleted because it has existing assignments.',
            ], 422);
        }

        $department->delete();

        return response()->json([
            'message' => 'Department deleted successfully.',
        ]);
    }
}

