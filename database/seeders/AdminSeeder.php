<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Book;
use App\Models\Chapter;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create roles
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $readerRole = Role::firstOrCreate(['name' => 'reader']);

        // Create admin user
        $admin = User::firstOrCreate(
            ['email' => 'admin@bookvault.com'],
            [
                'name' => 'Administrator',
                'password' => Hash::make('password'),
            ]
        );
        $admin->assignRole($adminRole);

        echo "✅ Admin user created:\n";
        echo "   Email: admin@bookvault.com\n";
        echo "   Password: password\n\n";

        // Create a sample book
        $book = Book::firstOrCreate(
            ['slug' => 'introducao-programacao'],
            [
                'title' => 'Introdução à Programação',
                'author' => 'João Silva',
                'description' => 'Um guia completo para iniciantes em programação.',
                'is_published' => true,
            ]
        );

        // Create sample chapters
        $chapters = [
            [
                'title' => 'Capítulo 1: Fundamentos',
                'content' => '<h1>Fundamentos da Programação</h1><p>Neste capítulo, você aprenderá os conceitos básicos de programação...</p>',
                'order' => 1,
            ],
            [
                'title' => 'Capítulo 2: Variáveis e Tipos de Dados',
                'content' => '<h1>Variáveis e Tipos de Dados</h1><p>Variáveis são espaços na memória para armazenar informações...</p>',
                'order' => 2,
            ],
            [
                'title' => 'Capítulo 3: Estruturas de Controle',
                'content' => '<h1>Estruturas de Controle</h1><p>As estruturas de controle permitem tomar decisões no código...</p>',
                'order' => 3,
            ],
        ];

        foreach ($chapters as $chapterData) {
            Chapter::firstOrCreate(
                [
                    'book_id' => $book->id,
                    'order' => $chapterData['order'],
                ],
                $chapterData
            );
        }

        echo "✅ Sample book created with 3 chapters\n";
    }
}
