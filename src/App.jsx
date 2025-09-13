import React from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import WebSocketProvider from './components/WebSocketProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <WebSocketProvider>
      <div className="bg-gradient-dark min-vh-100">
        {/* Header */}
        <Header />
        
        {/* Main Content Area */}
        <MainContent />
      </div>
    </WebSocketProvider>
  );
}

export default App; 