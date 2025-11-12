import { Link } from 'react-router-dom';
import { useBooks } from '../contexts/BookContext';

const BookCard = ({ book }) => {
  const { unlockedBooks, progress } = useBooks();
  const isUnlocked = unlockedBooks.includes(book.code);
  const bookProgress = progress[book.id];

  const progressPercentage = bookProgress
    ? Math.round(((bookProgress.chapterIndex + 1) / book.chapters.length) * 100)
    : 0;

  return (
    <Link
      to={isUnlocked ? `/read/${book.id}` : `/access?book=${book.code}`}
      className="group block animate-fade-in"
    >
      <div className="bg-white dark:bg-primary-900 rounded-lg overflow-hidden shadow-material-1 hover:shadow-material-3 transition-all duration-300 hover:-translate-y-1">
        {/* Book Cover - Aspect ratio 2:3 (book proportion) */}
        <div className="relative aspect-[2/3] overflow-hidden bg-primary-50 dark:bg-primary-800">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Progress Indicator - Minimal */}
          {isUnlocked && progressPercentage > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 dark:bg-black/20">
              <div
                className="h-full bg-accent-500 transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          )}
        </div>

        {/* Book Info - Minimal */}
        <div className="p-4 space-y-2">
          <h3 className="font-body font-medium text-base text-primary-900 dark:text-white line-clamp-2 leading-snug">
            {book.title}
          </h3>

          <p className="text-sm text-primary-600 dark:text-primary-300 font-light">
            {book.author}
          </p>

          {/* Subtle progress text */}
          {isUnlocked && progressPercentage > 0 && (
            <p className="text-xs text-primary-500 dark:text-primary-400 font-light">
              {progressPercentage}% concluído
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
