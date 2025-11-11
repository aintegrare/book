<?php

use App\Livewire\Library\BookGrid;
use App\Livewire\Reader\BookReader;
use Illuminate\Support\Facades\Route;

// Redirecionar home para library
Route::get('/', function () {
    return redirect()->route('library');
});

// Biblioteca (Dashboard principal)
Route::get('/library', BookGrid::class)
    ->middleware(['auth', 'verified'])
    ->name('library');

// Reader (Leitor de Livros)
Route::get('/read/{slug}', BookReader::class)
    ->middleware(['auth', 'verified'])
    ->name('reader');

// Profile
Route::view('profile', 'profile')
    ->middleware(['auth'])
    ->name('profile');

require __DIR__.'/auth.php';
