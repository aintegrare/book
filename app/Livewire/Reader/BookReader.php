<?php

namespace App\Livewire\Reader;

use App\Models\Book;
use App\Models\Chapter;
use Livewire\Component;
use Illuminate\Support\Facades\Auth;

class BookReader extends Component
{
    public Book $book;
    public ?Chapter $currentChapter = null;
    public $chapterId;
    public $fontSize = 18;
    public $showToc = false;

    public function mount($slug)
    {
        $this->book = Book::where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        // Verificar se usuário tem acesso
        if (!$this->book->userHasAccess(Auth::user())) {
            abort(403, 'Você não tem acesso a este livro.');
        }

        // Carregar primeiro capítulo ou capítulo específico
        if ($this->chapterId) {
            $this->currentChapter = $this->book->chapters()->find($this->chapterId);
        } else {
            $this->currentChapter = $this->book->chapters()->first();
        }

        if (!$this->currentChapter) {
            abort(404, 'Nenhum capítulo encontrado.');
        }
    }

    public function loadChapter($chapterId)
    {
        $chapter = $this->book->chapters()->find($chapterId);

        if ($chapter) {
            $this->currentChapter = $chapter;
            $this->chapterId = $chapterId;
            $this->showToc = false;
        }
    }

    public function nextChapter()
    {
        $nextChapter = $this->book->chapters()
            ->where('order', '>', $this->currentChapter->order)
            ->orderBy('order')
            ->first();

        if ($nextChapter) {
            $this->loadChapter($nextChapter->id);
        }
    }

    public function previousChapter()
    {
        $prevChapter = $this->book->chapters()
            ->where('order', '<', $this->currentChapter->order)
            ->orderBy('order', 'desc')
            ->first();

        if ($prevChapter) {
            $this->loadChapter($prevChapter->id);
        }
    }

    public function toggleToc()
    {
        $this->showToc = !$this->showToc;
    }

    public function increaseFontSize()
    {
        if ($this->fontSize < 32) {
            $this->fontSize += 2;
        }
    }

    public function decreaseFontSize()
    {
        if ($this->fontSize > 12) {
            $this->fontSize -= 2;
        }
    }

    public function render()
    {
        $chapters = $this->book->chapters()->orderBy('order')->get();

        // Calcular progresso
        $totalChapters = $chapters->count();
        $currentIndex = $chapters->search(function($chapter) {
            return $chapter->id === $this->currentChapter->id;
        });
        $progress = $totalChapters > 0 ? (($currentIndex + 1) / $totalChapters) * 100 : 0;

        return view('livewire.reader.book-reader', [
            'chapters' => $chapters,
            'progress' => $progress,
            'hasNext' => $this->book->chapters()->where('order', '>', $this->currentChapter->order)->exists(),
            'hasPrevious' => $this->book->chapters()->where('order', '<', $this->currentChapter->order)->exists(),
        ])->layout('layouts.reader');
    }
}
