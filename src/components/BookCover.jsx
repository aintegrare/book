import { Book, Calendar, FileText, User } from 'lucide-react';

const BookCover = ({ book, onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl w-full">
        {/* Main Cover Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden">
          {/* Header Accent Bar */}
          <div className="h-2 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600"></div>

          {/* Content */}
          <div className="p-12 lg:p-16 space-y-12">
            {/* Genre Badge */}
            {book.genre && (
              <div className="flex justify-center">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm font-semibold border border-blue-200 dark:border-blue-800">
                  <Book className="w-4 h-4 mr-2" />
                  {book.genre}
                </span>
              </div>
            )}

            {/* Title */}
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 dark:text-white leading-tight tracking-tight">
                {book.title}
              </h1>

              {/* Divider Ornament */}
              <div className="flex items-center justify-center space-x-4">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500"></div>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600"></div>
              </div>

              {/* Author */}
              <div className="flex items-center justify-center space-x-2 text-xl md:text-2xl text-gray-600 dark:text-gray-400">
                <User className="w-5 h-5" />
                <span className="font-serif">{book.author}</span>
              </div>
            </div>

            {/* Description */}
            {book.description && (
              <div className="max-w-2xl mx-auto">
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 text-center leading-relaxed font-serif">
                  {book.description}
                </p>
              </div>
            )}

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto pt-8">
              {/* Year */}
              {book.year && (
                <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-3" />
                  <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-1">
                    Publicado
                  </span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {book.year}
                  </span>
                </div>
              )}

              {/* Pages */}
              {book.pages && (
                <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <FileText className="w-6 h-6 text-green-600 dark:text-green-400 mb-3" />
                  <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-1">
                    Páginas
                  </span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {book.pages}
                  </span>
                </div>
              )}

              {/* Chapters */}
              <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <Book className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-3" />
                <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-1">
                  Capítulos
                </span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {book.chapters.length}
                </span>
              </div>
            </div>

            {/* Start Reading Button */}
            <div className="flex justify-center pt-8">
              <button
                onClick={onStart}
                className="group relative px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                <span className="text-lg font-semibold">Começar a Ler</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/0 via-white/20 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              </button>
            </div>

            {/* Bottom Ornament */}
            <div className="flex justify-center pt-8">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Language Badge */}
        {book.language && (
          <div className="flex justify-center mt-6">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Idioma: <span className="font-semibold">{book.language}</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCover;
