<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
use App\Http\Controllers\ProjectsController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProjectsUsersController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PermissionController;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\UserResource;
use App\Models\Tasks;

Route::group(['middleware' => ['auth:sanctum']], function () { 

    /*Route::resource('projects.users',ProjectsUsersController::class,['only' => ['store','destroy']]);*/
    //Route::get('tasks/{task}/users',[TaskController::class, 'users']);
        //Route::middleware(['auth:sanctum'])->resource('projects.tasks.user',TaskController::class);

    Route::get('/user', [UserController::class, 'getAuthUser']);
    Route::resource('users',UserController::class);
    Route::resource('projects',ProjectsController::class,['only' => ['index']]);
    Route::group(['middleware' => ['role:Admin']],function(){
        Route::resource('roles',RoleController::class);
        Route::resource('perms',PermissionController::class);
        Route::resource('users',UserController::class,['only' => ['store','update','destroy']]);
        Route::resource('projects',ProjectsController::class,['only' => ['store','update','destroy']]);
    });


    Route::resource('projects',ProjectsController::class,['only' => ['show']])->parameters([
        'projects' => 'project'
    ])->middleware(['can:view,project']);

    Route::resource('projects.tasks',TaskController::class,['only' => ['store']])->parameters([
        'projects' => 'project'
    ])->middleware(['can:create,App\Models\Tasks','can:view,project']);
    
    Route::resource('projects.tasks',TaskController::class,['only' => ['update','destroy']])->parameters([
        'projects' => 'project',
        'tasks' => 'task'
    ])->middleware(['can:update,task','can:view,project']);
    

 
    

});

