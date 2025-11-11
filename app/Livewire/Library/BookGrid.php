<?php

namespace App\Livewire\Library;

use App\Models\Book;
use Livewire\Component;
use Livewire\WithPagination;

class BookGrid extends Component
{
    use WithPagination;

    public $search = '';

    public function updatingSearch()
    {
        $this->resetPage();
    }

    public function render()
    {
        $user = auth()->user();

        // Buscar apenas livros que o usuário tem acesso
        $books = Book::where('is_published', true)
            ->where(function($query) {
                $query->where('title', 'like', '%'.$this->search.'%')
                    ->orWhere('author', 'like', '%'.$this->search.'%')
                    ->orWhere('description', 'like', '%'.$this->search.'%');
            })
            ->whereHas('bookAccesses', function($query) use ($user) {
                $query->where('user_id', $user->id)
                    ->where(function($q) {
                        $q->whereNull('expires_at')
                          ->orWhere('expires_at', '>', now());
                    });
            })
            ->latest()
            ->paginate(12);

        return view('livewire.library.book-grid', [
            'books' => $books
        ])->layout('layouts.app');
    }
}
