import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cursos from './pages/Cursos';
import Perfil from './pages/Perfil';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const AppContent = () => {
  const { isDarkMode, colors } = useTheme();
  
  return (
    <div 
      className={`min-vh-100 d-flex flex-column ${isDarkMode ? 'bg-gradient-dark' : 'bg-gradient-light'}`}
      style={{ 
        background: colors.background,
        transition: 'all 0.3s ease'
      }}
    >
      {/* Header */}
      <Header />
      
      {/* Routes */}
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App; 