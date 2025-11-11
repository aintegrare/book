import { Link } from 'react-router-dom';
import { Book, Clock, User, Calendar } from 'lucide-react';
import { useBooks } from '../contexts/BookContext';

const BookCard = ({ book }) => {
  const { unlockedBooks, progress } = useBooks();
  const isUnlocked = unlockedBooks.includes(book.code);
  const bookProgress = progress[book.id];

  const progressPercentage = bookProgress
    ? Math.round(((bookProgress.chapterIndex + 1) / book.chapters.length) * 100)
    : 0;

  return (
    <div className="card group hover:shadow-xl transition-all duration-300">
      {/* Book Cover */}
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Overlay with info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <p className="text-sm line-clamp-3">{book.description}</p>
          </div>
        </div>

        {/* Unlock Status Badge */}
        {isUnlocked && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Desbloqueado
          </div>
        )}
      </div>

      {/* Book Info */}
      <div className="space-y-2">
        <h3 className="font-bold text-lg line-clamp-1">{book.title}</h3>

        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 space-x-1">
          <User className="w-4 h-4" />
          <span>{book.author}</span>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{book.year}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Book className="w-3 h-3" />
            <span>{book.pages} págs</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full">
            {book.genre}
          </span>
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
            {book.language}
          </span>
        </div>

        {/* Progress Bar */}
        {isUnlocked && progressPercentage > 0 && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
              <span>Progresso</span>
              <span>{progressPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Button */}
        <Link
          to={isUnlocked ? `/read/${book.id}` : `/access?book=${book.code}`}
          className={`block w-full text-center py-2 rounded-lg font-medium transition-colors ${
            isUnlocked
              ? 'bg-primary-600 hover:bg-primary-700 text-white'
              : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100'
          }`}
        >
          {isUnlocked ? (
            progressPercentage > 0 ? 'Continuar Lendo' : 'Começar a Ler'
          ) : (
            'Desbloquear'
          )}
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
