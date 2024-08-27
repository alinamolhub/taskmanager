<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Tasks;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\ProjectsUsers;
use Illuminate\Database\Eloquent\SoftDeletes;
class Projects extends Model
{
    use HasFactory,SoftDeletes;
    public $timestamps = true;
    protected $fillable = ['name','user_id'];
    public function tasks(): HasMany
    {
        return $this->hasMany(Tasks::class);
    }
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class)->where("deleted_at",null)->using(ProjectsUsers::class)->withTimestamps();
    }
    protected static function booted () {
        static::deleting(function(Projects $project) { // before delete() method call this
             $project->tasks()->delete();
             $project->users()->detach();
        });
    }
    public function isTeamMember(User $user){

        return $this->users->keyBy('id')->has($user->id);
    }

}
