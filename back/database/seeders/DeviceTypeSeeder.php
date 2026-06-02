<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\DeviceType;

class DeviceTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DeviceType::insert([
            ['name' => 'Laptop'],
            ['name' => 'Desktop'],
            ['name' => 'Switch'],
        ]);
    }
}
