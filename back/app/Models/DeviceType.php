<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DeviceType newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DeviceType newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DeviceType query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DeviceType whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DeviceType whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DeviceType whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DeviceType whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class DeviceType extends Model
{
    //
}
