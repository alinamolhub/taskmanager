<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('permissions')->insert([
            [
                'id' => 1,
                'name' => 'create project',
                'created_at' => Carbon::parse('2024-08-04 07:11:55'),
                'updated_at' => Carbon::parse('2024-08-04 07:11:55'),
            ],
            [
                'id' => 2,
                'name' => 'create task',
                'created_at' => Carbon::parse('2024-08-04 07:11:55'),
                'updated_at' => Carbon::parse('2024-08-04 07:11:55'),
            ],
            [
                'id' => 3,
                'name' => 'create user',
                'created_at' => Carbon::parse('2024-08-04 07:11:55'),
                'updated_at' => Carbon::parse('2024-08-04 07:11:55'),
            ],
            [
                'id' => 4,
                'name' => 'update user',
                'created_at' => Carbon::parse('2024-08-08 09:12:04'),
                'updated_at' => Carbon::parse('2024-08-08 09:12:04'),
            ],
            [
                'id' => 5,
                'name' => 'update project',
                'created_at' => Carbon::parse('2024-08-08 09:13:49'),
                'updated_at' => Carbon::parse('2024-08-08 09:13:49'),
            ],
            [
                'id' => 6,
                'name' => 'update task',
                'created_at' => Carbon::parse('2024-08-08 09:14:29'),
                'updated_at' => Carbon::parse('2024-08-08 09:14:29'),
            ],
            [
                'id' => 8,
                'name' => 'create roles',
                'created_at' => Carbon::parse('2024-08-08 12:56:22'),
                'updated_at' => Carbon::parse('2024-08-08 12:56:22'),
            ],
            [
                'id' => 11,
                'name' => 'view roles',
                'created_at' => Carbon::parse('2024-08-10 14:40:32'),
                'updated_at' => Carbon::parse('2024-08-10 14:40:32'),
            ],
        ]);

    }
}
