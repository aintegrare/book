// Sistema de autenticação simples para painel administrativo

const ADMIN_SESSION_KEY = 'adminSession';

/**
 * Verifica se o admin está autenticado para uma empresa
 * @param {string} companySlug - Slug da empresa
 * @returns {boolean}
 */
export const isAdminAuthenticated = (companySlug) => {
  try {
    const session = localStorage.getItem(ADMIN_SESSION_KEY);
    if (!session) return false;

    const data = JSON.parse(session);
    if (data.companySlug !== companySlug) return false;

    // Verifica se a sessão expirou (24 horas)
    const now = Date.now();
    if (now > data.expiresAt) {
      logoutAdmin();
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error checking admin auth:', error);
    return false;
  }
};

/**
 * Realiza login do admin
 * @param {string} companySlug - Slug da empresa
 * @param {string} password - Senha
 * @returns {boolean} - true se login bem-sucedido
 */
export const loginAdmin = (companySlug, password) => {
  // Senhas hardcoded por empresa (em produção, usar backend)
  const adminPasswords = {
    'resolucao-360': 'admin360',
    // Adicionar mais empresas aqui
  };

  if (adminPasswords[companySlug] === password) {
    const expiresAt = Date.now() + (24 * 60 * 60 * 1000); // 24 horas

    const sessionData = {
      companySlug,
      expiresAt,
      loginAt: Date.now()
    };

    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(sessionData));
    return true;
  }

  return false;
};

/**
 * Realiza logout do admin
 */
export const logoutAdmin = () => {
  localStorage.removeItem(ADMIN_SESSION_KEY);
};

/**
 * Obtém dados da sessão atual
 * @returns {object|null}
 */
export const getAdminSession = () => {
  try {
    const session = localStorage.getItem(ADMIN_SESSION_KEY);
    return session ? JSON.parse(session) : null;
  } catch (error) {
    console.error('Error getting admin session:', error);
    return null;
  }
};

/**
 * Renova a sessão do admin (estende por mais 24h)
 */
export const renewAdminSession = () => {
  const session = getAdminSession();
  if (!session) return false;

  const expiresAt = Date.now() + (24 * 60 * 60 * 1000);
  session.expiresAt = expiresAt;

  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
  return true;
};
