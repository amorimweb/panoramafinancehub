import React from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="bg-gradient-dark min-vh-100">
      {/* Header */}
      <Header />
      
      {/* Main Content Area */}
      <MainContent />
    </div>
  );
}

export default App; 