import { Calendar, FileText, User } from 'lucide-react';

const BookCover = ({ book, onStart }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-6 py-12">
      <div className="max-w-3xl w-full">
        {/* Main Cover Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          {/* Content */}
          <div className="p-12 lg:p-16 space-y-10">
            {/* Genre Badge */}
            {book.genre && (
              <div className="flex justify-center">
                <span className="inline-block px-4 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium uppercase tracking-wider">
                  {book.genre}
                </span>
              </div>
            )}

            {/* Title */}
            <div className="text-center space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-gray-900 dark:text-white leading-tight">
                {book.title}
              </h1>

              {/* Author */}
              <div className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
                <span>{book.author}</span>
              </div>
            </div>

            {/* Description */}
            {book.description && (
              <div className="max-w-2xl mx-auto border-t border-b border-gray-200 dark:border-gray-700 py-6">
                <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 text-center leading-relaxed">
                  {book.description}
                </p>
              </div>
            )}

            {/* Metadata Grid */}
            <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto pt-4">
              {/* Year */}
              {book.year && (
                <div className="text-center">
                  <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                    Ano
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {book.year}
                  </div>
                </div>
              )}

              {/* Pages */}
              {book.pages && (
                <div className="text-center">
                  <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                    Páginas
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {book.pages}
                  </div>
                </div>
              )}

              {/* Chapters */}
              <div className="text-center">
                <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                  Capítulos
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {book.chapters.length}
                </div>
              </div>
            </div>

            {/* Start Reading Button */}
            <div className="flex justify-center pt-8">
              <button
                onClick={onStart}
                className="px-10 py-3 bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white text-sm font-medium uppercase tracking-wider transition-colors"
              >
                Começar a Ler
              </button>
            </div>
          </div>
        </div>

        {/* Language Badge */}
        {book.language && (
          <div className="flex justify-center mt-6">
            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {book.language}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCover;
