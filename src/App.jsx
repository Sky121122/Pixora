import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import MascotLibrary from './pages/MascotLibrary';
import Documentation from './pages/Documentation';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname]);

  return null;
}


function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mascots" element={<MascotLibrary />} />
        <Route path="/docs" element={<Documentation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;