import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Search, Shield } from 'lucide-react';
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600 dark:border-gray-700 dark:border-t-blue-400"></div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Carregando biblioteca...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section - Minimalist Institutional */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-4xl">
            {/* Company Name */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-gray-900 dark:text-white mb-6">
              {company.brandName}
            </h1>

            {/* Description */}
            {company.description && (
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                {company.description}
              </p>
            )}

            {/* Stats */}
            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <span>
                {companyBooks.length} {companyBooks.length === 1 ? 'título' : 'títulos'}
              </span>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <span>Biblioteca Digital</span>
            </div>
          </div>
        </div>
      </div>

      {/* Books Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Search */}
        {companyBooks.length > 1 && (
          <div className="mb-10">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gray-900 dark:focus:border-gray-400 transition-colors"
              />
            </div>
          </div>
        )}

        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm ? 'Nenhum resultado encontrado' : 'Nenhum livro disponível'}
            </p>
          </div>
        )}
      </div>

      {/* Company Contact Footer */}
      {company.contact && (
        <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-6">
              Contato
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {company.contact.email && (
                <a
                  href={`mailto:${company.contact.email}`}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {company.contact.email}
                </a>
              )}

              {company.contact.phone && (
                <a
                  href={`tel:${company.contact.phone}`}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {company.contact.phone}
                </a>
              )}

              {company.contact.website && (
                <a
                  href={company.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Website
                </a>
              )}

              {company.contact.instagram && (
                <a
                  href={`https://instagram.com/${company.contact.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {company.contact.instagram}
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Admin Link - Discreto */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <Link
            to={`/admin/${company.slug}`}
            className="inline-flex items-center gap-2 text-xs text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
          >
            <Shield className="w-3.5 h-3.5" />
            Painel Administrativo
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompanyLibrary;
