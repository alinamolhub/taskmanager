<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\UserCollection;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource;
class UserController extends Controller
{
    public function index(Request $request)
    {
        return new UserCollection(User::with(["role","projects.tasks"])->get());
    }
    
    public function store(Request $request){
        $request->validate([
            'name' => 'required',
            'email' => 'required'
        ]);
        $user = User::create([
            'name'=>$request->input('name'),
            'email'=>$request->input('email'),
            'role_id'=>$request->has('role_id')?$request->input('role_id'):2,
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
        ]);
        return new JsonResource($user);
    }
    public function update(Request $request,User $user){
        $user->update([
            'name'=>$request->input('name'),
            'email'=>$request->input('email'),
            'role_id'=>$request->has('role_id')?$request->input('role_id'):2
        ]);
        return new JsonResource($user);
    }
    public function show(Request $request,User $user){
        return new UserResource($user->load(["role","projects"])->loadCount("tasks"));
    }

    public function getAuthUser(Request $request){
        return new UserResource($request->user()->load("role.permissions"));
    }
}
