import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import StockHeatmap from './StockHeatmap';
import Screener from './Screener';
import Ticker from './Ticker';
import CalendarioEconomico from './CalendarioEconomico';
import Grafico from './Grafico';
import TradingIndicators from './TradingIndicators';
import MarketDataStream from './MarketDataStream';
import MarketQuotes from './indices/MarketQuotes';
import IndiceEuropa from './indices/IndiceEuropa';
import IndiceAsia from './indices/IndiceAsia';
import IndiceAgricolas from './indices/IndiceAgricolas';
import IndiceEnergia from './indices/IndiceEnergia';
import IndiceFuturos from './indices/IndiceFuturos';
import IndiceNasdaq from './indices/IndiceNasdaq';

const MainContent = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Container fluid className="px-0" style={{ position: 'relative', zIndex: 1 }}>
      {/* Efeitos de dados fluindo */}
      <div className="data-stream"></div>
      <div className="data-stream"></div>
      <div className="data-stream"></div>
      
      <div className="d-flex flex-column min-vh-100">
        <div className="p-5 main-container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
          
          {/* Hero Section */}
          <div className="text-center mb-6">
            <div className="mb-4">
              <span 
                className="badge px-4 py-2 fw-bold"
                style={{
                  background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(234, 88, 12, 0.2))',
                  color: '#f97316',
                  border: '1px solid rgba(249, 115, 22, 0.3)',
                  borderRadius: '25px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontSize: '12px',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 15px rgba(249, 115, 22, 0.1)'
                }}
              >
                🔴 Dados de Mercado
              </span>
            </div>
            <h1 
              className="text-white fw-bold mb-4 hero-title" 
              style={{ 
                textShadow: '0 0 15px rgba(249, 115, 22, 0.2), 0 4px 8px rgba(0, 0, 0, 0.8)',
                letterSpacing: '-1px',
                lineHeight: '1.1'
              }}
            >
              PANORAMA<span style={{ color: '#f97316' }}>FINANCE</span>
              <div 
                className="hero-subtitle"
                style={{ 
                  fontWeight: '400',
                  marginTop: '0.5rem',
                  color: 'rgba(156, 163, 175, 0.9)'
                }}
              >
                Professional Trading Hub
              </div>
            </h1>
            <p className="text-gray-500 fs-5 mb-5" style={{ maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
              Monitore mercados globais em tempo real com dados precisos e visualizações avançadas 
              para tomadas de decisão profissionais
            </p>
            <div 
              className="mx-auto mb-5" 
              style={{
                width: '150px',
                height: '3px',
                background: 'linear-gradient(90deg, rgba(249, 115, 22, 0.8), rgba(234, 88, 12, 0.8), rgba(251, 146, 60, 0.8))',
                borderRadius: '2px',
                boxShadow: '0 0 15px rgba(249, 115, 22, 0.3)'
              }}
            ></div>

            {/* Menu de Navegação */}
            <div className="d-flex justify-content-center flex-wrap gap-3 mb-5">
              {[
                { id: 'ticker', label: '📊 Ticker', color: '#f97316' },
                { id: 'indices', label: '🌍 Índices', color: '#f97316' },
                { id: 'calendar', label: '📅 Calendário', color: '#f97316' },
                { id: 'charts', label: '📈 Gráficos', color: '#f97316' },
                { id: 'heatmap', label: '🗺️ Heatmap', color: '#f97316' },
                { id: 'screener', label: '🔍 Screener', color: '#f97316' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="btn btn-sm px-4 py-2 fw-bold"
                  style={{
                    background: 'rgba(249, 115, 22, 0.1)',
                    border: '1px solid rgba(249, 115, 22, 0.3)',
                    color: item.color,
                    borderRadius: '25px',
                    fontSize: '13px',
                    textTransform: 'none',
                    letterSpacing: '0.5px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(249, 115, 22, 0.2)';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(249, 115, 22, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(249, 115, 22, 0.1)';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Market Ticker */}
          <div id="ticker">
            <Ticker />
          </div>
          
          {/* Índices de Mercado */}
          <div id="indices" className="mb-5">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h2 className="text-white fw-bold mb-0 d-flex align-items-center">
                <span 
                  className="me-4 rounded-4 d-flex align-items-center justify-content-center"
                  style={{
                    width: '50px',
                    height: '50px',
                    background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.9), rgba(234, 88, 12, 0.8))',
                    boxShadow: '0 8px 25px rgba(249, 115, 22, 0.3), 0 0 20px rgba(249, 115, 22, 0.1)',
                    border: '2px solid rgba(249, 115, 22, 0.3)',
                    fontSize: '20px'
                  }}
                >
                  📊
                </span>
                <div>
                  <div style={{ fontSize: '1.8rem', letterSpacing: '-0.5px' }}>
                    Global Market Indices
                  </div>
                  <small 
                    className=" fw-medium d-block text-white" 
                    style={{ 
                      fontSize: '12px', 
                      letterSpacing: '1px',
                      marginTop: '2px'
                    }}
                  >
                    Todas as principais bolsas de valores do mundo
                  </small>
                </div>
              </h2>
                            
            </div>
          </div>
          <Row className="mb-5 g-4">
            <Col lg={6} md={6} sm={12}>
              <IndiceNasdaq />
            </Col>
            <Col lg={6} md={6} sm={12}>
              <IndiceFuturos />
            </Col>
          </Row>

          <Row className="mb-5 g-4">
            <Col lg={6} md={6} sm={12}>
              <MarketQuotes />
            </Col>
            <Col lg={6} md={6} sm={12}>
              <IndiceEuropa />
            </Col>
          </Row>
          
          <Row className="mb-5 g-4">
            <Col lg={6} md={6} sm={12}>
              <IndiceAsia />
            </Col>
            <Col lg={6} md={6} sm={12}>
              <IndiceAgricolas />
            </Col>
          </Row>
          
          <Row className="mb-5 g-4">
            <Col lg={6} md={6} sm={12}>
              <IndiceEnergia />
            </Col>
            
          </Row>
                      
            {/* Calendário Econômico */}
            <div id="calendar" className="mb-5">
              <CalendarioEconomico />
            </div>
            
            {/* Mapa de Calor do Mercado */}
          <div id="heatmap" className="mb-4 mt-5">
            <h2 className="text-white fw-bold mb-4 d-flex align-items-center">
              <span 
                className="me-3 rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #28a745, #20c997)',
                  boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)'
                }}
              >
                🗺️
              </span>
              Visualização de Mercado
            </h2>
          </div>
          <Row className="mb-5">
            <Col>
              <StockHeatmap />
            </Col>
          </Row>
          
          {/* Screener de Ações */}
          <div id="screener" className="mb-4">
            <h2 className="text-white fw-bold mb-4 d-flex align-items-center">
              <span 
                className="me-3 rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #007bff, #6f42c1)',
                  boxShadow: '0 4px 15px rgba(0, 123, 255, 0.3)'
                }}
              >
                🔍
              </span>
              Análise de Ações
            </h2>
          </div>
          <Row className="mb-5">
            <Col>
              <Screener />
            </Col>
          </Row>
          
          {/* Gráfico NVIDIA - Final da Página */}
          <div id="charts" className="mb-5">
            <Grafico />
          </div>
          
        </div>
      </div>

      {/* Botão Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="btn position-fixed"
          style={{
            bottom: '30px',
            right: '30px',
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.9), rgba(234, 88, 12, 0.8))',
            border: '2px solid rgba(249, 115, 22, 0.4)',
            borderRadius: '50%',
            boxShadow: '0 8px 25px rgba(249, 115, 22, 0.3), 0 0 20px rgba(249, 115, 22, 0.1)',
            zIndex: 1000,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-5px) scale(1.1)';
            e.target.style.boxShadow = '0 15px 35px rgba(249, 115, 22, 0.4), 0 0 30px rgba(249, 115, 22, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.boxShadow = '0 8px 25px rgba(249, 115, 22, 0.3), 0 0 20px rgba(249, 115, 22, 0.1)';
          }}
          title="Voltar ao topo"
        >
          <span 
            style={{ 
              fontSize: '24px',
              color: 'white',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
            }}
          >
            ⬆️
          </span>
        </button>
      )}

      {/* Indicadores de Trading */}
      <TradingIndicators />

      {/* Stream de Dados de Mercado */}
      <MarketDataStream />
    </Container>
  );
};

export default MainContent; 