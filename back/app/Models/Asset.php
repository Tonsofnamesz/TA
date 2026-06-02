<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $serial_number
 * @property int $device_type_id
 * @property int|null $supplier_id
 * @property string|null $manufacturer
 * @property string|null $model
 * @property string|null $version
 * @property numeric|null $ram_gb
 * @property int|null $storage_gb
 * @property string|null $invoice_number
 * @property numeric|null $purchase_price
 * @property string|null $capex_number
 * @property string|null $ship_date
 * @property string|null $warranty_start
 * @property string|null $warranty_end
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Asset newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Asset newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Asset query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Asset whereCapexNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Asset whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Asset whereDeviceTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Asset whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Asset whereInvoiceNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Asset whereManufacturer($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Asset whereModel($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Asset wherePurchasePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Asset whereRamGb($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Asset whereSerialNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Asset whereShipDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Asset whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Asset whereStorageGb($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Asset whereSupplierId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Asset whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Asset whereVersion($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Asset whereWarrantyEnd($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Asset whereWarrantyStart($value)
 * @mixin \Eloquent
 */
class Asset extends Model
{
    //
}
