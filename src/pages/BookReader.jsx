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

  // Handle text selection for annotations
  const handleTextSelection = () => {
    const selection = window.getSelection();
    const text = selection.toString().trim();
    if (text.length > 0) {
      setSelectedText(text);
      setShowAnnotationModal(true);
    }
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
    }
  };

  const handleAddBookmark = () => {
    if (book) {
      const chapter = book.chapters[currentChapter];
      const text = chapter.content.substring(0, 100) + '...';
      addBookmark(book.id, currentChapter, 0, text);
    }
  };

  const goToChapter = (index) => {
    setCurrentChapter(index);
    setShowSidebar(false);
    contentRef.current?.scrollTo(0, 0);
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
    const newSize = Math.max(12, Math.min(32, fontSize + delta));
    setFontSize(newSize);
    localStorage.setItem('readerFontSize', newSize.toString());
  };

  if (!book) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const chapter = book.chapters[currentChapter];
  const bookBookmarks = bookmarks[book.id] || [];
  const bookAnnotations = annotations[book.id] || [];

  return (
    <div className="fixed inset-0 flex flex-col bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Voltar"
            >
              <Home className="w-5 h-5" />
            </button>

            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden md:block">
              <h1 className="font-bold text-lg">{book.title}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">{book.author}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Font Size Controls */}
            <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => changeFontSize(-2)}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                title="Diminuir fonte"
              >
                <Type className="w-4 h-4" />
              </button>
              <span className="text-xs px-2">{fontSize}px</span>
              <button
                onClick={() => changeFontSize(2)}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                title="Aumentar fonte"
              >
                <Type className="w-5 h-5" />
              </button>
            </div>

            {/* Bookmark Button */}
            <button
              onClick={handleAddBookmark}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Adicionar marcador"
            >
              <BookmarkPlus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        {showSidebar && (
          <aside className="w-80 flex-shrink-0 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
            <div className="p-4 space-y-6">
              {/* Chapters */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <Menu className="w-4 h-4 mr-2" />
                  Capítulos
                </h3>
                <div className="space-y-2">
                  {book.chapters.map((ch, index) => (
                    <button
                      key={index}
                      onClick={() => goToChapter(index)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        index === currentChapter
                          ? 'bg-primary-100 dark:bg-primary-900 text-primary-900 dark:text-primary-100 font-medium'
                          : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="text-sm font-medium">
                        Capítulo {ch.number}
                      </div>
                      <div className="text-xs opacity-75 line-clamp-1">
                        {ch.title}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bookmarks */}
              {bookBookmarks.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Bookmark className="w-4 h-4 mr-2" />
                    Marcadores ({bookBookmarks.length})
                  </h3>
                  <div className="space-y-2">
                    {bookBookmarks.map((bookmark) => (
                      <div
                        key={bookmark.id}
                        className="p-3 bg-white dark:bg-gray-700 rounded-lg"
                      >
                        <button
                          onClick={() => goToChapter(bookmark.chapterIndex)}
                          className="text-left w-full mb-2"
                        >
                          <div className="text-sm font-medium mb-1">
                            Capítulo {bookmark.chapterIndex + 1}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                            {bookmark.text}
                          </div>
                        </button>
                        <button
                          onClick={() => removeBookmark(book.id, bookmark.id)}
                          className="text-xs text-red-600 hover:text-red-700 dark:text-red-400"
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
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Highlighter className="w-4 h-4 mr-2" />
                    Anotações ({bookAnnotations.length})
                  </h3>
                  <div className="space-y-2">
                    {bookAnnotations.map((annotation) => (
                      <div
                        key={annotation.id}
                        className={`p-3 rounded-lg bg-${annotation.color}-50 dark:bg-${annotation.color}-900/20`}
                      >
                        <div className="text-sm font-medium mb-2 line-clamp-2">
                          "{annotation.selectedText}"
                        </div>
                        {annotation.note && (
                          <div className="text-xs text-gray-700 dark:text-gray-300 mb-2">
                            {annotation.note}
                          </div>
                        )}
                        <div className="text-xs text-gray-500">
                          Capítulo {annotation.chapterIndex + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main
          ref={contentRef}
          className="flex-1 overflow-y-auto"
          onMouseUp={handleTextSelection}
        >
          <article className="max-w-4xl mx-auto px-6 py-12">
            {/* Chapter Header */}
            <header className="mb-8 text-center">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Capítulo {chapter.number} de {book.chapters.length}
              </div>
              <h2 className="text-3xl font-bold mb-4">{chapter.title}</h2>
              <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
            </header>

            {/* Chapter Content */}
            <div
              className="prose prose-lg dark:prose-invert max-w-none leading-relaxed"
              style={{ fontSize: `${fontSize}px` }}
            >
              {chapter.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-6">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Navigation */}
            <nav className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <button
                  onClick={previousChapter}
                  disabled={currentChapter === 0}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Anterior</span>
                </button>

                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {Math.round(((currentChapter + 1) / book.chapters.length) * 100)}% concluído
                </div>

                <button
                  onClick={nextChapter}
                  disabled={currentChapter === book.chapters.length - 1}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span>Próximo</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </nav>
          </article>
        </main>
      </div>

      {/* Annotation Modal */}
      {showAnnotationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Adicionar Anotação
              </h3>
              <button
                onClick={() => setShowAnnotationModal(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Texto selecionado:
                </label>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm italic">
                  "{selectedText}"
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Nota (opcional):
                </label>
                <textarea
                  value={annotationNote}
                  onChange={(e) => setAnnotationNote(e.target.value)}
                  className="input min-h-[100px]"
                  placeholder="Adicione uma nota sobre este trecho..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Cor:</label>
                <div className="flex space-x-2">
                  {['yellow', 'green', 'blue', 'pink'].map(color => (
                    <button
                      key={color}
                      onClick={() => setAnnotationColor(color)}
                      className={`w-10 h-10 rounded-full bg-${color}-200 dark:bg-${color}-700 border-4 ${
                        annotationColor === color
                          ? 'border-gray-900 dark:border-white'
                          : 'border-transparent'
                      } transition-colors`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowAnnotationModal(false)}
                  className="btn-secondary flex-1"
                >
                  Cancelar
                </button>
                <button onClick={handleAddAnnotation} className="btn-primary flex-1">
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
