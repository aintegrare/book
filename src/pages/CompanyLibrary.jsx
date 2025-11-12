import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, ArrowLeft } from 'lucide-react';
import BookCard from '../components/BookCard';
import { useCompany } from '../contexts/CompanyContext';
import companiesData from '../data/companies.json';
import booksData from '../data/books.json';

const CompanyLibrary = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { setCurrentCompany } = useCompany();
  const [searchTerm, setSearchTerm] = useState('');
  const [company, setCompany] = useState(null);

  // Load company data
  useEffect(() => {
    const foundCompany = companiesData.find(c => c.slug === slug);
    if (!foundCompany) {
      navigate('/');
      return;
    }
    setCompany(foundCompany);
    setCurrentCompany(foundCompany);

    // Cleanup: reset company when leaving
    return () => setCurrentCompany(null);
  }, [slug, navigate, setCurrentCompany]);

  // Get company books
  const companyBooks = useMemo(() => {
    if (!company) return [];
    return booksData.filter(book => company.books.includes(book.code));
  }, [company]);

  // Filter books by search
  const filteredBooks = useMemo(() => {
    return companyBooks.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [companyBooks, searchTerm]);

  if (!company) {
    return (
      <div className="min-h-screen bg-white dark:bg-primary-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-primary-900 transition-colors">
      {/* Company Header */}
      <div className="border-b border-primary-100 dark:border-primary-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex items-start justify-between mb-8">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-sm text-primary-500 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar ao catálogo geral</span>
            </button>
          </div>

          <div className="flex items-center space-x-6">
            {/* Company Logo */}
            {company.logo && (
              <img
                src={company.logo}
                alt={company.name}
                className="w-20 h-20 rounded-lg object-cover shadow-material-2"
              />
            )}

            {/* Company Info */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-serif font-light text-primary-900 dark:text-white mb-2">
                {company.brandName}
              </h1>
              {company.description && (
                <p className="text-base text-primary-600 dark:text-primary-300 font-light max-w-2xl">
                  {company.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-8">
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-400 dark:text-primary-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar livros..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-primary-50 dark:bg-primary-800 border-0 rounded-full text-primary-900 dark:text-white placeholder-primary-400 dark:placeholder-primary-500 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all font-light"
            />
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        {filteredBooks.length > 0 ? (
          <>
            <p className="text-sm text-primary-500 dark:text-primary-400 mb-6 text-center font-light">
              {filteredBooks.length} {filteredBooks.length === 1 ? 'livro disponível' : 'livros disponíveis'}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
              {filteredBooks.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-primary-400 dark:text-primary-500 text-base font-light">
              {searchTerm ? 'Nenhum livro encontrado' : 'Nenhum livro disponível no momento'}
            </p>
          </div>
        )}
      </div>

      {/* Company Contact Info */}
      {company.contact && (
        <div className="border-t border-primary-100 dark:border-primary-800">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
            <div className="flex flex-wrap gap-6 justify-center text-sm text-primary-500 dark:text-primary-400">
              {company.contact.email && (
                <a
                  href={`mailto:${company.contact.email}`}
                  className="hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                >
                  {company.contact.email}
                </a>
              )}
              {company.contact.phone && (
                <a
                  href={`tel:${company.contact.phone}`}
                  className="hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                >
                  {company.contact.phone}
                </a>
              )}
              {company.contact.website && (
                <a
                  href={company.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                >
                  Visitar site
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyLibrary;
