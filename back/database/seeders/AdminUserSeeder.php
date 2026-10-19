<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use RuntimeException;
use Spatie\Permission\Models\Role;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $name = config('initial-admin.name');
        $email = strtolower(trim(
            (string) config('initial-admin.email')
        ));
        $password = config('initial-admin.password');

        if (
            ! is_string($name) || trim($name) === '' ||
            ! filter_var($email, FILTER_VALIDATE_EMAIL) ||
            ! is_string($password) || strlen($password) < 12
        ) {
            throw new RuntimeException(
                'Initial admin configuration is missing or invalid. '
                . 'Provide a name, valid email, and password of at least 12 characters.'
            );
        }

        Role::firstOrCreate(['name' => 'admin']);
        Role::firstOrCreate(['name' => 'viewer']);

        // Never create another initial admin if one already exists.
        if (User::role('admin')->exists()) {
            $this->command->info(
                'An admin account already exists. No account created.'
            );

            return;
        }

        // Do not accidentally promote an existing non-admin account.
        if (User::where('email', $email)->exists()) {
            throw new RuntimeException(
                'The configured initial admin email already belongs '
                . 'to another account. Choose a different email.'
            );
        }

        $user = User::create([
            'name' => trim($name),
            'email' => $email,
            'password' => Hash::make($password),
        ]);

        $user->assignRole('admin');

        $this->command->info(
            'Initial admin account created successfully.'
        );
    }
}

