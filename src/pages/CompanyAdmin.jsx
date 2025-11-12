import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  LogOut,
  Shield,
  Link2,
  Trash2,
  Copy,
  Check,
  BookOpen,
  BarChart3,
  Clock,
  Eye,
  AlertCircle,
  Lock
} from 'lucide-react';
import companiesData from '../data/companies.json';
import booksData from '../data/books.json';
import {
  getCompanyTokens,
  getCompanyTokenStats,
  revokeToken,
  cleanExpiredTokens
} from '../utils/shareTokens';
import {
  isAdminAuthenticated,
  loginAdmin,
  logoutAdmin
} from '../utils/adminAuth';
import Toast from '../components/Toast';

const CompanyAdmin = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [company, setCompany] = useState(null);
  const [tokens, setTokens] = useState([]);
  const [stats, setStats] = useState(null);
  const [toast, setToast] = useState(null);
  const [copiedToken, setCopiedToken] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all'); // all, active, expired

  useEffect(() => {
    // Verificar se empresa existe
    const foundCompany = companiesData.find(c => c.slug === slug);
    if (!foundCompany) {
      navigate('/');
      return;
    }
    setCompany(foundCompany);

    // Verificar autenticação
    if (isAdminAuthenticated(slug)) {
      setIsAuthenticated(true);
      loadData();
    }
  }, [slug, navigate]);

  const loadData = () => {
    cleanExpiredTokens();
    const companyTokens = getCompanyTokens(slug, false);
    setTokens(companyTokens);

    const companyStats = getCompanyTokenStats(slug);
    setStats(companyStats);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginAdmin(slug, password)) {
      setIsAuthenticated(true);
      setLoginError('');
      loadData();
    } else {
      setLoginError('Senha incorreta');
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
    setPassword('');
  };

  const handleRevokeToken = (token) => {
    if (window.confirm('Tem certeza que deseja revogar este link? Ele não poderá mais ser acessado.')) {
      revokeToken(token);
      loadData();
      showToast('Link revogado com sucesso', 'success');
    }
  };

  const copyTokenLink = async (token) => {
    const url = `${window.location.origin}/share/${token}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedToken(token);
      setTimeout(() => setCopiedToken(null), 2000);
      showToast('Link copiado', 'success');
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTimeRemaining = (expiresAt) => {
    const now = Date.now();
    const diff = expiresAt - now;

    if (diff <= 0) return 'Expirado';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  const getBookById = (bookId) => {
    return booksData.find(b => b.id === bookId);
  };

  const filteredTokens = tokens.filter(token => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'active') return token.status === 'active';
    if (filterStatus === 'expired') return token.status === 'expired';
    return true;
  });

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-6">
        <div className="max-w-md w-full">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Painel Administrativo
              </h1>
              {company && (
                <p className="text-gray-600 dark:text-gray-400">
                  {company.brandName}
                </p>
              )}
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Senha de Administrador
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white"
                    placeholder="Digite a senha"
                    required
                  />
                </div>
                {loginError && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {loginError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Entrar
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                Acesso restrito a administradores da empresa
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <Shield className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                Painel Administrativo
              </h1>
              {company && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {company.brandName}
                </p>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total de Links</span>
                <Link2 className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.total}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-green-200 dark:border-green-800 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-green-600 dark:text-green-400">Links Ativos</span>
                <Clock className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {stats.active}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-red-200 dark:border-red-800 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-red-600 dark:text-red-400">Links Expirados</span>
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
              <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                {stats.expired}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-800 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-blue-600 dark:text-blue-400">Total Acessos</span>
                <Eye className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {stats.totalAccesses}
              </div>
            </div>
          </div>
        )}

        {/* Tokens Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Links de Compartilhamento
              </h2>

              {/* Filter Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    filterStatus === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setFilterStatus('active')}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    filterStatus === 'active'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Ativos
                </button>
                <button
                  onClick={() => setFilterStatus('expired')}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    filterStatus === 'expired'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Expirados
                </button>
              </div>
            </div>
          </div>

          {filteredTokens.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <Link2 className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                Nenhum link de compartilhamento encontrado
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Ebook
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Criado em
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Expira em
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Acessos
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredTokens.map((tokenData) => {
                    const book = getBookById(tokenData.bookId);
                    return (
                      <tr key={tokenData.token} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <BookOpen className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                                {book?.title || 'Livro não encontrado'}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {book?.author}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(tokenData.createdAt)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(tokenData.expiresAt)}
                        </td>
                        <td className="px-6 py-4">
                          {tokenData.status === 'active' ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded-full">
                              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                              Ativo ({formatTimeRemaining(tokenData.expiresAt)})
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-medium rounded-full">
                              <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                              Expirado
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Eye className="w-4 h-4" />
                            {tokenData.accessCount || 0}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {tokenData.status === 'active' && (
                              <button
                                onClick={() => copyTokenLink(tokenData.token)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                                title="Copiar link"
                              >
                                {copiedToken === tokenData.token ? (
                                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                                ) : (
                                  <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                )}
                              </button>
                            )}
                            {tokenData.status === 'active' && (
                              <button
                                onClick={() => handleRevokeToken(tokenData.token)}
                                className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                title="Revogar link"
                              >
                                <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800 dark:text-blue-300">
              <p className="font-medium mb-1">Sobre o Painel Administrativo</p>
              <p>
                Aqui você pode gerenciar todos os links de compartilhamento gerados para os ebooks da sua empresa.
                Links ativos podem ser revogados a qualquer momento, impedindo novos acessos. Estatísticas de acesso
                são atualizadas em tempo real.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyAdmin;
