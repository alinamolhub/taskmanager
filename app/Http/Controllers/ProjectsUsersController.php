<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Projects;
use App\Models\User;
use App\Http\Resources\ProjectResource;
class ProjectsUsersController extends Controller
{
    public function store(Request $request,Projects $project){
        if($request->has("user")){
            $project->users()->attach([$request->input("user")]);
        }
        return ProjectResource::collection([$project->load("users")]); ;
            
    }
    public function destroy(Request $request,Projects $project,User $user){
        $project->users()->detach([$user->id]);
    }
}
