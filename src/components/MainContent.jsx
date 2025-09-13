import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import StockHeatmap from './StockHeatmap';
import Screener from './Screener';
import MarketQuotes from './indices/MarketQuotes';
import IndiceEuropa from './indices/IndiceEuropa';
import IndiceAsia from './indices/IndiceAsia';
import IndiceAgricolas from './indices/IndiceAgricolas';
import IndiceEnergia from './indices/IndiceEnergia';
import IndiceFuturos from './indices/IndiceFuturos';
import IndiceNasdaq from './indices/IndiceNasdaq';

const MainContent = () => {
  return (
    <Container fluid className="px-0">
      <div className="d-flex flex-column min-vh-100">
        <div className="p-5" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
          
          {/* Hero Section */}
          <div className="text-center mb-5">
            <h1 className="text-white fw-bold mb-3" style={{ fontSize: '2.5rem', textShadow: '0 4px 8px rgba(0, 0, 0, 0.5)' }}>
              Panorama dos Mercados Financeiros
            </h1>
            <p className="text-muted fs-5 mb-4">
              Acompanhe em tempo real os principais índices e commodities mundiais
            </p>
            <div 
              className="mx-auto mb-4" 
              style={{
                width: '100px',
                height: '4px',
                background: 'linear-gradient(90deg, #ff6b35, #f7931e)',
                borderRadius: '2px'
              }}
            ></div>
          </div>
          
          {/* Índices de Mercado */}
          <div className="mb-4">
            <h2 className="text-white fw-bold mb-4 d-flex align-items-center">
              <span 
                className="me-3 rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                  boxShadow: '0 4px 15px rgba(255, 107, 53, 0.3)'
                }}
              >
                📊
              </span>
              Índices e Mercados Globais
            </h2>
          </div>
          <Row className="mb-5 g-4">
            <Col lg={4} md={6} sm={12}>
              <MarketQuotes />
            </Col>
            <Col lg={4} md={6} sm={12}>
              <IndiceEuropa />
            </Col>
            <Col lg={4} md={12} sm={12}>
              <IndiceAsia />
            </Col>
          </Row>
          
          <Row className="mb-5 g-4">
            <Col lg={4} md={6} sm={12}>
              <IndiceAgricolas />
            </Col>
            <Col lg={4} md={6} sm={12}>
              <IndiceEnergia />
            </Col>
            <Col lg={4} md={6} sm={12}>
              <IndiceFuturos />
            </Col>
          </Row>
          
          <Row className="mb-5 g-4">
            <Col lg={4} md={6} sm={12}>
              <IndiceNasdaq />
            </Col>
          </Row>
          
          {/* Mapa de Calor do Mercado */}
          <div className="mb-4 mt-5">
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
          <div className="mb-4">
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
          
        </div>
      </div>
    </Container>
  );
};

export default MainContent; 