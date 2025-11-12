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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 dark:border-gray-700 dark:border-t-blue-400"></div>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Carregando biblioteca...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 transition-colors">
      {/* Hero Section - Premium */}
      <div className="relative overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/4 -left-40 w-80 h-80 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400/20 dark:bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-8 pb-24">
          {/* Back Button - Enhanced */}
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center space-x-2 px-4 py-2 text-sm text-blue-700 dark:text-blue-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-800 transition-all mb-12 group shadow-lg hover:shadow-xl border border-blue-200 dark:border-blue-700"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">Catálogo Geral</span>
          </button>

          {/* Company Header - Premium Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left side - Company info */}
            <div className="space-y-8 animate-fade-in">
              {/* Company Logo */}
              {company.logo && (
                <div className="inline-block">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white dark:ring-gray-800 bg-white dark:bg-gray-800">
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Company name and description */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-gray-900 dark:text-white leading-tight">
                  {company.brandName}
                </h1>
                {company.description && (
                  <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light leading-relaxed">
                    {company.description}
                  </p>
                )}
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-gray-200 dark:border-gray-700">
                  <Library className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {companyBooks.length}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    {companyBooks.length === 1 ? 'Livro' : 'Livros'}
                  </div>
                </div>

                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-gray-200 dark:border-gray-700">
                  <Award className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    Premium
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    Qualidade
                  </div>
                </div>

                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-gray-200 dark:border-gray-700">
                  <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mb-2" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    100%
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    Digital
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Search */}
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {/* Featured badge */}
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg">
                <Library className="w-4 h-4" />
                <span className="text-sm font-semibold">Biblioteca Exclusiva</span>
              </div>

              {/* Search Bar - Premium */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors z-10" />
                  <input
                    type="text"
                    placeholder="Buscar por título ou autor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="relative w-full pl-14 pr-6 py-5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all shadow-xl text-lg font-medium"
                  />
                </div>
              </div>

              {/* Search hint */}
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium flex items-center space-x-2">
                <span>💡</span>
                <span>Dica: Use palavras-chave para encontrar o que procura</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Books Section - Enhanced */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        {filteredBooks.length > 0 ? (
          <>
            {/* Results count */}
            {searchTerm && (
              <div className="mb-10 text-center animate-slide-down">
                <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
                  <Search className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {filteredBooks.length} resultado{filteredBooks.length !== 1 ? 's' : ''} encontrado{filteredBooks.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            )}

            {/* Books Grid - Premium spacing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {filteredBooks.map((book, index) => (
                <div
                  key={book.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-32 animate-fade-in">
            <div className="inline-flex items-center justify-center w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 shadow-xl">
              <Search className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-2xl font-serif font-semibold text-gray-900 dark:text-white mb-3">
              {searchTerm ? 'Nenhum livro encontrado' : 'Nenhum livro disponível'}
            </h3>
            {searchTerm && (
              <p className="text-gray-600 dark:text-gray-400 font-medium max-w-md mx-auto">
                Tente buscar com outros termos ou explore nosso catálogo completo
              </p>
            )}
          </div>
        )}
      </div>

      {/* Company Contact Footer - Premium */}
      {company.contact && (
        <div className="relative border-t-2 border-gray-200 dark:border-gray-800">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white dark:from-transparent dark:via-gray-900/50 dark:to-gray-900"></div>

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-3">
                Entre em Contato
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Estamos sempre disponíveis para ajudar
              </p>
            </div>

            <div className="flex flex-wrap gap-6 justify-center">
              {company.contact.email && (
                <a
                  href={`mailto:${company.contact.email}`}
                  className="group flex items-center space-x-3 px-8 py-4 rounded-2xl bg-white dark:bg-gray-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 transition-all shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 group-hover:bg-blue-600 transition-colors">
                    <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {company.contact.email}
                  </span>
                </a>
              )}

              {company.contact.phone && (
                <a
                  href={`tel:${company.contact.phone}`}
                  className="group flex items-center space-x-3 px-8 py-4 rounded-2xl bg-white dark:bg-gray-800 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-green-900/20 dark:hover:to-emerald-900/20 transition-all shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 group-hover:bg-green-600 transition-colors">
                    <Phone className="w-5 h-5 text-green-600 dark:text-green-400 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {company.contact.phone}
                  </span>
                </a>
              )}

              {company.contact.website && (
                <a
                  href={company.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-3 px-8 py-4 rounded-2xl bg-white dark:bg-gray-800 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/20 dark:hover:to-pink-900/20 transition-all shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 group-hover:bg-purple-600 transition-colors">
                    <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    Visitar site
                  </span>
                </a>
              )}

              {company.contact.instagram && (
                <a
                  href={`https://instagram.com/${company.contact.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-3 px-8 py-4 rounded-2xl bg-white dark:bg-gray-800 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 dark:hover:from-pink-900/20 dark:hover:to-rose-900/20 transition-all shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/30 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all">
                    <Instagram className="w-5 h-5 text-pink-600 dark:text-pink-400 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
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
