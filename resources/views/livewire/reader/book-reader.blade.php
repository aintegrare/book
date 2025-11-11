<div class="min-h-screen md-surface" x-data="{ showToolbar: true }">
    {{-- Toolbar Superior - Material Design --}}
    <div
        x-show="showToolbar"
        x-transition:enter="transform transition ease-in-out duration-300"
        x-transition:enter-start="-translate-y-full"
        x-transition:enter-end="translate-y-0"
        x-transition:leave="transform transition ease-in-out duration-300"
        x-transition:leave-start="translate-y-0"
        x-transition:leave-end="-translate-y-full"
        class="fixed top-0 left-0 right-0 md-surface-container md-elevation-2 z-50"
    >
        <div class="max-w-5xl mx-auto px-4 py-3">
            <div class="flex items-center justify-between">
                {{-- Voltar --}}
                <div class="flex items-center space-x-4">
                    <a href="{{ route('library') }}" class="md-icon-button">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </a>
                    <div>
                        <h1 class="md-title-medium" style="color: var(--md-sys-color-on-surface);">{{ $book->title }}</h1>
                        <p class="md-body-small" style="color: var(--md-sys-color-on-surface-variant);">{{ $book->author }}</p>
                    </div>
                </div>

                {{-- Controles --}}
                <div class="flex items-center space-x-2">
                    {{-- Índice --}}
                    <button
                        wire:click="toggleToc"
                        class="md-icon-button"
                        title="Índice"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {{-- Diminuir Fonte --}}
                    <button
                        wire:click="decreaseFontSize"
                        class="md-icon-button"
                        title="Diminuir fonte"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                        </svg>
                    </button>

                    {{-- Aumentar Fonte --}}
                    <button
                        wire:click="increaseFontSize"
                        class="md-icon-button"
                        title="Aumentar fonte"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>
            </div>

            {{-- Barra de Progresso - Material Design --}}
            <div class="mt-3">
                <div class="md-progress-linear">
                    <div class="md-progress-linear-bar" style="width: {{ $progress }}%"></div>
                </div>
            </div>
        </div>
    </div>

    {{-- Sidebar Table of Contents - Material Design Navigation Drawer --}}
    <div
        x-show="$wire.showToc"
        @click.away="$wire.showToc = false"
        x-transition:enter="transform transition ease-in-out duration-300"
        x-transition:enter-start="-translate-x-full"
        x-transition:enter-end="translate-x-0"
        x-transition:leave="transform transition ease-in-out duration-300"
        x-transition:leave-start="translate-x-0"
        x-transition:leave-end="-translate-x-full"
        class="fixed left-0 top-0 h-full w-80 md-surface-container-low md-elevation-1 z-40 overflow-y-auto"
    >
        <div class="p-6">
            <div class="flex items-center justify-between mb-6">
                <h2 class="md-headline-small" style="color: var(--md-sys-color-on-surface);">Índice</h2>
                <button wire:click="toggleToc" class="md-icon-button">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <nav class="space-y-1">
                @foreach($chapters as $chapter)
                    <button
                        wire:click="loadChapter({{ $chapter->id }})"
                        class="w-full text-left md-navigation-item
                            {{ $currentChapter->id === $chapter->id ? 'active' : '' }}"
                    >
                        <div class="flex items-start">
                            <span class="md-body-small mr-2" style="color: var(--md-sys-color-on-surface-variant);">{{ $chapter->order }}.</span>
                            <span class="flex-1 md-body-medium">{{ $chapter->title }}</span>
                        </div>
                    </button>
                @endforeach
            </nav>
        </div>
    </div>

    {{-- Área de Leitura --}}
    <div class="pt-24 pb-20" @click="showToolbar = !showToolbar">
        <article class="max-w-3xl mx-auto px-6 sm:px-8">
            {{-- Título do Capítulo --}}
            <header class="mb-8">
                <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Capítulo {{ $currentChapter->order }}
                </div>
                <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {{ $currentChapter->title }}
                </h2>
                <div class="h-1 w-24 bg-indigo-600 rounded"></div>
            </header>

            {{-- Conteúdo do Capítulo --}}
            <div
                class="prose prose-lg dark:prose-invert max-w-none
                    prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                    prose-p:text-gray-700 dark:prose-p:text-gray-300
                    prose-p:leading-relaxed prose-p:mb-6
                    prose-a:text-indigo-600 dark:prose-a:text-indigo-400
                    prose-strong:text-gray-900 dark:prose-strong:text-white
                    prose-em:text-gray-700 dark:prose-em:text-gray-300"
                style="font-size: {{ $fontSize }}px; line-height: 1.8;"
            >
                {!! nl2br(e($currentChapter->content)) !!}
            </div>
        </article>
    </div>

    {{-- Navegação Inferior - Material Design --}}
    <div class="fixed bottom-0 left-0 right-0 md-surface-container md-elevation-2 z-40">
        <div class="max-w-5xl mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                {{-- Anterior --}}
                <button
                    wire:click="previousChapter"
                    @if(!$hasPrevious) disabled @endif
                    class="md-button md-button-text"
                    style="{{ !$hasPrevious ? 'opacity: 0.38;' : '' }}"
                >
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Anterior</span>
                </button>

                {{-- Info do Capítulo --}}
                <div class="text-center">
                    <div class="md-body-medium" style="color: var(--md-sys-color-on-surface);">
                        {{ $currentChapter->title }}
                    </div>
                    <div class="md-body-small" style="color: var(--md-sys-color-on-surface-variant); margin-top: 4px;">
                        Capítulo {{ $currentChapter->order }} de {{ $chapters->count() }}
                    </div>
                </div>

                {{-- Próximo --}}
                <button
                    wire:click="nextChapter"
                    @if(!$hasNext) disabled @endif
                    class="md-button md-button-text"
                    style="{{ !$hasNext ? 'opacity: 0.38;' : '' }}"
                >
                    <span>Próximo</span>
                    <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</div>
