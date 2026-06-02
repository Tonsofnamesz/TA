<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $site_code
 * @property string $site_name
 * @property string|null $country
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Site newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Site newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Site query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Site whereCountry($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Site whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Site whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Site whereSiteCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Site whereSiteName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Site whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Site extends Model
{
    //
}
