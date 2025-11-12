import { createContext, useContext, useState, useEffect } from 'react';

const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
  const [currentCompany, setCurrentCompany] = useState(null);

  // Apply company theme colors to CSS variables
  useEffect(() => {
    if (currentCompany?.colors) {
      const root = document.documentElement;

      // Set CSS custom properties for primary colors
      Object.entries(currentCompany.colors.primary).forEach(([shade, color]) => {
        root.style.setProperty(`--color-primary-${shade}`, color);
      });

      // Set CSS custom properties for accent colors
      Object.entries(currentCompany.colors.accent).forEach(([shade, color]) => {
        root.style.setProperty(`--color-accent-${shade}`, color);
      });
    } else {
      // Reset to default colors
      const root = document.documentElement;
      root.style.removeProperty('--color-primary-500');
      root.style.removeProperty('--color-accent-500');
    }
  }, [currentCompany]);

  const value = {
    currentCompany,
    setCurrentCompany,
  };

  return (
    <CompanyContext.Provider value={value}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within CompanyProvider');
  }
  return context;
};
