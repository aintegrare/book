import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { BookProvider } from './contexts/BookContext';
import { CompanyProvider } from './contexts/CompanyContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Access from './pages/Access';
import BookReader from './pages/BookReader';
import SharedBookReader from './pages/SharedBookReader';
import CompanyAdmin from './pages/CompanyAdmin';
import CompaniesShowcase from './pages/CompaniesShowcase';
import CompanyLibrary from './pages/CompanyLibrary';

function App() {
  return (
    <ThemeProvider>
      <BookProvider>
        <CompanyProvider>
          <BrowserRouter>
            <div className="min-h-screen">
              <Routes>
                {/* Routes without Navbar (Readers & Admin) */}
                <Route path="/read/:bookId" element={<BookReader />} />
                <Route path="/share/:token" element={<SharedBookReader />} />
                <Route path="/admin/:slug" element={<CompanyAdmin />} />

                {/* Routes with Navbar */}
                <Route
                  path="/*"
                  element={
                    <>
                      <Navbar />
                      <Routes>
                        <Route path="/" element={<CompaniesShowcase />} />
                        <Route path="/catalogo" element={<Home />} />
                        <Route path="/empresa/:slug" element={<CompanyLibrary />} />
                        <Route path="/access" element={<Access />} />
                      </Routes>
                    </>
                  }
                />
              </Routes>
            </div>
          </BrowserRouter>
        </CompanyProvider>
      </BookProvider>
    </ThemeProvider>
  );
}

export default App;
