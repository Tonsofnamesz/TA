<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Site;

class SiteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Site::insert([
    [
        'site_code' => 'JKT',
        'site_name' => 'Jakarta Office',
        'country' => 'Indonesia'
    ],
    [
        'site_code' => 'SBY',
        'site_name' => 'Surabaya Office',
        'country' => 'Indonesia'
    ]
]);
    }
}
