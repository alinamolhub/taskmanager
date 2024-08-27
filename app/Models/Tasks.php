<?php

namespace App\Models;
use App\Models\Projects;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\TaskUsers;
use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\TimerEntries;

use Illuminate\Database\Eloquent\Relations\HasOne;

class Tasks extends Model
{
    use HasFactory;
    public $timestamps = true;
    protected $fillable = [
        'description',
        'projects_id',
        'column',
        'creator_id',
        'order'
    ];
    protected $taskTypes = [
        0 => "To Do",
        1 => "In progress",
        2 => "Testing",
        3 => "Done"
    ];
    public function project(): BelongsTo
    {
        return $this->belongsTo(Projects::class);
    }
    public function user(): BelongsToMany
    {
        return $this->belongsToMany(User::class)->where("deleted_at",null)->using(TaskUsers::class)->withTimestamps();;
    }
    public function timerInfo():HasMany{
        return $this->hasMany(TimerEntries::class,"tasks_id","id");
    }
    public function getTimerStartDate(){

    }
    public function getTimerEndDate(){
        
    }

    public function getTotalSeconds(){
        
        return $this->timerInfo->reduce(function (?int $carry, TimerEntries $entry) {
            $end  = $entry->time_end?Carbon::createFromFormat('Y-m-d H:i:s', $entry->time_end):now();
            $start  = Carbon::createFromFormat('Y-m-d H:i:s', $entry->time_start);
            return $carry + $start->diffInSeconds($end);
        },0);

    }
    public function isTimerOn(){
        if($this->timerInfo->count() === 0)
            return false;
        return $this->timerInfo->keyBy("id")->last()->time_end === null;
    }
    public function timerOff(){
        $this->timerInfo->keyBy("id")->last()->update(["time_end" => now()]);
    }
    public function creator():BelongsTo{
        return $this->BelongsTo(User::class,"creator_id","id");
    }
    public function isUserAssigned($userid){
        return $this->user->count() > 0 && $this->user->get(0)->id === $userid;
    }
    public function assignTo($userid){
        if($this->isUserAssigned($userid))
            return;
        if( $this->user->count() > 0 )
        $this->user()->detach($this->user->get(0)->id);
        $this->user()->attach($userid);
    }

}
