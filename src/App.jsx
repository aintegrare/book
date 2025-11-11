import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { BookProvider } from './contexts/BookContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Access from './pages/Access';
import BookReader from './pages/BookReader';

function App() {
  return (
    <ThemeProvider>
      <BookProvider>
        <BrowserRouter>
          <div className="min-h-screen">
            <Routes>
              {/* Routes without Navbar (Reader) */}
              <Route path="/read/:bookId" element={<BookReader />} />

              {/* Routes with Navbar */}
              <Route
                path="/*"
                element={
                  <>
                    <Navbar />
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/access" element={<Access />} />
                    </Routes>
                  </>
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
      </BookProvider>
    </ThemeProvider>
  );
}

export default App;
