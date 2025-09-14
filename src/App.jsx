import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import Header from './components/Header';
import Home from './pages/Home';
import Cursos from './pages/Cursos';
import Perfil from './pages/Perfil';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const AppContent = () => {
  const { isDarkMode, colors } = useTheme();
  
  return (
    <div 
      className={`min-vh-100 ${isDarkMode ? 'bg-gradient-dark' : 'bg-gradient-light'}`}
      style={{ 
        background: colors.background,
        transition: 'all 0.3s ease'
      }}
    >
      {/* Header */}
      <Header />
      
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
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