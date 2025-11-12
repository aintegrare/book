import { useState, useMemo } from 'react';
import { Search, BookOpen, Sparkles } from 'lucide-react';
import BookCard from '../components/BookCard';
import booksData from '../data/books.json';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  // Get unique genres and languages
  const genres = useMemo(() => {
    const uniqueGenres = [...new Set(booksData.map(book => book.genre))];
    return ['all', ...uniqueGenres];
  }, []);

  const languages = useMemo(() => {
    const uniqueLanguages = [...new Set(booksData.map(book => book.language))];
    return ['all', ...uniqueLanguages];
  }, []);

  // Filter books
  const filteredBooks = useMemo(() => {
    return booksData.filter(book => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
      const matchesLanguage = selectedLanguage === 'all' || book.language === selectedLanguage;

      return matchesSearch && matchesGenre && matchesLanguage;
    });
  }, [searchTerm, selectedGenre, selectedLanguage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50/30 dark:from-gray-900 dark:via-primary-900 dark:to-primary-800 transition-colors">
      {/* Hero Section - Premium */}
      <div className="relative overflow-hidden">
        {/* Decorative gradient blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 md:pt-32 pb-16 md:pb-24">
          <div className="max-w-4xl mx-auto text-center space-y-10 animate-fade-in">
            {/* Premium badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200/50 dark:border-gray-700/50">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Biblioteca Digital Premium
              </span>
            </div>

            {/* Main heading */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-light text-gray-900 dark:text-white leading-tight tracking-tight">
                Descubra sua próxima
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent font-medium">
                  grande leitura
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
                Explore uma coleção cuidadosamente selecionada de livros digitais com a experiência de leitura que você merece
              </p>
            </div>

            {/* Search Bar - Enhanced */}
            <div className="max-w-2xl mx-auto space-y-5 pt-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-10 blur transition-opacity"></div>
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors z-10" />
                <input
                  type="text"
                  placeholder="Buscar livros, autores..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="relative w-full pl-14 pr-6 py-5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all text-lg shadow-xl hover:shadow-2xl font-light"
                />
              </div>

              {/* Filters - Elegant */}
              <div className="flex flex-wrap justify-center gap-3">
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="px-5 py-2.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-200/50 dark:border-gray-700/50 rounded-full text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all cursor-pointer font-medium shadow-lg hover:shadow-xl"
                >
                  <option value="all">Todos os gêneros</option>
                  {genres.filter(g => g !== 'all').map(genre => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="px-5 py-2.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-200/50 dark:border-gray-700/50 rounded-full text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all cursor-pointer font-medium shadow-lg hover:shadow-xl"
                >
                  <option value="all">Todos os idiomas</option>
                  {languages.filter(l => l !== 'all').map(lang => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Stats */}
            {filteredBooks.length > 0 && (
              <div className="flex items-center justify-center gap-3 text-sm text-gray-500 dark:text-gray-400 pt-4">
                <BookOpen className="w-4 h-4" />
                <span className="font-medium">
                  {filteredBooks.length} {filteredBooks.length === 1 ? 'livro encontrado' : 'livros encontrados'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Books Grid - Enhanced */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8">
            {filteredBooks.map((book, index) => (
              <div
                key={book.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <BookCard book={book} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 animate-fade-in">
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center shadow-xl">
              <Search className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-2xl font-serif font-light text-gray-600 dark:text-gray-400 mb-3">
              Nenhum livro encontrado
            </h3>
            <p className="text-gray-500 dark:text-gray-500 font-light">
              {searchTerm ? 'Tente buscar com outros termos' : 'Ajuste os filtros para ver mais resultados'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
