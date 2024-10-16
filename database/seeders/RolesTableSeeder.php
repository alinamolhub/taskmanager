<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            [
                'id' => 1,
                'name' => 'ProjectManager',
                'created_at' => Carbon::parse('2024-08-04 07:11:55'),
                'updated_at' => Carbon::parse('2024-08-04 07:11:55'),
            ],
            [
                'id' => 2,
                'name' => 'Developer',
                'created_at' => Carbon::parse('2024-08-04 07:11:55'),
                'updated_at' => Carbon::parse('2024-08-04 07:11:55'),
            ],
            [
                'id' => 3,
                'name' => 'Admin',
                'created_at' => null,
                'updated_at' => null,
            ],
        ]);
    }
}
