import { Link } from 'react-router-dom';
import { ArrowRight, Building2 } from 'lucide-react';
import companiesData from '../data/companies.json';

const CompaniesShowcase = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-primary-900 transition-colors">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl font-serif font-light text-primary-900 dark:text-white">
            Bibliotecas Corporativas
          </h1>
          <p className="text-lg text-primary-600 dark:text-primary-300 font-light">
            Acervos digitais exclusivos para empresas e organizações
          </p>
        </div>
      </div>

      {/* Companies Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companiesData.map(company => (
            <Link
              key={company.id}
              to={`/empresa/${company.slug}`}
              className="group block bg-white dark:bg-primary-800 rounded-lg p-8 shadow-material-1 hover:shadow-material-3 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Company Logo */}
              <div className="flex items-center space-x-4 mb-6">
                {company.logo ? (
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-16 h-16 rounded-lg object-cover shadow-material-1"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-primary-100 dark:bg-primary-700 flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-primary-600 dark:text-primary-300" />
                  </div>
                )}

                <div className="flex-1">
                  <h2 className="text-xl font-body font-medium text-primary-900 dark:text-white">
                    {company.name}
                  </h2>
                  <p className="text-sm text-primary-500 dark:text-primary-400 font-light">
                    {company.brandName}
                  </p>
                </div>
              </div>

              {/* Description */}
              {company.description && (
                <p className="text-sm text-primary-600 dark:text-primary-300 font-light line-clamp-3 mb-6">
                  {company.description}
                </p>
              )}

              {/* Books Count */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-primary-500 dark:text-primary-400 font-light">
                  {company.books.length} {company.books.length === 1 ? 'livro' : 'livros'}
                </span>

                <div className="flex items-center space-x-2 text-accent-600 dark:text-accent-400 group-hover:translate-x-1 transition-transform">
                  <span className="text-sm font-medium">Acessar</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="border-t border-primary-100 dark:border-primary-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h3 className="text-2xl font-serif font-light text-primary-900 dark:text-white">
              Para Empresas
            </h3>
            <p className="text-base text-primary-600 dark:text-primary-300 font-light">
              Crie sua própria biblioteca digital corporativa com a identidade visual da sua marca.
              Compartilhe conhecimento de forma segura e elegante com seus colaboradores e parceiros.
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-sm">
              <div className="px-6 py-3 bg-primary-50 dark:bg-primary-800 rounded-full">
                <span className="text-primary-700 dark:text-primary-300">Marca personalizada</span>
              </div>
              <div className="px-6 py-3 bg-primary-50 dark:bg-primary-800 rounded-full">
                <span className="text-primary-700 dark:text-primary-300">Acesso por código</span>
              </div>
              <div className="px-6 py-3 bg-primary-50 dark:bg-primary-800 rounded-full">
                <span className="text-primary-700 dark:text-primary-300">Design minimalista</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompaniesShowcase;
