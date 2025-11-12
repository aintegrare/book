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
      <div className="flex items-center justify-center min-h-screen bg-[#f8f6f0]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400"></div>
      </div>
    );
  }

  const chapter = book.chapters[currentChapter];
  const bookBookmarks = bookmarks[book.id] || [];
  const bookAnnotations = annotations[book.id] || [];

  return (
    <div className="fixed inset-0 flex flex-col bg-[#f8f6f0] dark:bg-[#1a1a1a]">
      {/* Header - Google Books style */}
      <header className="flex-shrink-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 px-4 py-2.5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              title="Voltar"
            >
              <Home className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>

            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              title="Índice"
            >
              <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>

            <div className="hidden md:block border-l border-gray-200 dark:border-gray-700 pl-4">
              <h1 className="font-serif text-base font-normal text-gray-900 dark:text-gray-100">{book.title}</h1>
              <p className="text-xs text-gray-500 dark:text-gray-500">{book.author}</p>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            {/* Font Size Controls */}
            <button
              onClick={() => changeFontSize(-2)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              title="Diminuir fonte"
            >
              <Type className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
            <span className="text-xs px-2 text-gray-500 min-w-[3rem] text-center">{fontSize}px</span>
            <button
              onClick={() => changeFontSize(2)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              title="Aumentar fonte"
            >
              <Type className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>

            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1"></div>

            {/* Bookmark Button */}
            <button
              onClick={handleAddBookmark}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              title="Adicionar marcador"
            >
              <BookmarkPlus className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Google Books style */}
        {showSidebar && (
          <aside className="w-80 flex-shrink-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 overflow-y-auto shadow-lg">
            <div className="p-6 space-y-6">
              {/* Chapters */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4 px-2">
                  Índice
                </h3>
                <div className="space-y-1">
                  {book.chapters.map((ch, index) => (
                    <button
                      key={index}
                      onClick={() => goToChapter(index)}
                      className={`w-full text-left px-3 py-2.5 rounded-md transition-all group ${
                        index === currentChapter
                          ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className={`text-xs font-medium mt-0.5 ${
                          index === currentChapter ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'
                        }`}>
                          {ch.number}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-serif line-clamp-2">
                            {ch.title}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bookmarks - Google Books style */}
              {bookBookmarks.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4 px-2 flex items-center">
                    <Bookmark className="w-3.5 h-3.5 mr-2" />
                    Marcadores ({bookBookmarks.length})
                  </h3>
                  <div className="space-y-1">
                    {bookBookmarks.map((bookmark) => (
                      <div
                        key={bookmark.id}
                        className="group px-3 py-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                      >
                        <button
                          onClick={() => goToChapter(bookmark.chapterIndex)}
                          className="text-left w-full mb-2"
                        >
                          <div className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">
                            Capítulo {bookmark.chapterIndex + 1}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 font-serif">
                            {bookmark.text}
                          </div>
                        </button>
                        <button
                          onClick={() => removeBookmark(book.id, bookmark.id)}
                          className="text-xs text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Annotations - Google Books style */}
              {bookAnnotations.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4 px-2 flex items-center">
                    <Highlighter className="w-3.5 h-3.5 mr-2" />
                    Anotações ({bookAnnotations.length})
                  </h3>
                  <div className="space-y-2">
                    {bookAnnotations.map((annotation) => (
                      <div
                        key={annotation.id}
                        className={`p-3 rounded-md bg-${annotation.color}-50 dark:bg-${annotation.color}-900/20 border-l-3 border-${annotation.color}-400 dark:border-${annotation.color}-600`}
                      >
                        <div className="text-xs font-serif text-gray-700 dark:text-gray-300 mb-2 line-clamp-2 italic">
                          "{annotation.selectedText}"
                        </div>
                        {annotation.note && (
                          <div className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-serif">
                            {annotation.note}
                          </div>
                        )}
                        <div className="text-xs text-gray-400 dark:text-gray-500">
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

        {/* Main Content - Google Books style */}
        <main
          ref={contentRef}
          className="flex-1 overflow-y-auto bg-[#f8f6f0] dark:bg-[#1a1a1a]"
          onMouseUp={handleTextSelection}
        >
          <article className="max-w-3xl mx-auto px-8 md:px-16 py-16">
            {/* Chapter Header */}
            <header className="mb-12">
              <div className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-3 uppercase tracking-wide">
                Capítulo {chapter.number}
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-normal text-gray-900 dark:text-gray-100 leading-tight">
                {chapter.title}
              </h2>
            </header>

            {/* Chapter Content */}
            <div className="font-serif text-gray-800 dark:text-gray-200 selection:bg-blue-200 dark:selection:bg-blue-900/50" style={{ fontSize: `${fontSize}px`, lineHeight: '1.8' }}>
              <BookContentRenderer content={chapter.content} />
            </div>

            {/* Navigation */}
            <nav className="mt-16 pt-8 border-t border-gray-300/50 dark:border-gray-700/50">
              <div className="flex justify-between items-center">
                <button
                  onClick={previousChapter}
                  disabled={currentChapter === 0}
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="text-sm font-medium">Anterior</span>
                </button>

                <div className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                  {currentChapter + 1} / {book.chapters.length}
                </div>

                <button
                  onClick={nextChapter}
                  disabled={currentChapter === book.chapters.length - 1}
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  <span className="text-sm font-medium">Próximo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </nav>
          </article>
        </main>
      </div>

      {/* Annotation Modal - Google Books style */}
      {showAnnotationModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-md w-full border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-base font-serif font-medium text-gray-900 dark:text-gray-100 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-gray-500" />
                Adicionar Anotação
              </h3>
              <button
                onClick={() => setShowAnnotationModal(false)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                  Texto selecionado
                </label>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm font-serif italic text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-600/50">
                  "{selectedText}"
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                  Nota (opcional)
                </label>
                <textarea
                  value={annotationNote}
                  onChange={(e) => setAnnotationNote(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[100px] text-sm font-serif text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
                  placeholder="Adicione uma nota sobre este trecho..."
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">Cor</label>
                <div className="flex space-x-3">
                  {['yellow', 'green', 'blue', 'pink'].map(color => (
                    <button
                      key={color}
                      onClick={() => setAnnotationColor(color)}
                      className={`w-12 h-12 rounded-full bg-${color}-200 dark:bg-${color}-700 border-3 ${
                        annotationColor === color
                          ? 'border-gray-900 dark:border-white ring-2 ring-offset-2 ring-gray-900 dark:ring-white'
                          : 'border-transparent hover:border-gray-300 dark:hover:border-gray-500'
                      } transition-all`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  onClick={() => setShowAnnotationModal(false)}
                  className="flex-1 px-5 py-2.5 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-sm font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddAnnotation}
                  className="flex-1 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all text-sm font-medium shadow-sm"
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
