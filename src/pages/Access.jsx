import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useBooks } from '../contexts/BookContext';
import booksData from '../data/books.json';

const Access = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { unlockBook, unlockedBooks } = useBooks();

  const [code, setCode] = useState(searchParams.get('book') || '');
  const [error, setError] = useState('');
  const [unlockedBook, setUnlockedBook] = useState(null);

  useEffect(() => {
    const bookCode = searchParams.get('book');
    if (bookCode) {
      setCode(bookCode);
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!code.trim()) {
      setError('Insira um código');
      return;
    }

    const book = booksData.find(b => b.code.toUpperCase() === code.toUpperCase());

    if (!book) {
      setError('Código inválido');
      setUnlockedBook(null);
      return;
    }

    if (!unlockedBooks.includes(book.code)) {
      unlockBook(book.code);
    }

    setUnlockedBook(book);
    setTimeout(() => navigate(`/read/${book.id}`), 600);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-primary-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        {/* Form - Centered and minimal */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                setError('');
              }}
              placeholder="Código de acesso"
              className="w-full px-6 py-4 text-center text-2xl font-mono tracking-widest bg-transparent border-b-2 border-primary-200 dark:border-primary-700 text-primary-900 dark:text-white placeholder-primary-300 dark:placeholder-primary-600 focus:outline-none focus:border-accent-500 transition-colors"
              maxLength={20}
              autoFocus
            />
            {error && (
              <p className="absolute -bottom-6 left-0 right-0 text-center text-sm text-red-500 dark:text-red-400">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary-900 dark:bg-white text-white dark:text-primary-900 rounded-full hover:bg-primary-800 dark:hover:bg-primary-50 transition-all duration-200 font-medium shadow-material-2 hover:shadow-material-3"
          >
            Acessar
          </button>
        </form>

        {/* Success state with book preview */}
        {unlockedBook && !error && (
          <div className="bg-primary-50 dark:bg-primary-800 rounded-lg p-6 animate-scale-in">
            <div className="flex items-center space-x-4">
              <img
                src={unlockedBook.cover}
                alt={unlockedBook.title}
                className="w-16 h-24 object-cover rounded shadow-material-1"
              />
              <div className="flex-1">
                <h3 className="font-medium text-primary-900 dark:text-white">
                  {unlockedBook.title}
                </h3>
                <p className="text-sm text-primary-600 dark:text-primary-300 mt-1">
                  {unlockedBook.author}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-primary-500 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Access;
