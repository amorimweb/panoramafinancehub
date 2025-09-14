import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  return (
    <Navbar 
      expand="lg" 
      className="px-2 px-md-4 py-3 py-md-4 shadow-2xl"
      style={{ 
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(249, 115, 22, 0.3)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 50px rgba(249, 115, 22, 0.1)',
        position: 'relative',
        zIndex: 1000
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
              <h3 className="text-white mb-0 fw-bold header-title" style={{ letterSpacing: '-0.5px' }}>
                PANORAMA<span style={{ color: '#f97316', textShadow: '0 0 10px rgba(249, 115, 22, 0.5)' }}>FINANCE</span>
              </h3>
              {/* <small 
                className="text-muted fw-medium" 
                style={{ 
                  color: 'rgba(156, 163, 175, 0.8)',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  fontSize: '11px'
                }}
              >
                Professional Trading Hub
              </small> */}
            </div>
          </div>
        </Navbar.Brand>

        {/* Toggle button para mobile */}
        <Navbar.Toggle 
          aria-controls="navbar-nav" 
          style={{
            borderColor: 'rgba(249, 115, 22, 0.3)',
            padding: '0.375rem 0.5rem'
          }}
        />

        <Navbar.Collapse id="navbar-nav">
          {/* Navigation Menu - Home, Cursos e Perfil */}
          <Nav className="ms-auto d-flex align-items-center responsive-nav">
          <Link to="/">
            <Button
              variant="outline-light"
              className="me-3 px-4 py-3 fw-bold"
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
                boxShadow: location.pathname === '/' ? '0 12px 30px rgba(249, 115, 22, 0.4)' : '0 4px 15px rgba(249, 115, 22, 0.1)'
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
          <Link to="/cursos">
            <Button
              variant="outline-light"
              className="me-4 px-5 py-3 fw-bold"
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
                boxShadow: location.pathname === '/cursos' ? '0 12px 30px rgba(249, 115, 22, 0.4)' : '0 4px 15px rgba(249, 115, 22, 0.1)'
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
          <Link to="/perfil">
            <Button
              variant="outline-light"
              className="d-flex align-items-center px-4 py-3 fw-bold"
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
                boxShadow: location.pathname === '/perfil' ? '0 12px 30px rgba(249, 115, 22, 0.4)' : '0 4px 15px rgba(249, 115, 22, 0.1)'
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