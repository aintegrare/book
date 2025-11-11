import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Key, CheckCircle, XCircle, Book } from 'lucide-react';
import { useBooks } from '../contexts/BookContext';
import booksData from '../data/books.json';

const Access = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { unlockBook, unlockedBooks } = useBooks();

  const [code, setCode] = useState(searchParams.get('book') || '');
  const [status, setStatus] = useState(null); // 'success', 'error', null
  const [message, setMessage] = useState('');
  const [unlockedBook, setUnlockedBook] = useState(null);

  useEffect(() => {
    const bookCode = searchParams.get('book');
    if (bookCode) {
      setCode(bookCode);
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!code.trim()) {
      setStatus('error');
      setMessage('Por favor, insira um código de acesso.');
      return;
    }

    // Find book by code
    const book = booksData.find(b => b.code.toUpperCase() === code.toUpperCase());

    if (!book) {
      setStatus('error');
      setMessage('Código inválido. Verifique e tente novamente.');
      setUnlockedBook(null);
      return;
    }

    // Check if already unlocked
    if (unlockedBooks.includes(book.code)) {
      setStatus('success');
      setMessage('Este livro já está desbloqueado!');
      setUnlockedBook(book);
      return;
    }

    // Unlock the book
    unlockBook(book.code);
    setStatus('success');
    setMessage('Livro desbloqueado com sucesso!');
    setUnlockedBook(book);
  };

  const handleReadBook = () => {
    if (unlockedBook) {
      navigate(`/read/${unlockedBook.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-4">
            <Key className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Acessar Livro</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Insira o código de acesso para desbloquear o livro
          </p>
        </div>

        {/* Access Form */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="code" className="block text-sm font-medium mb-2">
                Código de Acesso
              </label>
              <input
                id="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="Ex: DC2025"
                className="input font-mono text-lg tracking-wider"
                maxLength={20}
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              Desbloquear Livro
            </button>
          </form>

          {/* Status Messages */}
          {status && (
            <div
              className={`mt-4 p-4 rounded-lg flex items-start space-x-3 ${
                status === 'success'
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300'
                  : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300'
              }`}
            >
              {status === 'success' ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className="font-medium">{message}</p>
              </div>
            </div>
          )}

          {/* Unlocked Book Card */}
          {unlockedBook && status === 'success' && (
            <div className="mt-6 p-4 border-2 border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex space-x-4">
                <img
                  src={unlockedBook.cover}
                  alt={unlockedBook.title}
                  className="w-20 h-28 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-bold mb-1">{unlockedBook.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {unlockedBook.author}
                  </p>
                  <button
                    onClick={handleReadBook}
                    className="btn-primary text-sm flex items-center space-x-2"
                  >
                    <Book className="w-4 h-4" />
                    <span>Começar a Ler</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="mt-8 card">
          <h3 className="font-semibold mb-2">Como obter um código?</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Os códigos de acesso são fornecidos pelos administradores da biblioteca.
            Cada livro possui um código único que permite o acesso completo ao conteúdo.
          </p>

          <div className="mt-4 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
            <p className="text-sm font-medium text-primary-800 dark:text-primary-300">
              💡 Dica: Os códigos não diferenciam maiúsculas de minúsculas.
            </p>
          </div>
        </div>

        {/* Available Books Hint */}
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-primary-600 dark:text-primary-400 hover:underline text-sm"
          >
            ← Voltar para o catálogo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Access;
