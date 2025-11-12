// Sistema de gerenciamento de tokens de compartilhamento temporários

const STORAGE_KEY = 'bookShareTokens';

/**
 * Gera um token único
 */
export const generateToken = () => {
  return Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15) +
         Date.now().toString(36);
};

/**
 * Cria um token de compartilhamento para um ebook
 * @param {string} bookId - ID do livro
 * @param {number} expirationHours - Horas até expiração (padrão: 72h)
 * @returns {string} - Token gerado
 */
export const createShareToken = (bookId, expirationHours = 72) => {
  const token = generateToken();
  const expiresAt = Date.now() + (expirationHours * 60 * 60 * 1000);

  const tokens = getTokens();
  tokens[token] = {
    bookId,
    expiresAt,
    createdAt: Date.now()
  };

  saveTokens(tokens);
  return token;
};

/**
 * Valida um token e retorna o bookId se válido
 * @param {string} token - Token para validar
 * @returns {string|null} - bookId se válido, null se inválido ou expirado
 */
export const validateToken = (token) => {
  const tokens = getTokens();
  const tokenData = tokens[token];

  if (!tokenData) {
    return null;
  }

  // Verifica se expirou
  if (Date.now() > tokenData.expiresAt) {
    // Remove token expirado
    delete tokens[token];
    saveTokens(tokens);
    return null;
  }

  return tokenData.bookId;
};

/**
 * Obtém todos os tokens
 */
const getTokens = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error reading share tokens:', error);
    return {};
  }
};

/**
 * Salva tokens
 */
const saveTokens = (tokens) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
  } catch (error) {
    console.error('Error saving share tokens:', error);
  }
};

/**
 * Remove tokens expirados
 */
export const cleanExpiredTokens = () => {
  const tokens = getTokens();
  const now = Date.now();
  let hasChanges = false;

  Object.keys(tokens).forEach(token => {
    if (now > tokens[token].expiresAt) {
      delete tokens[token];
      hasChanges = true;
    }
  });

  if (hasChanges) {
    saveTokens(tokens);
  }
};

/**
 * Obtém informações sobre um token (sem validar)
 */
export const getTokenInfo = (token) => {
  const tokens = getTokens();
  return tokens[token] || null;
};

/**
 * Revoga um token
 */
export const revokeToken = (token) => {
  const tokens = getTokens();
  delete tokens[token];
  saveTokens(tokens);
};

/**
 * Lista todos os tokens ativos de um livro
 */
export const getBookTokens = (bookId) => {
  const tokens = getTokens();
  const now = Date.now();

  return Object.entries(tokens)
    .filter(([_, data]) => data.bookId === bookId && now <= data.expiresAt)
    .map(([token, data]) => ({ token, ...data }));
};
