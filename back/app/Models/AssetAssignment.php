<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AssetAssignment extends Model
{
    use HasFactory;

    protected $fillable = [
        'asset_id',
        'assigned_to',
        'site_id',
        'department_id',
        'computer_name',
        'fqdn',
        'notes',
        'start_date',
        'end_date',
    ];

    public function asset()
    {
        return $this->belongsTo(Asset::class);
    }

    public function site()
    {
        return $this->belongsTo(Site::class);
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}
