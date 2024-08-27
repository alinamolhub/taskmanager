<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Projects;
use App\Http\Resources\TaskResource;
use App\Http\Resources\TaskCollection;
use App\Models\Tasks;
use App\Http\Resources\ProjectResource;
use App\Models\User;
use Illuminate\Support\Facades\DB;
define("Done",3);
class TaskController extends Controller
{

    public function store(Request $request,Projects $project){
        $request->validate([
            'description' => 'required'
        ]);
        $task = $project->tasks()->create([
            'description'=>$request->input('description'),
            'column' =>0,
            'creator_id'=>auth()->user()->id
        ]);
        
        $task->user()->attach($request->input("user_id")?$request->input("user_id"):auth()->user()->id);
  
        $task->load(["user","creator"]);
        return new TaskResource($task);
    }
    public function update(Request $request,Projects $project,Tasks $task){
        //DB::enableQueryLog(); 
  

        $task->update($request->input());
        if( $request->has("user_id")){
            $task->assignTo($request->input("user_id"));
        }
        if( $request->has("timer_start")){
            $task->timerInfo()->insert(["tasks_id"=>$task->id, "user_id" =>auth()->user()->id,"time_start" => now()]);
        }
        if( $request->has("timer_end") || ( $task->isTimerOn() && $request->has("column") && $request->input("column") === Done) ){
            $task->timerOff();
        }
        $task->load(["user","creator"]);
        return new TaskResource($task->load("user"));
    }
    public function destroy(Request $request,Projects $project,Tasks $task){
        $task->delete();
    }
}
