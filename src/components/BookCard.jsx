import { Link } from 'react-router-dom';
import { useBooks } from '../contexts/BookContext';
import { BookOpen } from 'lucide-react';

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
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 dark:border-gray-700">
        {/* Book Cover */}
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-800 dark:bg-gray-900">
          {book.cover ? (
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center p-8">
              <div className="text-center space-y-3">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto" />
                <h3 className="text-white font-serif font-medium text-sm leading-tight line-clamp-3">
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
        <div className="p-4 space-y-2">
          {/* Title */}
          <h3 className="font-sans font-medium text-sm text-gray-900 dark:text-white line-clamp-2 leading-snug">
            {book.title}
          </h3>

          {/* Author */}
          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
            {book.author}
          </p>

          {/* Meta info */}
          <div className="flex items-center justify-between pt-1 text-xs text-gray-500 dark:text-gray-400">
            <span>{book.pages}p</span>
            {book.year && <span>{book.year}</span>}
          </div>

          {/* Status indicator */}
          {isUnlocked && (
            <div className="pt-1 text-xs">
              {isCompleted ? (
                <span className="text-green-600 dark:text-green-500 font-medium">Concluído</span>
              ) : isInProgress ? (
                <span className="text-blue-600 dark:text-blue-500 font-medium">{progressPercentage}%</span>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
