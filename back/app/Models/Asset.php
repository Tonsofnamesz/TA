<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Asset extends Model
{
    use HasFactory;

    protected $fillable = [
        'serial_number',
        'device_type_id',
        'supplier_id',
        'manufacturer',
        'model',
        'version',
        'ram_gb',
        'storage_gb',
        'invoice_number',
        'purchase_price',
        'capex_number',
        'ship_date',
        'warranty_start',
        'warranty_end',
        'country',
        'status',
    ];

    protected $appends = [
        'warranty_status',
    ];

    public function deviceType()
    {
        return $this->belongsTo(DeviceType::class);
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function assignments()
    {
        return $this->hasMany(AssetAssignment::class);
    }

    public function getWarrantyStatusAttribute()
    {
        if (empty($this->warranty_end)) {
            return null;
        }

        $end = \Carbon\Carbon::parse($this->warranty_end);
        $days = now()->diffInDays($end, false);

        return match (true) {
            $days < 0 => 'expired',
            $days <= 90 => 'expiring',
            default => 'active',
        };
    }
    public function currentAssignment()
    {
        return $this->hasOne(AssetAssignment::class)
            ->whereNull('end_date');
    }
}
