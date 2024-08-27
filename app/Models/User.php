<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use App\Models\Projects;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\Permission\Traits\HasRoles;
use App\Models\Role;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\ProjectsUsers;
use App\Models\Permission;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\Pivot;
use App\Models\TaskUsers;
define("AdminRole","Admin");
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    public $timestamps = true;




    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function projects(): BelongsToMany
    {
        return $this->belongsToMany(Projects::class)->using(ProjectsUsers::class);
    }
    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }
    public function hasRole($role)
    {
        return $this->role->name === $role;
    }
    public function tasks():HasMany
    {
        return $this->hasMany(TaskUsers::class,"user_id","id")->where("deleted_at",null);
    }
    public function isAdmin(){
        return $this->role->name === AdminRole;
    }
}
class Role_has_permissions extends Pivot
{
    use HasFactory;
    protected $table = "role_has_permissions";


}