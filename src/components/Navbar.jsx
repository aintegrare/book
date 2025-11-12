import { Link } from 'react-router-dom';
import { Moon, Sun, Lock } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-primary-900 shadow-material-2 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Typography only, minimal */}
          <Link
            to="/"
            className="font-serif text-2xl font-light text-primary-900 dark:text-white tracking-wide hover:text-accent-600 dark:hover:text-accent-400 transition-colors duration-200"
          >
            Bibliotecnologia
          </Link>

          {/* Actions - Icons only */}
          <div className="flex items-center space-x-2">
            <Link
              to="/access"
              className="p-2.5 rounded-full hover:bg-primary-50 dark:hover:bg-primary-800 transition-colors duration-200 group"
              aria-label="Acessar com código"
            >
              <Lock className="w-5 h-5 text-primary-700 dark:text-primary-200 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors" />
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-primary-50 dark:hover:bg-primary-800 transition-colors duration-200 group"
              aria-label="Alternar tema"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-accent-400 group-hover:text-accent-500 transition-colors" />
              ) : (
                <Moon className="w-5 h-5 text-primary-700 group-hover:text-primary-900 transition-colors" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
