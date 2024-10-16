<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'id' => 22,
                'name' => 'Developer',
                'email' => 'dev@mail.net',
                'email_verified_at' => Carbon::parse('2024-07-12 10:37:30'),
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // хеш пароля
                'remember_token' => 'XFlTnWrEpN',
                'created_at' => Carbon::parse('2024-07-12 10:37:30'),
                'updated_at' => Carbon::parse('2024-07-12 10:37:30'),
                'role_id' => 2,
            ],
            [
                'id' => 23,
                'name' => 'Project Manager',
                'email' => 'pm@mail.com',
                'email_verified_at' => Carbon::parse('2024-07-12 10:37:30'),
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
                'remember_token' => 'xONk24PzTl',
                'created_at' => Carbon::parse('2024-07-12 10:37:30'),
                'updated_at' => Carbon::parse('2024-07-12 10:37:30'),
                'role_id' => 1,
            ],
            [
                'id' => 54,
                'name' => 'Admin',
                'email' => 'admin@mail.com',
                'email_verified_at' => null,
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
                'remember_token' => null,
                'created_at' => Carbon::parse('2024-08-08 09:17:32'),
                'updated_at' => Carbon::parse('2024-08-08 09:17:41'),
                'role_id' => 3,
            ]
        ]);
    }
}
