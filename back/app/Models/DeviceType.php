<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class DeviceType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    public function assets()
    {
        return $this->hasMany(Asset::class);
    }
}
