<?php

namespace App\Http\Controllers;
use App\Models\Projects;
use App\Http\Resources\ProjectResource;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class ProjectsController extends Controller
{
    public function index()
    {   
        if(auth()->user()->isAdmin())
        return ProjectResource::collection(
            Projects::with("users")->withCount("tasks")->get()
        );
        else
        return ProjectResource::collection(
            auth()->user()->projects()->with("users")->withCount("tasks")->get()
        ); 
    }
    public function show(Request $request,Projects $project){
        return new ProjectResource($project->load(["tasks","users"]));
    }
    public function store(Request $request){
        $request->validate([
            'name' => 'required'
        ]);
        $project = Projects::create([
            'name'=>$request->input('name'),
            'user_id'=>auth()->user()->id
        ]);
        $project->users()->attach($request->input("users"));
        return new ProjectResource($project->load("users")); ;
    }
    public function update(Request $request,Projects $project){
        if($request->has('name'))
        $project->update(["name" => $request->input('name')]);
        if($request->has('users')){
            $request_users = collect($request->input('users'))->combine($request->input('users'));

            $addedUsers = $request_users->except($project->users->keyBy('id')->keys()->toArray())->all();
            $project->users()->attach($addedUsers); 
    
            $deletedUsers = $project->users->keyBy('id')->filter(function($user) use($request_users){
                return !$request_users->has($user->id);
            })->keys()->toArray();
            $project->tasks->map(function($task)use($deletedUsers,$project){
                collect($deletedUsers)->map(function($userid) use($task,$project){
                    if($task->isUserAssigned($userid))
                        $task->assignTo($project->user_id);
                    if($task->creator_id === $userid){
                        $task->creator_id = $project->user_id;
                        $task->save();
                    }  
                });
            });
            $project->users()->detach($deletedUsers);
        }
        if($request->has('order')){
            collect($request->input('order'))->map(function($taskOrder) use($project){

                if($task = $project->tasks->keyBy('id')->get($taskOrder["id"])){
                    $task->update(["order"=>$taskOrder["order"]]);  
                }
            });


        }


        return new ProjectResource($project->load("users")->loadCount("tasks")); 

    }
    public function destroy(Request $request,Projects $project){
        $project->delete();
    }

}
