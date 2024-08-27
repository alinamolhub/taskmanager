<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Permission;

class PermissionController extends Controller
{
    public function index(Request $request){
        return JsonResource::collection(Permission::all());
    }
    public function store(Request $request){
        $perm = Permission::create([
            'name'=>$request->input('name')
        ]);
        return new JsonResource($perm);
    }
}
