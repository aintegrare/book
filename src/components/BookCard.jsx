import { Link } from 'react-router-dom';
import { useBooks } from '../contexts/BookContext';
import { BookOpen, CheckCircle, Clock } from 'lucide-react';

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
      className="group block"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 dark:border-gray-700">
        {/* Book Cover */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-700 dark:from-indigo-900 dark:via-blue-900 dark:to-indigo-950">
          {book.cover ? (
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center p-6">
              <div className="text-center">
                <div className="mb-4">
                  <BookOpen className="w-16 h-16 text-white/90 mx-auto" />
                </div>
                <h3 className="text-white font-serif font-bold text-lg leading-tight line-clamp-4">
                  {book.title}
                </h3>
              </div>
            </div>
          )}

          {/* Progress Bar - Material Design */}
          {isUnlocked && progressPercentage > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-200 dark:bg-gray-600">
              <div
                className={`h-full transition-all duration-300 ${
                  isCompleted
                    ? 'bg-green-600 dark:bg-green-500'
                    : 'bg-blue-600 dark:bg-blue-500'
                }`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          )}
        </div>

        {/* Book Info */}
        <div className="p-5 space-y-2.5">
          {/* Title */}
          <h3 className="font-serif font-semibold text-base text-gray-900 dark:text-white line-clamp-2 leading-snug min-h-[2.5rem]">
            {book.title}
          </h3>

          {/* Author */}
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
            {book.author}
          </p>

          {/* Meta info */}
          <div className="flex items-center justify-between pt-1 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{book.pages}p</span>
            </div>

            {book.year && (
              <span>{book.year}</span>
            )}
          </div>

          {/* Status indicator */}
          {isUnlocked && (
            <div className="pt-2 flex items-center space-x-2 text-xs">
              {isCompleted ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-500" />
                  <span className="text-green-600 dark:text-green-500 font-medium">Concluído</span>
                </>
              ) : isInProgress ? (
                <>
                  <Clock className="w-4 h-4 text-blue-600 dark:text-blue-500" />
                  <span className="text-blue-600 dark:text-blue-500 font-medium">{progressPercentage}% lido</span>
                </>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
