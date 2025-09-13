import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar 
      expand="lg" 
      className="px-4 py-3 shadow-lg"
      style={{ 
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        borderBottom: '2px solid rgba(255, 165, 0, 0.3)'
      }}
    >
      <Container fluid>
        {/* Logo e Brand */}
        <Navbar.Brand className="d-flex align-items-center">
          <div className="d-flex align-items-center">
            <div 
              className="rounded-3 d-flex align-items-center justify-content-center me-3 shadow-lg" 
              style={{
                width: '48px', 
                height: '48px',
                background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
                boxShadow: '0 4px 15px rgba(255, 107, 53, 0.4)'
              }}
            >
              <span className="text-white fw-bold" style={{ fontSize: '20px' }}>₿</span>
            </div>
            <div>
              <h3 className="text-white mb-0 fw-bold">
                PANORAMA<span style={{ color: '#ff6b35' }}>FINANCE</span>
              </h3>
              <small className="text-muted">Hub de Investimentos</small>
            </div>
          </div>
        </Navbar.Brand>

        {/* Navigation Menu - Apenas Cursos e Perfil */}
        <Nav className="ms-auto d-flex align-items-center">
          <Button
            variant="outline-light"
            className="me-3 px-4 py-2 fw-medium"
            style={{
              borderColor: '#ff6b35',
              color: '#ff6b35',
              transition: 'all 0.3s ease',
              borderRadius: '25px'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#ff6b35';
              e.target.style.color = 'white';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 25px rgba(255, 107, 53, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#ff6b35';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            📚 Cursos
          </Button>
          
          {/* User Profile */}
          <div 
            className="d-flex align-items-center px-3 py-2 rounded-pill cursor-pointer"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 107, 53, 0.2)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div 
              className="rounded-circle d-flex align-items-center justify-content-center me-2" 
              style={{
                width: '36px', 
                height: '36px',
                background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
                boxShadow: '0 4px 10px rgba(255, 107, 53, 0.3)'
              }}
            >
              <span className="text-white fw-bold">👤</span>
            </div>
            <div className="d-none d-md-block">
              <div className="text-white fw-medium small">Perfil</div>
              <div className="text-muted" style={{ fontSize: '11px' }}>Investidor</div>
            </div>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header; 