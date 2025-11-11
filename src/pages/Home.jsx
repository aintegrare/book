import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
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
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
      const matchesLanguage = selectedLanguage === 'all' || book.language === selectedLanguage;

      return matchesSearch && matchesGenre && matchesLanguage;
    });
  }, [searchTerm, selectedGenre, selectedLanguage]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Bem-vindo à BiblioTech
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl">
            Uma biblioteca digital moderna. Leia seus livros favoritos diretamente no navegador.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="card space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por título, autor ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Filtros:
              </span>
            </div>

            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="input py-2 w-auto"
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>
                  {genre === 'all' ? 'Todos os Gêneros' : genre}
                </option>
              ))}
            </select>

            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="input py-2 w-auto"
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>
                  {lang === 'all' ? 'Todos os Idiomas' : lang}
                </option>
              ))}
            </select>
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {filteredBooks.length} {filteredBooks.length === 1 ? 'livro encontrado' : 'livros encontrados'}
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Nenhum livro encontrado com os filtros selecionados.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
