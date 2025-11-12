import { Link } from 'react-router-dom';
import { useBooks } from '../contexts/BookContext';
import { BookOpen, CheckCircle, Clock, Sparkles } from 'lucide-react';

const BookCard = ({ book }) => {
  const { unlockedBooks, progress } = useBooks();
  const isUnlocked = unlockedBooks.includes(book.code);
  const bookProgress = progress[book.id];

  const progressPercentage = bookProgress
    ? Math.round(((bookProgress.chapterIndex + 1) / book.chapters.length) * 100)
    : 0;

  const isCompleted = progressPercentage === 100;
  const isInProgress = progressPercentage > 0 && progressPercentage < 100;

  return (
    <Link
      to={isUnlocked ? `/read/${book.id}` : `/access?book=${book.code}`}
      className="group block animate-fade-in"
    >
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
        {/* Status Badge */}
        {isUnlocked && (
          <div className="absolute top-3 left-3 z-10">
            {isCompleted ? (
              <div className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-green-500 text-white rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Concluído</span>
              </div>
            ) : isInProgress ? (
              <div className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-blue-500 text-white rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
                <Clock className="w-3.5 h-3.5" />
                <span>{progressPercentage}%</span>
              </div>
            ) : null}
          </div>
        )}

        {/* New Badge for recently added books */}
        {book.isNew && (
          <div className="absolute top-3 right-3 z-10">
            <div className="flex items-center space-x-1 px-2.5 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Novo</span>
            </div>
          </div>
        )}

        {/* Book Cover with overlay gradient */}
        <div className="relative aspect-[2/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Progress Bar - Enhanced */}
          {isUnlocked && progressPercentage > 0 && (
            <div className="absolute bottom-0 left-0 right-0">
              <div className="h-1.5 bg-black/30 backdrop-blur-sm">
                <div
                  className={`h-full transition-all duration-500 ${
                    isCompleted
                      ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                      : 'bg-gradient-to-r from-blue-400 to-cyan-500'
                  }`}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Book Info - Premium styling */}
        <div className="p-5 space-y-3">
          {/* Genre/Category badge */}
          {book.genre && (
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                {book.genre}
              </span>
              {book.year && (
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {book.year}
                </span>
              )}
            </div>
          )}

          {/* Title */}
          <h3 className="font-serif font-semibold text-base text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {book.title}
          </h3>

          {/* Author */}
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium line-clamp-1">
            {book.author}
          </p>

          {/* Footer info */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-1.5 text-gray-500 dark:text-gray-400">
              <BookOpen className="w-4 h-4" />
              <span className="text-xs font-medium">
                {book.pages} páginas
              </span>
            </div>

            {isUnlocked ? (
              <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                Desbloqueado
              </span>
            ) : (
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Ver mais
              </span>
            )}
          </div>
        </div>

        {/* Hover effect border */}
        <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-blue-400 dark:group-hover:ring-blue-500 transition-all duration-300 pointer-events-none"></div>
      </div>
    </Link>
  );
};

export default BookCard;
