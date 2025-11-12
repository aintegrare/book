import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
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
    <div className="min-h-screen bg-white dark:bg-primary-900 transition-colors">
      {/* Header - Minimal */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-12">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Search Bar - Prominent */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-400 dark:text-primary-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar livros..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-primary-50 dark:bg-primary-800 border-0 rounded-full text-primary-900 dark:text-white placeholder-primary-400 dark:placeholder-primary-500 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all text-lg font-light"
            />
          </div>

          {/* Filters - Subtle */}
          <div className="flex justify-center gap-3">
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="px-4 py-2 bg-transparent border border-primary-200 dark:border-primary-700 rounded-full text-sm text-primary-700 dark:text-primary-300 focus:outline-none focus:border-accent-500 transition-colors cursor-pointer"
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>
                  {genre === 'all' ? 'Gênero' : genre}
                </option>
              ))}
            </select>

            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-4 py-2 bg-transparent border border-primary-200 dark:border-primary-700 rounded-full text-sm text-primary-700 dark:text-primary-300 focus:outline-none focus:border-accent-500 transition-colors cursor-pointer"
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>
                  {lang === 'all' ? 'Idioma' : lang}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Books Grid - Generous spacing */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
            {filteredBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-primary-400 dark:text-primary-500 text-base font-light">
              Nenhum livro encontrado
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
