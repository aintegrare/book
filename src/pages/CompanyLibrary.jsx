import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, BookOpen, Mail, Phone, Globe, Instagram } from 'lucide-react';
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
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-primary-900 dark:via-primary-800 dark:to-primary-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600 dark:border-primary-700 dark:border-t-primary-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-primary-900 dark:via-primary-800 dark:to-primary-900 transition-colors">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-8 pb-20">
          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center space-x-2 text-sm text-primary-600 dark:text-primary-300 hover:text-primary-900 dark:hover:text-white transition-colors mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Catálogo Geral</span>
          </button>

          {/* Company Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-12">
            {/* Company Logo */}
            {company.logo && (
              <div className="flex-shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white dark:ring-primary-700">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Company Info */}
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-primary-900 dark:text-white mb-4 tracking-tight">
                {company.brandName}
              </h1>
              {company.description && (
                <p className="text-lg md:text-xl text-primary-600 dark:text-primary-300 font-light max-w-3xl leading-relaxed">
                  {company.description}
                </p>
              )}

              {/* Stats */}
              <div className="flex items-center gap-6 mt-6">
                <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400">
                  <BookOpen className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {companyBooks.length} {companyBooks.length === 1 ? 'livro' : 'livros'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-primary-400 dark:text-primary-500 w-5 h-5 group-focus-within:text-accent-500 transition-colors" />
              <input
                type="text"
                placeholder="Buscar por título ou autor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-white dark:bg-primary-800 border-2 border-primary-100 dark:border-primary-700 rounded-2xl text-primary-900 dark:text-white placeholder-primary-400 dark:placeholder-primary-500 focus:outline-none focus:border-accent-400 dark:focus:border-accent-500 focus:ring-4 focus:ring-accent-100 dark:focus:ring-accent-900/30 transition-all shadow-lg hover:shadow-xl font-light"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Books Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        {filteredBooks.length > 0 ? (
          <>
            <div className="mb-8 text-center">
              <p className="text-sm text-primary-500 dark:text-primary-400 font-medium">
                {searchTerm && `${filteredBooks.length} resultado${filteredBooks.length !== 1 ? 's' : ''} encontrado${filteredBooks.length !== 1 ? 's' : ''}`}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {filteredBooks.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-24">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center">
              <Search className="w-10 h-10 text-primary-400 dark:text-primary-500" />
            </div>
            <p className="text-xl text-primary-600 dark:text-primary-400 font-light mb-2">
              {searchTerm ? 'Nenhum livro encontrado' : 'Nenhum livro disponível'}
            </p>
            {searchTerm && (
              <p className="text-sm text-primary-500 dark:text-primary-500">
                Tente buscar por outro termo
              </p>
            )}
          </div>
        )}
      </div>

      {/* Company Contact Footer */}
      {company.contact && (
        <div className="border-t-2 border-primary-100 dark:border-primary-800 bg-white/50 dark:bg-primary-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <h3 className="text-center text-sm font-semibold text-primary-900 dark:text-white uppercase tracking-wider mb-6">
              Entre em Contato
            </h3>
            <div className="flex flex-wrap gap-8 justify-center">
              {company.contact.email && (
                <a
                  href={`mailto:${company.contact.email}`}
                  className="flex items-center gap-3 px-6 py-3 rounded-xl bg-primary-50 dark:bg-primary-800 hover:bg-primary-100 dark:hover:bg-primary-700 transition-all group"
                >
                  <Mail className="w-5 h-5 text-primary-600 dark:text-primary-300 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors" />
                  <span className="text-sm text-primary-700 dark:text-primary-200">
                    {company.contact.email}
                  </span>
                </a>
              )}

              {company.contact.phone && (
                <a
                  href={`tel:${company.contact.phone}`}
                  className="flex items-center gap-3 px-6 py-3 rounded-xl bg-primary-50 dark:bg-primary-800 hover:bg-primary-100 dark:hover:bg-primary-700 transition-all group"
                >
                  <Phone className="w-5 h-5 text-primary-600 dark:text-primary-300 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors" />
                  <span className="text-sm text-primary-700 dark:text-primary-200">
                    {company.contact.phone}
                  </span>
                </a>
              )}

              {company.contact.website && (
                <a
                  href={company.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 rounded-xl bg-primary-50 dark:bg-primary-800 hover:bg-primary-100 dark:hover:bg-primary-700 transition-all group"
                >
                  <Globe className="w-5 h-5 text-primary-600 dark:text-primary-300 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors" />
                  <span className="text-sm text-primary-700 dark:text-primary-200">
                    Visitar site
                  </span>
                </a>
              )}

              {company.contact.instagram && (
                <a
                  href={`https://instagram.com/${company.contact.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 rounded-xl bg-primary-50 dark:bg-primary-800 hover:bg-primary-100 dark:hover:bg-primary-700 transition-all group"
                >
                  <Instagram className="w-5 h-5 text-primary-600 dark:text-primary-300 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors" />
                  <span className="text-sm text-primary-700 dark:text-primary-200">
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
