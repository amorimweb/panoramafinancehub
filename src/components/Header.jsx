import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
  const location = useLocation();
  const { isDarkMode, toggleTheme, colors } = useTheme();
  
  return (
    <Navbar 
      expand="lg" 
      className="px-2 px-md-4 py-3 py-md-4 shadow-2xl"
      style={{ 
        background: colors.background,
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${colors.border}`,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 50px rgba(249, 115, 22, 0.1)',
        position: 'relative',
        zIndex: 1000,
        transition: 'all 0.3s ease'
      }}
    >
      <Container fluid>
        {/* Logo e Brand */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center responsive-brand">
          <div className="d-flex align-items-center responsive-logo-container">
            <div 
              className="rounded-4 d-flex align-items-center justify-content-center me-4 shadow-2xl" 
              style={{
                width: '56px', 
                height: '56px',
                background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.9) 0%, rgba(234, 88, 12, 0.9) 100%)',
                boxShadow: '0 8px 25px rgba(249, 115, 22, 0.3), 0 0 20px rgba(249, 115, 22, 0.1)',
                border: '2px solid rgba(249, 115, 22, 0.3)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <img 
                src="/finance.png" 
                alt="Finance Logo" 
                style={{
                  width: '32px',
                  height: '32px',
                  objectFit: 'contain'
                }}
              />
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.1) 50%, transparent 60%)',
                  animation: 'shimmer 3s ease-in-out infinite'
                }}
              ></div>
            </div>
            <div>
              <h3 className="mb-0 fw-bold header-title" style={{ 
                letterSpacing: '-0.5px',
                color: colors.text
              }}>
                PANORAMA<span style={{ 
                  color: '#f97316', 
                  textShadow: isDarkMode 
                    ? '0 0 10px rgba(249, 115, 22, 0.5)' 
                    : '0 2px 4px rgba(249, 115, 22, 0.3)'
                }}>FINANCE</span>
              </h3>
            </div>
          </div>
        </Navbar.Brand>

        {/* Toggle button para mobile */}
        <Navbar.Toggle 
          aria-controls="navbar-nav" 
          style={{
            borderColor: colors.border,
            padding: '0.375rem 0.5rem'
          }}
        />

        <Navbar.Collapse id="navbar-nav">
          {/* Navigation Menu - Home, Cursos e Perfil */}
          <Nav className="ms-auto d-flex align-items-center responsive-nav gap-2">
            {/* Botão de alternância de tema */}
            <Button
              onClick={toggleTheme}
              variant="outline-light"
              className="px-2 py-2 d-flex align-items-center mb-2 mb-lg-0 theme-toggle-btn"
              style={{
                borderColor: colors.border,
                color: colors.accent,
                background: 'rgba(249, 115, 22, 0.1)',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                fontSize: '16px',
                width: '40px',
                height: '40px',
                padding: 0
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(249, 115, 22, 0.2)';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(249, 115, 22, 0.1)';
                e.target.style.transform = 'scale(1)';
              }}
              title={isDarkMode ? 'Alternar para modo claro' : 'Alternar para modo escuro'}
              aria-label={isDarkMode ? 'Alternar para modo claro' : 'Alternar para modo escuro'}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </Button>

          <Link to="/" className="text-decoration-none">
            <Button
              variant="outline-light"
              className="px-4 py-3 fw-bold mb-2 mb-lg-0 w-100"
              style={{
                borderColor: location.pathname === '/' ? 'rgba(249, 115, 22, 0.8)' : 'rgba(249, 115, 22, 0.6)',
                color: location.pathname === '/' ? 'white' : '#f97316',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '12px',
                background: location.pathname === '/' ? 'linear-gradient(135deg, rgba(249, 115, 22, 0.9), rgba(234, 88, 12, 0.8))' : 'rgba(249, 115, 22, 0.1)',
                backdropFilter: 'blur(10px)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontSize: '13px',
                boxShadow: location.pathname === '/' ? '0 12px 30px rgba(249, 115, 22, 0.4)' : '0 4px 15px rgba(249, 115, 22, 0.1)',
                minHeight: '48px'
              }}
              onMouseEnter={(e) => {
                if (location.pathname !== '/') {
                  e.target.style.background = 'linear-gradient(135deg, rgba(249, 115, 22, 0.9), rgba(234, 88, 12, 0.8))';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 12px 30px rgba(249, 115, 22, 0.4)';
                  e.target.style.borderColor = 'rgba(249, 115, 22, 0.8)';
                }
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== '/') {
                  e.target.style.background = 'rgba(249, 115, 22, 0.1)';
                  e.target.style.color = '#f97316';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(249, 115, 22, 0.2)';
                  e.target.style.borderColor = 'rgba(249, 115, 22, 0.6)';
                }
              }}
            >
              ⌂ HOME
            </Button>
          </Link>
          <Link to="/cursos" className="text-decoration-none">
            <Button
              variant="outline-light"
              className="px-5 py-3 fw-bold mb-2 mb-lg-0 w-100"
              style={{
                borderColor: location.pathname === '/cursos' ? 'rgba(249, 115, 22, 0.8)' : 'rgba(249, 115, 22, 0.6)',
                color: location.pathname === '/cursos' ? 'white' : '#f97316',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '12px',
                background: location.pathname === '/cursos' ? 'linear-gradient(135deg, rgba(249, 115, 22, 0.9), rgba(234, 88, 12, 0.8))' : 'rgba(249, 115, 22, 0.1)',
                backdropFilter: 'blur(10px)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontSize: '13px',
                boxShadow: location.pathname === '/cursos' ? '0 12px 30px rgba(249, 115, 22, 0.4)' : '0 4px 15px rgba(249, 115, 22, 0.1)',
                minHeight: '48px'
              }}
              onMouseEnter={(e) => {
                if (location.pathname !== '/cursos') {
                  e.target.style.background = 'linear-gradient(135deg, rgba(249, 115, 22, 0.9), rgba(234, 88, 12, 0.8))';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 12px 30px rgba(249, 115, 22, 0.4)';
                  e.target.style.borderColor = 'rgba(249, 115, 22, 0.8)';
                }
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== '/cursos') {
                  e.target.style.background = 'rgba(249, 115, 22, 0.1)';
                  e.target.style.color = '#f97316';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(249, 115, 22, 0.2)';
                  e.target.style.borderColor = 'rgba(249, 115, 22, 0.6)';
                }
              }}
            >
              ◉ CURSOS
            </Button>
          </Link>
          
          {/* User Profile */}
          <Link to="/perfil" className="text-decoration-none">
            <Button
              variant="outline-light"
              className="d-flex align-items-center justify-content-center px-4 py-3 fw-bold mb-2 mb-lg-0 w-100"
              style={{
                borderColor: location.pathname === '/perfil' ? 'rgba(249, 115, 22, 0.8)' : 'rgba(249, 115, 22, 0.6)',
                color: location.pathname === '/perfil' ? 'white' : '#f97316',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '12px',
                background: location.pathname === '/perfil' ? 'linear-gradient(135deg, rgba(249, 115, 22, 0.9), rgba(234, 88, 12, 0.8))' : 'rgba(249, 115, 22, 0.1)',
                backdropFilter: 'blur(10px)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontSize: '13px',
                boxShadow: location.pathname === '/perfil' ? '0 12px 30px rgba(249, 115, 22, 0.4)' : '0 4px 15px rgba(249, 115, 22, 0.1)',
                minHeight: '48px'
              }}
              onMouseEnter={(e) => {
                if (location.pathname !== '/perfil') {
                  e.target.style.background = 'linear-gradient(135deg, rgba(249, 115, 22, 0.9), rgba(234, 88, 12, 0.8))';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 12px 30px rgba(249, 115, 22, 0.4)';
                  e.target.style.borderColor = 'rgba(249, 115, 22, 0.8)';
                }
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== '/perfil') {
                  e.target.style.background = 'rgba(249, 115, 22, 0.1)';
                  e.target.style.color = '#f97316';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(249, 115, 22, 0.2)';
                  e.target.style.borderColor = 'rgba(249, 115, 22, 0.6)';
                }
              }}
            >
              ◦ PERFIL
           </Button>
          </Link>
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header; 