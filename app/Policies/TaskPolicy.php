<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Tasks;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;



class TaskPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
    }
    public function create(?User $user,): bool
    {

        return $user->role->permissions->keyBy("name")->has("create task");


    }
    public function update(?User $user, Tasks $task): bool
    {


        return $user->isAdmin() ||
        $user->role === "ProjectManager" && $task->project->isTeamMember($user) ||
        $task->isUserAssigned($user->id) || $task->creator->id == $user->id;
    }
}
