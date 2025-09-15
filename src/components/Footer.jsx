import React, { memo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTheme } from '../contexts/ThemeContext';

const Footer = () => {
  const { isDarkMode, colors } = useTheme();

  return (
    <footer
      style={{
        background: isDarkMode
          ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)'
          : 'linear-gradient(135deg, rgba(248, 250, 252, 0.95) 0%, rgba(241, 245, 249, 0.9) 100%)',
        borderTop: `1px solid ${colors.border}`,
        paddingTop: '2rem',
        paddingBottom: '2rem',
        marginTop: 'auto'
      }}
    >
      <Container>
        <Row className="gy-4 align-items-center">
          <Col md={4} sm={12}>
            <div className="d-flex align-items-center">
              <div 
                className="rounded-4 d-flex align-items-center justify-content-center me-3"
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.9), rgba(234, 88, 12, 0.8))',
                  border: `1px solid ${colors.border}`
                }}
              >
                💹
              </div>
              <div>
                <strong style={{ color: colors.text }}>PANORAMAFINANCE</strong>
                <div style={{ color: colors.textMuted, fontSize: '12px' }}>Professional Trading Hub</div>
              </div>
            </div>
          </Col>

          <Col md={4} sm={12} className="text-md-center">
            <div style={{ color: colors.textMuted, fontSize: '12px' }}>
              © {new Date().getFullYear()} PanoramaFinance. Todos os direitos reservados.
            </div>
          </Col>

          <Col md={4} sm={12} className="text-md-end">
            <div className="d-flex gap-3 justify-content-md-end justify-content-start">
              <a href="#" style={{ color: colors.textMuted, textDecoration: 'none', fontSize: '13px' }}>Termos</a>
              <a href="#" style={{ color: colors.textMuted, textDecoration: 'none', fontSize: '13px' }}>Privacidade</a>
              <a href="#" style={{ color: colors.textMuted, textDecoration: 'none', fontSize: '13px' }}>Contato</a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default memo(Footer); 