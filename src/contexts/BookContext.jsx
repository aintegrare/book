import { createContext, useContext, useState, useEffect } from 'react';

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  // Estado para livros acessados (códigos desbloqueados)
  const [unlockedBooks, setUnlockedBooks] = useState(() => {
    const saved = localStorage.getItem('unlockedBooks');
    return saved ? JSON.parse(saved) : [];
  });

  // Estado para marcadores
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('bookmarks');
    return saved ? JSON.parse(saved) : {};
  });

  // Estado para progresso de leitura
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('readingProgress');
    return saved ? JSON.parse(saved) : {};
  });

  // Estado para anotações
  const [annotations, setAnnotations] = useState(() => {
    const saved = localStorage.getItem('annotations');
    return saved ? JSON.parse(saved) : {};
  });

  // Salvar no localStorage quando houver mudanças
  useEffect(() => {
    localStorage.setItem('unlockedBooks', JSON.stringify(unlockedBooks));
  }, [unlockedBooks]);

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('readingProgress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('annotations', JSON.stringify(annotations));
  }, [annotations]);

  // Função para desbloquear livro com código
  const unlockBook = (code) => {
    if (!unlockedBooks.includes(code)) {
      setUnlockedBooks([...unlockedBooks, code]);
      return true;
    }
    return false;
  };

  // Função para adicionar marcador
  const addBookmark = (bookId, chapterIndex, position, text) => {
    const newBookmark = {
      id: Date.now(),
      chapterIndex,
      position,
      text,
      createdAt: new Date().toISOString()
    };

    setBookmarks(prev => ({
      ...prev,
      [bookId]: [...(prev[bookId] || []), newBookmark]
    }));
  };

  // Função para remover marcador
  const removeBookmark = (bookId, bookmarkId) => {
    setBookmarks(prev => ({
      ...prev,
      [bookId]: prev[bookId]?.filter(b => b.id !== bookmarkId) || []
    }));
  };

  // Função para atualizar progresso
  const updateProgress = (bookId, chapterIndex, scrollPosition) => {
    setProgress(prev => ({
      ...prev,
      [bookId]: {
        chapterIndex,
        scrollPosition,
        lastRead: new Date().toISOString()
      }
    }));
  };

  // Função para adicionar anotação
  const addAnnotation = (bookId, chapterIndex, selectedText, note, color = 'yellow') => {
    const newAnnotation = {
      id: Date.now(),
      chapterIndex,
      selectedText,
      note,
      color,
      createdAt: new Date().toISOString()
    };

    setAnnotations(prev => ({
      ...prev,
      [bookId]: [...(prev[bookId] || []), newAnnotation]
    }));
  };

  // Função para remover anotação
  const removeAnnotation = (bookId, annotationId) => {
    setAnnotations(prev => ({
      ...prev,
      [bookId]: prev[bookId]?.filter(a => a.id !== annotationId) || []
    }));
  };

  const value = {
    unlockedBooks,
    unlockBook,
    bookmarks,
    addBookmark,
    removeBookmark,
    progress,
    updateProgress,
    annotations,
    addAnnotation,
    removeAnnotation
  };

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within BookProvider');
  }
  return context;
};
