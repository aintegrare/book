import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, BookOpen, Mail, Phone, Globe, Instagram, Library, Award, Users } from 'lucide-react';
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
      {/* Navigation Bar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Catálogo</span>
          </button>
        </div>
      </div>

      {/* Hero Section - Clean Material Design */}
      <div className="bg-white dark:bg-gray-800 border-b-2 border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid lg:grid-cols-[2fr,1fr] gap-16 items-start">
            {/* Left side - Company info */}
            <div className="space-y-8">
              {/* Company Logo & Name */}
              <div className="flex items-start space-x-6">
                {company.logo && (
                  <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="flex-1 min-w-0 pt-1">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 dark:text-white leading-tight mb-2">
                    {company.brandName}
                  </h1>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 dark:text-gray-400 mt-3">
                    <div className="flex items-center space-x-1.5">
                      <Library className="w-4 h-4" />
                      <span className="font-medium">
                        {companyBooks.length} {companyBooks.length === 1 ? 'título' : 'títulos'}
                      </span>
                    </div>
                    <span className="text-gray-300 dark:text-gray-600">•</span>
                    <div className="flex items-center space-x-1.5">
                      <BookOpen className="w-4 h-4" />
                      <span>Biblioteca Digital</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company description */}
              {company.description && (
                <div className="max-w-3xl">
                  <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {company.description}
                  </p>
                </div>
              )}
            </div>

            {/* Right side - Search */}
            <div className="lg:pt-1">
              <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Pesquisar na biblioteca
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Título, autor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all shadow-sm"
                  />
                </div>
                {searchTerm && (
                  <p className="mt-3 text-xs text-gray-600 dark:text-gray-400">
                    {filteredBooks.length} resultado{filteredBooks.length !== 1 ? 's' : ''} encontrado{filteredBooks.length !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Books Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <Search className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {searchTerm ? 'Nenhum livro encontrado' : 'Nenhum livro disponível'}
            </h3>
            {searchTerm && (
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Tente buscar com outros termos ou explore nosso catálogo completo
              </p>
            )}
          </div>
        )}
      </div>

      {/* Company Contact Footer */}
      {company.contact && (
        <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Contato
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Entre em contato conosco
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {company.contact.email && (
                <a
                  href={`mailto:${company.contact.email}`}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600"
                >
                  <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                  <span className="text-sm text-gray-900 dark:text-white truncate">
                    {company.contact.email}
                  </span>
                </a>
              )}

              {company.contact.phone && (
                <a
                  href={`tel:${company.contact.phone}`}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600"
                >
                  <Phone className="w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                  <span className="text-sm text-gray-900 dark:text-white">
                    {company.contact.phone}
                  </span>
                </a>
              )}

              {company.contact.website && (
                <a
                  href={company.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600"
                >
                  <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                  <span className="text-sm text-gray-900 dark:text-white">
                    Visitar site
                  </span>
                </a>
              )}

              {company.contact.instagram && (
                <a
                  href={`https://instagram.com/${company.contact.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600"
                >
                  <Instagram className="w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                  <span className="text-sm text-gray-900 dark:text-white">
                    {company.contact.instagram}
                  </span>
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
