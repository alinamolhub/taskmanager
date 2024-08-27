<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\Pivot;

class ProjectsUsers extends Pivot
{
    use HasFactory,SoftDeletes;
    protected $table = "projects_user";
    protected $fillable = [
        'user_id',
        'projects_id'
    ];
    public $timestamps = true;
}
