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

use Illuminate\Database\Eloquent\Relations\HasOne;

class TimerEntries extends Model
{
    use HasFactory;
    public $table = "timer_entries";
    protected $fillable = [
        'user_id',
        'task_id',
        'time_start',
        'time_end'
    ];


}
