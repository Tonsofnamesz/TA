<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('roles:id,name')
            ->orderBy('name')
            ->get(['id', 'name', 'email', 'created_at']);

        return response()->json($users);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'role' => ['required', Rule::in(['admin', 'viewer'])],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => strtolower($validated['email']),
            'password' => $validated['password'],
        ]);

        $user->assignRole($validated['role']);

        return response()->json([
            'message' => 'User created successfully.',
            'user' => $user->load('roles:id,name'),
        ], 201);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'email' => [
                'sometimes',
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($user->id),
            ],
            'password' => ['sometimes', 'nullable', 'string', 'min:8', 'confirmed'],
            'role' => ['sometimes', 'required', Rule::in(['admin', 'viewer'])],
        ]);

        // Prevent removing the current user's own admin access.
        if (
            $request->user()->id === $user->id
            && isset($validated['role'])
            && $validated['role'] !== 'admin'
        ) {
            return response()->json([
                'message' => 'You cannot remove your own admin role.',
            ], 422);
        }

        // Never allow the last Admin to lose their role.
        if (
            isset($validated['role'])
            && $validated['role'] !== 'admin'
            && $user->hasRole('admin')
            && User::role('admin')->count() <= 1
        ) {
            return response()->json([
                'message' => 'The last Admin cannot be demoted.',
            ], 422);
        }

        if (isset($validated['name'])) {
            $user->name = $validated['name'];
        }

        if (isset($validated['email'])) {
            $user->email = strtolower($validated['email']);
        }

        if (! empty($validated['password'])) {
            $user->password = $validated['password'];
        }

        $user->save();

        if (isset($validated['role'])) {
            $user->syncRoles([$validated['role']]);
        }

        return response()->json([
            'message' => 'User updated successfully.',
            'user' => $user->load('roles:id,name'),
        ]);
    }

    public function destroy(Request $request, User $user)
    {
        if ($request->user()->id === $user->id) {
            return response()->json([
                'message' => 'You cannot delete your own account.',
            ], 422);
        }

        if (
            $user->hasRole('admin')
            && User::role('admin')->count() <= 1
        ) {
            return response()->json([
                'message' => 'The last Admin account cannot be deleted.',
            ], 422);
        }

        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully.',
        ]);
    }
}
