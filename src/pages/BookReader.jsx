import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  Bookmark,
  BookmarkPlus,
  Type,
  Highlighter,
  Home,
  X,
  MessageSquare
} from 'lucide-react';
import { useBooks } from '../contexts/BookContext';
import booksData from '../data/books.json';
import BookContentRenderer from '../components/BookContentRenderer';
import Toast from '../components/Toast';

const BookReader = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const {
    unlockedBooks,
    bookmarks,
    addBookmark,
    removeBookmark,
    progress,
    updateProgress,
    annotations,
    addAnnotation
  } = useBooks();

  const contentRef = useRef(null);
  const [book, setBook] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [fontSize, setFontSize] = useState(() => {
    return parseInt(localStorage.getItem('readerFontSize') || '18');
  });
  const [showSidebar, setShowSidebar] = useState(false);
  const [showAnnotationModal, setShowAnnotationModal] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [annotationNote, setAnnotationNote] = useState('');
  const [annotationColor, setAnnotationColor] = useState('yellow');
  const [toast, setToast] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Load book
  useEffect(() => {
    const foundBook = booksData.find(b => b.id === bookId);
    if (!foundBook) {
      navigate('/');
      return;
    }

    // Check if book is unlocked
    if (!unlockedBooks.includes(foundBook.code)) {
      navigate(`/access?book=${foundBook.code}`);
      return;
    }

    setBook(foundBook);

    // Load saved progress
    const savedProgress = progress[bookId];
    if (savedProgress) {
      setCurrentChapter(savedProgress.chapterIndex);
    }
  }, [bookId, unlockedBooks, navigate, progress]);

  // Update progress when chapter changes
  useEffect(() => {
    if (book) {
      updateProgress(book.id, currentChapter, 0);
    }
  }, [currentChapter, book]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger shortcuts when typing in inputs
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          previousChapter();
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextChapter();
          break;
        case 'Escape':
          e.preventDefault();
          if (showAnnotationModal) {
            setShowAnnotationModal(false);
          } else if (showSidebar) {
            setShowSidebar(false);
          }
          break;
        case 'm':
        case 'M':
          if (!showAnnotationModal) {
            e.preventDefault();
            setShowSidebar(!showSidebar);
          }
          break;
        case 'b':
        case 'B':
          if (!showAnnotationModal) {
            e.preventDefault();
            handleAddBookmark();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showSidebar, showAnnotationModal, currentChapter, book]);

  // Handle text selection for annotations
  const handleTextSelection = () => {
    const selection = window.getSelection();
    const text = selection.toString().trim();
    if (text.length > 0) {
      setSelectedText(text);
      setShowAnnotationModal(true);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleAddAnnotation = () => {
    if (selectedText && book) {
      addAnnotation(
        book.id,
        currentChapter,
        selectedText,
        annotationNote,
        annotationColor
      );
      setShowAnnotationModal(false);
      setAnnotationNote('');
      setSelectedText('');
      showToast('Anotação adicionada com sucesso');
    }
  };

  const handleAddBookmark = () => {
    if (book) {
      const chapter = book.chapters[currentChapter];
      const text = chapter.content.substring(0, 100) + '...';
      addBookmark(book.id, currentChapter, 0, text);
      showToast('Marcador adicionado');
    }
  };

  const goToChapter = (index) => {
    if (index === currentChapter) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentChapter(index);
      setShowSidebar(false);
      contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => setIsTransitioning(false), 100);
    }, 150);
  };

  const nextChapter = () => {
    if (book && currentChapter < book.chapters.length - 1) {
      goToChapter(currentChapter + 1);
    }
  };

  const previousChapter = () => {
    if (currentChapter > 0) {
      goToChapter(currentChapter - 1);
    }
  };

  const changeFontSize = (delta) => {
    const newSize = Math.max(14, Math.min(32, fontSize + delta));
    setFontSize(newSize);
    localStorage.setItem('readerFontSize', newSize.toString());
  };

  if (!book) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f8f6f0] dark:bg-[#1a1a1a]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400"></div>
      </div>
    );
  }

  const chapter = book.chapters[currentChapter];
  const bookBookmarks = bookmarks[book.id] || [];
  const bookAnnotations = annotations[book.id] || [];

  return (
    <div className="fixed inset-0 flex flex-col bg-[#f8f6f0] dark:bg-[#1a1a1a]">
      {/* Toast Notifications */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header - Premium Google Books style */}
      <header className="flex-shrink-0 bg-white/98 dark:bg-gray-900/98 backdrop-blur-md border-b border-gray-200/80 dark:border-gray-700/80 px-4 md:px-6 py-3 shadow-sm z-40">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3 md:space-x-4">
            <button
              onClick={() => navigate('/')}
              className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
              title="Voltar (Esc)"
            >
              <Home className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>

            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
              title="Índice (M)"
            >
              <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>

            <div className="hidden md:block border-l border-gray-200 dark:border-gray-700 pl-4 ml-1">
              <h1 className="font-serif text-base font-medium text-gray-900 dark:text-gray-100 line-clamp-1">
                {book.title}
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-500">{book.author}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Font Size Controls */}
            <div className="hidden sm:flex items-center space-x-1">
              <button
                onClick={() => changeFontSize(-2)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
                title="Diminuir fonte"
              >
                <Type className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
              <span className="text-xs px-2 text-gray-500 min-w-[3rem] text-center font-medium">
                {fontSize}px
              </span>
              <button
                onClick={() => changeFontSize(2)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
                title="Aumentar fonte"
              >
                <Type className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>

              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2"></div>
            </div>

            {/* Bookmark Button */}
            <button
              onClick={handleAddBookmark}
              className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
              title="Adicionar marcador (B)"
            >
              <BookmarkPlus className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar - Premium slide animation */}
        {showSidebar && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40 animate-fade-in md:hidden"
              onClick={() => setShowSidebar(false)}
            />

            <aside className="w-80 md:w-96 flex-shrink-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 overflow-y-auto shadow-2xl z-50 animate-slide-right">
              <div className="p-6 md:p-8 space-y-8">
                {/* Mobile header */}
                <div className="flex items-center justify-between md:hidden mb-4">
                  <h2 className="font-serif text-lg font-medium text-gray-900 dark:text-gray-100">Menu</h2>
                  <button
                    onClick={() => setShowSidebar(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Chapters */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-5 px-2 flex items-center">
                    Índice
                  </h3>
                  <div className="space-y-2">
                    {book.chapters.map((ch, index) => (
                      <button
                        key={index}
                        onClick={() => goToChapter(index)}
                        className={`w-full text-left px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                          index === currentChapter
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-gray-900 dark:text-gray-100 shadow-sm'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className={`text-xs font-semibold mt-1 transition-colors ${
                            index === currentChapter
                              ? 'text-blue-600 dark:text-blue-400'
                              : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                          }`}>
                            {ch.number}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-serif line-clamp-2 leading-relaxed">
                              {ch.title}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bookmarks */}
                {bookBookmarks.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-5 px-2 flex items-center">
                      <Bookmark className="w-3.5 h-3.5 mr-2" />
                      Marcadores ({bookBookmarks.length})
                    </h3>
                    <div className="space-y-2">
                      {bookBookmarks.map((bookmark) => (
                        <div
                          key={bookmark.id}
                          className="group px-4 py-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                        >
                          <button
                            onClick={() => goToChapter(bookmark.chapterIndex)}
                            className="text-left w-full mb-2"
                          >
                            <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2">
                              Capítulo {bookmark.chapterIndex + 1}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 font-serif leading-relaxed">
                              {bookmark.text}
                            </div>
                          </button>
                          <button
                            onClick={() => removeBookmark(book.id, bookmark.id)}
                            className="text-xs text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 font-medium"
                          >
                            Remover
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Annotations */}
                {bookAnnotations.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-5 px-2 flex items-center">
                      <Highlighter className="w-3.5 h-3.5 mr-2" />
                      Anotações ({bookAnnotations.length})
                    </h3>
                    <div className="space-y-3">
                      {bookAnnotations.map((annotation) => (
                        <div
                          key={annotation.id}
                          className={`p-4 rounded-xl bg-${annotation.color}-50 dark:bg-${annotation.color}-900/20 border-l-4 border-${annotation.color}-400 dark:border-${annotation.color}-600`}
                        >
                          <div className="text-xs font-serif text-gray-700 dark:text-gray-300 mb-2 line-clamp-3 italic leading-relaxed">
                            "{annotation.selectedText}"
                          </div>
                          {annotation.note && (
                            <div className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-serif">
                              {annotation.note}
                            </div>
                          )}
                          <div className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                            Capítulo {annotation.chapterIndex + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </>
        )}

        {/* Main Content - Premium reading experience */}
        <main
          ref={contentRef}
          className="flex-1 overflow-y-auto bg-[#f8f6f0] dark:bg-[#1a1a1a] scroll-smooth"
          onMouseUp={handleTextSelection}
        >
          <article className={`max-w-3xl mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-20 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100 animate-fade-in'}`}>
            {/* Chapter Header */}
            <header className="mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                  Capítulo {chapter.number}
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-700"></div>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-normal text-gray-900 dark:text-gray-100 leading-tight tracking-tight">
                {chapter.title}
              </h2>
            </header>

            {/* Chapter Content */}
            <div
              className="font-serif text-gray-800 dark:text-gray-200 selection:bg-blue-200 dark:selection:bg-blue-900/50"
              style={{
                fontSize: `${fontSize}px`,
                lineHeight: '1.8',
                letterSpacing: '0.01em'
              }}
            >
              <BookContentRenderer content={chapter.content} />
            </div>

            {/* Navigation */}
            <nav className="mt-20 pt-12 border-t border-gray-300/50 dark:border-gray-700/50">
              <div className="flex justify-between items-center">
                <button
                  onClick={previousChapter}
                  disabled={currentChapter === 0}
                  className="flex items-center space-x-2.5 px-6 py-3 rounded-full bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:scale-105 active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="text-sm font-medium">Anterior</span>
                </button>

                <div className="text-sm text-gray-400 dark:text-gray-500 font-medium">
                  {currentChapter + 1} / {book.chapters.length}
                </div>

                <button
                  onClick={nextChapter}
                  disabled={currentChapter === book.chapters.length - 1}
                  className="flex items-center space-x-2.5 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
                >
                  <span className="text-sm font-medium">Próximo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Keyboard shortcuts hint */}
              <div className="hidden md:flex justify-center mt-8 text-xs text-gray-400 dark:text-gray-600 space-x-6">
                <span>← Anterior</span>
                <span>→ Próximo</span>
                <span>M Menu</span>
                <span>B Marcador</span>
                <span>Esc Fechar</span>
              </div>
            </nav>
          </article>
        </main>
      </div>

      {/* Annotation Modal - Premium design */}
      {showAnnotationModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center p-4 z-[60] animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-lg w-full border border-gray-200/50 dark:border-gray-700/50 animate-scale-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-serif font-medium text-gray-900 dark:text-gray-100 flex items-center">
                <MessageSquare className="w-5 h-5 mr-3 text-gray-500" />
                Adicionar Anotação
              </h3>
              <button
                onClick={() => setShowAnnotationModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
                  Texto selecionado
                </label>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl text-sm font-serif italic text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-600/50 leading-relaxed">
                  "{selectedText}"
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
                  Nota (opcional)
                </label>
                <textarea
                  value={annotationNote}
                  onChange={(e) => setAnnotationNote(e.target.value)}
                  className="w-full px-4 py-3.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[120px] text-sm font-serif text-gray-900 dark:text-gray-100 placeholder:text-gray-400 resize-none"
                  placeholder="Adicione uma nota sobre este trecho..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wide">
                  Cor do destaque
                </label>
                <div className="flex space-x-3">
                  {['yellow', 'green', 'blue', 'pink'].map(color => (
                    <button
                      key={color}
                      onClick={() => setAnnotationColor(color)}
                      className={`w-14 h-14 rounded-full bg-${color}-200 dark:bg-${color}-700 border-4 ${
                        annotationColor === color
                          ? 'border-gray-900 dark:border-white ring-4 ring-offset-2 ring-gray-900/20 dark:ring-white/20 scale-110'
                          : 'border-transparent hover:border-gray-300 dark:hover:border-gray-500 hover:scale-105'
                      } transition-all duration-200`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowAnnotationModal(false)}
                  className="flex-1 px-6 py-3 rounded-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 text-sm font-medium hover:scale-105 active:scale-95"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddAnnotation}
                  className="flex-1 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookReader;
