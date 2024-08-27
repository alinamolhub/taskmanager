<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\Permission;
use Illuminate\Database\Eloquent\Relations\Pivot;
/*class Role_has_permissions extends Pivot
{
    use HasFactory;
    protected $table = "role_has_permissions";


}*/

class Role extends Model
{
    use HasFactory;
    protected $table = "roles";
    public function permissions(): BelongsToMany
    {
        return $this->belongsToMany(Permission::class,"role_has_permissions");
    }

}

