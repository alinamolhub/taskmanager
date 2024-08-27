<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Role;
class RoleController extends Controller
{
    public function index(){
        return JsonResource::collection(Role::with("permissions")->get());
    }
    public function store(Request $request){
        $role = Role::create([
            'name'=>$request->input('name')
        ]);
        $role->permissions()->attach($request->input("perms"));
        return new JsonResource($role->load("permissions"));
        
    }
    public function update(Request $request,Role $role){

        $request_perms = collect($request->input('perms'))->combine($request->input('perms'));

        $addedPerms = $request_perms->except($role->permissions->keyBy('id')->keys()->toArray())->all();
        $role->permissions()->attach($addedPerms); 

        $deletedPerms = $role->permissions->keyBy('id')->filter(function($user) use($request_perms){
            return !$request_perms->has($user->id);
        })->keys()->toArray();
        $role->permissions()->detach($deletedPerms);
        return new JsonResource($role->load("permissions"));
    }

}
