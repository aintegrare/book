<div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    {{-- Header - Material Design Top App Bar --}}
    <header class="md-top-app-bar md-surface md-elevation-2">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <svg class="w-8 h-8 md-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <h1 class="md-headline-small" style="color: var(--md-sys-color-on-surface);">BookVault</h1>
                </div>

                {{-- Busca --}}
                <div class="flex-1 max-w-xl mx-8">
                    <div class="relative">
                        <input
                            type="text"
                            wire:model.live.debounce.300ms="search"
                            placeholder="Buscar livros, autores..."
                            class="w-full pl-10 pr-4 py-2 md-rounded-full"
                            style="border: 1px solid var(--md-sys-color-outline); background-color: var(--md-sys-color-surface-container-high); color: var(--md-sys-color-on-surface);"
                        >
                        <svg class="absolute left-3 top-2.5 w-5 h-5" style="color: var(--md-sys-color-on-surface-variant);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                <div class="flex items-center space-x-4">
                    <span class="md-body-medium" style="color: var(--md-sys-color-on-surface-variant);">{{ auth()->user()->name }}</span>
                    <form method="POST" action="{{ route('logout') }}">
                        @csrf
                        <button type="submit" class="md-button-text">
                            Sair
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </header>

    {{-- Main Content --}}
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="mb-6">
            <h2 class="text-lg font-medium text-gray-900 dark:text-white">
                Minha Biblioteca
                <span class="text-sm text-gray-500 dark:text-gray-400 ml-2">({{ $books->total() }} livros)</span>
            </h2>
        </div>

        @if($books->count() > 0)
            {{-- Grid de Livros - Material Design Cards --}}
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                @foreach($books as $book)
                    <div class="group cursor-pointer" wire:key="book-{{ $book->id }}">
                        <a href="{{ route('reader', $book->slug) }}" class="block">
                            {{-- Material Design Card --}}
                            <div class="md-card md-card-elevated" style="transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);">
                                {{-- Capa do Livro --}}
                                <div class="relative aspect-[2/3] overflow-hidden">
                                    @if($book->cover_url)
                                        <img
                                            src="{{ $book->cover_url }}"
                                            alt="{{ $book->title }}"
                                            class="w-full h-full object-cover md-card-media"
                                        >
                                    @else
                                        <div class="w-full h-full flex items-center justify-center md-bg-primary">
                                            <svg class="w-16 h-16 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                        </div>
                                    @endif

                                    {{-- Overlay com info --}}
                                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <span class="text-white md-label-large">Abrir Livro</span>
                                    </div>
                                </div>

                                {{-- Informações do Livro --}}
                                <div class="md-card-content" style="padding: 12px;">
                                    <h3 class="md-title-small line-clamp-2" style="color: var(--md-sys-color-on-surface); margin-bottom: 4px;">
                                        {{ $book->title }}
                                    </h3>
                                    <p class="md-body-small" style="color: var(--md-sys-color-on-surface-variant);">
                                        {{ $book->author }}
                                    </p>
                                </div>
                            </div>
                        </a>
                    </div>
                @endforeach
            </div>

            {{-- Paginação --}}
            <div class="mt-8">
                {{ $books->links() }}
            </div>
        @else
            {{-- Empty State --}}
            <div class="text-center py-12">
                <svg class="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">Nenhum livro encontrado</h3>
                <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    @if($search)
                        Tente pesquisar com outros termos.
                    @else
                        Você ainda não tem acesso a nenhum livro.
                    @endif
                </p>
            </div>
        @endif
    </main>
</div>
