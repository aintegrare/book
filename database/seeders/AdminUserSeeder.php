<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Check if admin already exists
        if (User::where('email', 'admin@bookvault.com')->exists()) {
            $this->command->info('Admin user already exists!');
            return;
        }

        // Create admin user
        User::create([
            'name' => 'Admin',
            'email' => 'admin@bookvault.com',
            'password' => Hash::make('password123'),
            'email_verified_at' => now(),
        ]);

        $this->command->info('Admin user created successfully!');
        $this->command->info('Email: admin@bookvault.com');
        $this->command->info('Password: password123');
    }
}
