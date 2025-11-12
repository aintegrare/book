import { useState } from 'react';
import { X, Link2, Copy, Check, Clock, AlertCircle } from 'lucide-react';
import { createShareToken } from '../utils/shareTokens';
import { useCompany } from '../contexts/CompanyContext';

const ShareLinkModal = ({ book, onClose }) => {
  const { currentCompany } = useCompany();
  const [expirationHours, setExpirationHours] = useState(72); // 3 dias padrão
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const expirationOptions = [
    { label: '24 horas', hours: 24 },
    { label: '3 dias', hours: 72 },
    { label: '7 dias', hours: 168 },
    { label: '30 dias', hours: 720 }
  ];

  const generateLink = () => {
    const companySlug = currentCompany?.slug || null;
    const token = createShareToken(book.id, expirationHours, companySlug);
    const url = `${window.location.origin}/share/${token}`;
    setGeneratedLink(url);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const formatExpirationTime = () => {
    if (expirationHours < 24) {
      return `${expirationHours} hora${expirationHours > 1 ? 's' : ''}`;
    } else if (expirationHours < 168) {
      const days = Math.floor(expirationHours / 24);
      return `${days} dia${days > 1 ? 's' : ''}`;
    } else {
      const days = Math.floor(expirationHours / 24);
      return `${days} dias`;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <Link2 className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
            Compartilhar Ebook
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 space-y-6">
          {/* Book Info */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h4 className="font-serif font-semibold text-gray-900 dark:text-white text-sm mb-1">
              {book.title}
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {book.author}
            </p>
          </div>

          {/* Expiration Selection */}
          {!generatedLink && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Tempo de validade do link
              </label>
              <div className="grid grid-cols-2 gap-2">
                {expirationOptions.map(option => (
                  <button
                    key={option.hours}
                    onClick={() => setExpirationHours(option.hours)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      expirationHours === option.hours
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Info Alert */}
          <div className="flex gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800 dark:text-blue-300">
              <p className="font-medium mb-1">Acesso temporário e isolado</p>
              <p className="text-blue-700 dark:text-blue-400">
                Quem receber este link terá acesso apenas a este ebook, sem poder navegar para outras páginas.
                O link expira automaticamente após {formatExpirationTime()}.
              </p>
            </div>
          </div>

          {/* Generated Link */}
          {generatedLink && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Link gerado
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={generatedLink}
                  readOnly
                  className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white font-mono"
                  onClick={(e) => e.target.select()}
                />
                <button
                  onClick={copyToClipboard}
                  className={`px-4 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-all ${
                    copied
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-800 dark:hover:bg-gray-600'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copiar
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Este link expira em {formatExpirationTime()}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
          {!generatedLink ? (
            <>
              <button
                onClick={onClose}
                className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={generateLink}
                className="px-5 py-2.5 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Link2 className="w-4 h-4" />
                Gerar Link
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Fechar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareLinkModal;
