<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Site extends Model
{
    use HasFactory;

    protected $fillable = [
        'site_code',
        'site_name',
        'country'
    ];

    public function assignments()
    {
        return $this->hasMany(AssetAssignment::class);
    }
}
