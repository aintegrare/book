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
  X,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import booksData from '../data/books.json';
import BookContentRenderer from '../components/BookContentRenderer';
import BookCover from '../components/BookCover';
import Toast from '../components/Toast';
import { validateToken, incrementTokenAccess } from '../utils/shareTokens';

const SharedBookReader = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const contentRef = useRef(null);
  const [book, setBook] = useState(null);
  const [isValidToken, setIsValidToken] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(-1);
  const [fontSize, setFontSize] = useState(() => {
    return parseInt(localStorage.getItem('sharedReaderFontSize') || '18');
  });
  const [showSidebar, setShowSidebar] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768;
    }
    return false;
  });
  const [showAnnotationModal, setShowAnnotationModal] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [annotationNote, setAnnotationNote] = useState('');
  const [annotationColor, setAnnotationColor] = useState('yellow');
  const [toast, setToast] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Session-only storage for bookmarks and annotations (not persisted)
  const [sessionBookmarks, setSessionBookmarks] = useState([]);
  const [sessionAnnotations, setSessionAnnotations] = useState([]);

  // Validate token and load book
  useEffect(() => {
    const bookId = validateToken(token);

    if (!bookId) {
      setIsValidToken(false);
      return;
    }

    const foundBook = booksData.find(b => b.id === bookId);
    if (!foundBook) {
      setIsValidToken(false);
      return;
    }

    setIsValidToken(true);
    setBook(foundBook);

    // Incrementa contador de acesso
    incrementTokenAccess(token);
  }, [token]);

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 768;
      setShowSidebar(isDesktop);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
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
      const newAnnotation = {
        id: Date.now().toString(),
        chapterIndex: currentChapter,
        selectedText,
        note: annotationNote,
        color: annotationColor,
        timestamp: Date.now()
      };
      setSessionAnnotations([...sessionAnnotations, newAnnotation]);
      setShowAnnotationModal(false);
      setAnnotationNote('');
      setSelectedText('');
      showToast('Anotação adicionada com sucesso');
    }
  };

  const handleAddBookmark = () => {
    if (book && currentChapter >= 0) {
      const chapter = book.chapters[currentChapter];
      const text = chapter.content.substring(0, 100) + '...';
      const newBookmark = {
        id: Date.now().toString(),
        chapterIndex: currentChapter,
        text,
        timestamp: Date.now()
      };
      setSessionBookmarks([...sessionBookmarks, newBookmark]);
      showToast('Marcador adicionado');
    }
  };

  const removeBookmark = (bookmarkId) => {
    setSessionBookmarks(sessionBookmarks.filter(b => b.id !== bookmarkId));
    showToast('Marcador removido');
  };

  const goToChapter = (index) => {
    if (index === currentChapter) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentChapter(index);
      if (window.innerWidth < 768) {
        setShowSidebar(false);
      }
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
    if (currentChapter > -1) {
      goToChapter(currentChapter - 1);
    }
  };

  const changeFontSize = (delta) => {
    const newSize = Math.max(14, Math.min(32, fontSize + delta));
    setFontSize(newSize);
    localStorage.setItem('sharedReaderFontSize', newSize.toString());
  };

  // Token inválido ou expirado
  if (isValidToken === false) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center border border-gray-200 dark:border-gray-700">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full mb-6">
            <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Link Inválido ou Expirado
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Este link de compartilhamento não é mais válido ou já expirou.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Entre em contato com quem compartilhou o livro para obter um novo link.
          </p>
        </div>
      </div>
    );
  }

  // Loading
  if (!book) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400"></div>
      </div>
    );
  }

  const chapter = currentChapter >= 0 ? book.chapters[currentChapter] : null;

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Toast Notifications */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header - Sem botão Home */}
      <header className="flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 md:px-6 py-3 z-40">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 md:space-x-3">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Índice (M)"
            >
              <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>

            <div className="border-l border-gray-300 dark:border-gray-600 pl-4 ml-2">
              <h1 className="font-serif text-base font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
                {book.title}
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">{book.author}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Font Size Controls */}
            {currentChapter >= 0 && (
              <div className="hidden sm:flex items-center space-x-1 border-r border-gray-300 dark:border-gray-600 pr-3 mr-2">
                <button
                  onClick={() => changeFontSize(-2)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  title="Diminuir fonte"
                >
                  <Type className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
                <span className="text-xs px-2 text-gray-500 min-w-[3rem] text-center">
                  {fontSize}px
                </span>
                <button
                  onClick={() => changeFontSize(2)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  title="Aumentar fonte"
                >
                  <Type className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            )}

            {/* Bookmark Button */}
            {currentChapter >= 0 && (
              <button
                onClick={handleAddBookmark}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Adicionar marcador (B)"
              >
                <BookmarkPlus className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar */}
        {showSidebar && (
          <>
            <div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setShowSidebar(false)}
            />

            <aside className="w-80 md:w-96 flex-shrink-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto shadow-xl md:shadow-none z-50 md:z-10 md:relative">
              <div className="p-6 space-y-8">
                {/* Mobile header */}
                <div className="flex items-center justify-between md:hidden pb-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="font-serif text-lg font-semibold text-gray-900 dark:text-gray-100">Índice</h2>
                  <button
                    onClick={() => setShowSidebar(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Cover Page Link */}
                <div>
                  <button
                    onClick={() => goToChapter(-1)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      currentChapter === -1
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className="text-sm font-semibold">Capa</div>
                  </button>
                </div>

                {/* Chapters */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4 px-2">
                    Capítulos
                  </h3>
                  <div className="space-y-1">
                    {book.chapters.map((ch, index) => (
                      <button
                        key={index}
                        onClick={() => goToChapter(index)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                          index === currentChapter
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className={`text-xs font-semibold ${
                            index === currentChapter
                              ? 'text-blue-600 dark:text-blue-400'
                              : 'text-gray-400'
                          }`}>
                            {ch.number}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-serif line-clamp-2 leading-snug">
                              {ch.title}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bookmarks */}
                {sessionBookmarks.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4 px-2 flex items-center">
                      <Bookmark className="w-3.5 h-3.5 mr-2" />
                      Marcadores ({sessionBookmarks.length})
                    </h3>
                    <div className="space-y-2">
                      {sessionBookmarks.map((bookmark) => (
                        <div
                          key={bookmark.id}
                          className="group px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600"
                        >
                          <button
                            onClick={() => goToChapter(bookmark.chapterIndex)}
                            className="text-left w-full mb-2"
                          >
                            <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
                              Capítulo {bookmark.chapterIndex + 1}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 font-serif leading-snug">
                              {bookmark.text}
                            </div>
                          </button>
                          <button
                            onClick={() => removeBookmark(bookmark.id)}
                            className="text-xs text-red-600 dark:text-red-400 hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            Remover
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Annotations */}
                {sessionAnnotations.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4 px-2 flex items-center">
                      <Highlighter className="w-3.5 h-3.5 mr-2" />
                      Anotações ({sessionAnnotations.length})
                    </h3>
                    <div className="space-y-2">
                      {sessionAnnotations.map((annotation) => (
                        <div
                          key={annotation.id}
                          className={`p-4 rounded-lg bg-${annotation.color}-50 dark:bg-${annotation.color}-900/20 border-l-3 border-${annotation.color}-400 dark:border-${annotation.color}-600`}
                        >
                          <div className="text-xs font-serif text-gray-700 dark:text-gray-300 mb-2 line-clamp-2 italic leading-snug">
                            "{annotation.selectedText}"
                          </div>
                          {annotation.note && (
                            <div className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-serif leading-snug">
                              {annotation.note}
                            </div>
                          )}
                          <div className="text-xs text-gray-500 dark:text-gray-400">
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

        {/* Main Content */}
        <main
          ref={contentRef}
          className="flex-1 overflow-y-auto bg-white dark:bg-gray-900 scroll-smooth"
          onMouseUp={currentChapter >= 0 ? handleTextSelection : undefined}
        >
          {currentChapter === -1 ? (
            <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              <BookCover book={book} onStart={() => goToChapter(0)} />
            </div>
          ) : (
            <article className={`max-w-3xl mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-20 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              {/* Chapter Header */}
              <header className="mb-12">
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                  Capítulo {chapter.number}
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white leading-tight">
                  {chapter.title}
                </h2>
                <div className="mt-4 h-px bg-gradient-to-r from-gray-300 via-gray-200 to-transparent dark:from-gray-700 dark:via-gray-800"></div>
              </header>

              {/* Chapter Content */}
              <div
                className="font-serif text-gray-800 dark:text-gray-200 selection:bg-blue-100 dark:selection:bg-blue-900/50"
                style={{
                  fontSize: `${fontSize}px`,
                  lineHeight: '1.8',
                  letterSpacing: '0.01em'
                }}
              >
                <BookContentRenderer content={chapter.content} />
              </div>

              {/* Navigation */}
              <nav className="mt-16 pt-10 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <button
                    onClick={previousChapter}
                    disabled={currentChapter === 0}
                    className="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="text-sm font-medium">Anterior</span>
                  </button>

                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {currentChapter + 1} de {book.chapters.length}
                  </div>

                  <button
                    onClick={nextChapter}
                    disabled={currentChapter === book.chapters.length - 1}
                    className="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <span className="text-sm font-medium">Próximo</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="hidden md:flex justify-center mt-6 text-xs text-gray-400 dark:text-gray-500 space-x-4">
                  <span>← Anterior</span>
                  <span>→ Próximo</span>
                  <span>M Menu</span>
                  <span>B Marcador</span>
                </div>
              </nav>
            </article>
          )}
        </main>
      </div>

      {/* Annotation Modal */}
      {showAnnotationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[60]">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-lg w-full border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-gray-500" />
                Adicionar Anotação
              </h3>
              <button
                onClick={() => setShowAnnotationModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Texto selecionado
                </label>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm font-serif italic text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 leading-relaxed">
                  "{selectedText}"
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Nota (opcional)
                </label>
                <textarea
                  value={annotationNote}
                  onChange={(e) => setAnnotationNote(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[100px] text-sm font-serif text-gray-900 dark:text-gray-100 placeholder:text-gray-400 resize-none"
                  placeholder="Adicione uma nota..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Cor do destaque
                </label>
                <div className="flex space-x-3">
                  {['yellow', 'green', 'blue', 'pink'].map(color => (
                    <button
                      key={color}
                      onClick={() => setAnnotationColor(color)}
                      className={`w-12 h-12 rounded-lg bg-${color}-200 dark:bg-${color}-700 border-2 ${
                        annotationColor === color
                          ? 'border-blue-600 dark:border-blue-400 scale-110'
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                      } transition-all`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  onClick={() => setShowAnnotationModal(false)}
                  className="flex-1 px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddAnnotation}
                  className="flex-1 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors text-sm font-medium"
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

export default SharedBookReader;
