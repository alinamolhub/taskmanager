<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\Pivot;

class TaskUsers extends Pivot
{
    use HasFactory,SoftDeletes;
    protected $table = "tasks_user";
    protected $fillable = [
        'user_id',
        'tasks_id',
        'timer_start',
        'timer_end',
        'timer_on'
    ];
    public $timestamps = true;
}
