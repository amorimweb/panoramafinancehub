import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar 
      expand="lg" 
      className="px-4 py-4 shadow-2xl"
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
        <Navbar.Brand className="d-flex align-items-center">
          <div className="d-flex align-items-center">
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4 16 L8 12 L12 8 L16 4 L20 0" 
                      stroke="#ffffff" 
                      strokeWidth="2.5" 
                      fill="none" 
                      strokeLinecap="round"/>
                <path d="M18 2 L20 0 L18 -2 M20 0 L16 0" 
                      stroke="#ffffff" 
                      strokeWidth="2.5" 
                      fill="none" 
                      strokeLinecap="round"/>
                <circle cx="4" cy="16" r="1" fill="#ffffff" opacity="0.8"/>
                <circle cx="8" cy="12" r="1" fill="#ffffff" opacity="0.8"/>
                <circle cx="12" cy="8" r="1" fill="#ffffff" opacity="0.8"/>
                <circle cx="16" cy="4" r="1" fill="#ffffff" opacity="0.8"/>
                <circle cx="20" cy="0" r="1" fill="#ffffff" opacity="0.8"/>
              </svg>
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
              <h3 className="text-white mb-0 fw-bold" style={{ letterSpacing: '-0.5px' }}>
                PANORAMA<span style={{ color: '#f97316', textShadow: '0 0 10px rgba(249, 115, 22, 0.5)' }}>FINANCE</span>
              </h3>
              <small 
                className="text-muted fw-medium" 
                style={{ 
                  color: 'rgba(156, 163, 175, 0.8)',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  fontSize: '11px'
                }}
              >
                Professional Trading Hub
              </small>
            </div>
          </div>
        </Navbar.Brand>

        {/* Navigation Menu - Apenas Cursos e Perfil */}
        <Nav className="ms-auto d-flex align-items-center">
          <Button
            variant="outline-light"
            className="me-4 px-5 py-3 fw-bold"
            style={{
              borderColor: 'rgba(249, 115, 22, 0.6)',
              color: '#f97316',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              borderRadius: '12px',
              background: 'rgba(249, 115, 22, 0.1)',
              backdropFilter: 'blur(10px)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontSize: '13px',
              boxShadow: '0 4px 15px rgba(249, 115, 22, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(135deg, rgba(249, 115, 22, 0.9), rgba(234, 88, 12, 0.8))';
              e.target.style.color = 'white';
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 12px 30px rgba(249, 115, 22, 0.4)';
              e.target.style.borderColor = 'rgba(249, 115, 22, 0.8)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(249, 115, 22, 0.1)';
              e.target.style.color = '#f97316';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(249, 115, 22, 0.2)';
              e.target.style.borderColor = 'rgba(249, 115, 22, 0.6)';
            }}
          >
            📈 Trading Academy
          </Button>
          
          {/* User Profile */}
                     <div 
             className="d-flex align-items-center px-4 py-3 rounded-3 cursor-pointer"
             style={{
               background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(234, 88, 12, 0.1))',
               backdropFilter: 'blur(15px)',
               border: '1px solid rgba(249, 115, 22, 0.3)',
               transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
               boxShadow: '0 4px 15px rgba(249, 115, 22, 0.2)'
             }}
             onMouseEnter={(e) => {
               e.currentTarget.style.background = 'linear-gradient(135deg, rgba(249, 115, 22, 0.3), rgba(234, 88, 12, 0.25))';
               e.currentTarget.style.transform = 'translateY(-3px)';
               e.currentTarget.style.boxShadow = '0 8px 25px rgba(249, 115, 22, 0.3)';
               e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.5)';
             }}
             onMouseLeave={(e) => {
               e.currentTarget.style.background = 'linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(234, 88, 12, 0.1))';
               e.currentTarget.style.transform = 'translateY(0)';
               e.currentTarget.style.boxShadow = '0 4px 15px rgba(249, 115, 22, 0.2)';
               e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.3)';
             }}
           >
             <div 
               className="rounded-circle d-flex align-items-center justify-content-center me-3" 
               style={{
                 width: '42px', 
                 height: '42px',
                 background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.9) 0%, rgba(234, 88, 12, 0.9) 100%)',
                 boxShadow: '0 6px 15px rgba(249, 115, 22, 0.4), 0 0 20px rgba(249, 115, 22, 0.2)',
                 border: '2px solid rgba(249, 115, 22, 0.4)',
                 position: 'relative',
                 overflow: 'hidden'
               }}
             >
               <span 
                 className="text-white fw-bold" 
                 style={{ 
                   fontSize: '16px',
                   textShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
                 }}
               >
                 💼
               </span>
             </div>
             <div className="d-none d-md-block">
               <div 
                 className="text-white fw-bold small" 
                 style={{ 
                   textShadow: '0 0 10px rgba(16, 185, 129, 0.5)',
                   fontSize: '13px',
                   letterSpacing: '0.5px'
                 }}
               >
                 Professional
               </div>
               <div 
                 className="text-muted fw-medium" 
                 style={{ 
                   fontSize: '10px',
                   color: 'rgba(156, 163, 175, 0.8)',
                   textTransform: 'uppercase',
                   letterSpacing: '0.5px'
                 }}
               >
                 Active Trader
               </div>
             </div>
           </div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header; 