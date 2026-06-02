<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $asset_id
 * @property int $user_id
 * @property int|null $site_id
 * @property int|null $department_id
 * @property string|null $computer_name
 * @property string|null $fqdn
 * @property string|null $notes
 * @property string $start_date
 * @property string|null $end_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AssetAssignment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AssetAssignment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AssetAssignment query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AssetAssignment whereAssetId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AssetAssignment whereComputerName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AssetAssignment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AssetAssignment whereDepartmentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AssetAssignment whereEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AssetAssignment whereFqdn($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AssetAssignment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AssetAssignment whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AssetAssignment whereSiteId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AssetAssignment whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AssetAssignment whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AssetAssignment whereUserId($value)
 * @mixin \Eloquent
 */
class AssetAssignment extends Model
{
    //
}
