import React, { useState } from 'react';
import { Offcanvas, Form, Button, Badge } from 'react-bootstrap';

const EnhancedSidebar = ({ show, onHide, onToggleCard, cardVisibility }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const cardCategories = [
    {
      title: 'Dados de Mercado',
      cards: [
        { id: 'symbol-info', name: 'Principais Ações NASDAQ (10 símbolos)', icon: '📊' },
        { id: 'market-clock', name: 'Relógio de Mercados', icon: '🕒' },
        { id: 'market-indices', name: 'Índices de Mercado', icon: '📈' },
        { id: 'quotes', name: 'Cotações em Tempo Real', icon: '💹' },
        { id: 'market-overview', name: 'Visão Geral do Mercado', icon: '📊' },
        { id: 'stock-heatmap', name: 'Mapa de Calor', icon: '🌡️' }
      ]
    },
    {
      title: 'Notícias e Análises',
      cards: [
        { id: 'polygon-news', name: 'Notícias Financeiras', icon: '📰' },
        { id: 'technical-analysis', name: 'Análise Técnica', icon: '📉' },
        { id: 'video-player', name: 'Vídeos de Análise', icon: '🎥' }
      ]
    },
    {
      title: 'Calendários e Eventos',
      cards: [
        { id: 'economic-calendar', name: 'Calendário Econômico', icon: '📅' },
        { id: 'earnings-calendar', name: 'Calendário de Resultados', icon: '💰' }
      ]
    },
    {
      title: 'Moedas e Commodities',
      cards: [
        { id: 'currency-rates', name: 'Taxas de Câmbio', icon: '💱' },
        { id: 'crypto-rates', name: 'Criptomoedas', icon: '₿' },
        { id: 'commodities', name: 'Commodities', icon: '🛢️' }
      ]
    },
    {
      title: 'Gráficos e Widgets',
      cards: [
        { id: 'price-chart', name: 'Gráfico de Preços', icon: '📈' },
        { id: 'trading-widget', name: 'Widget de Trading', icon: '🔄' }
      ]
    }
  ];

  const filteredCategories = cardCategories.map(category => ({
    ...category,
    cards: category.cards.filter(card => 
      card.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.cards.length > 0);

  const getVisibleCardsCount = () => {
    return Object.values(cardVisibility).filter(Boolean).length;
  };

  const getTotalCardsCount = () => {
    return cardCategories.reduce((total, category) => total + category.cards.length, 0);
  };

  const handleToggleAll = (show) => {
    cardCategories.forEach(category => {
      category.cards.forEach(card => {
        onToggleCard(card.id, show);
      });
    });
  };

  return (
    <Offcanvas show={show} onHide={onHide} placement="start" className="bg-primary-dark" style={{ width: '320px' }}>
      <Offcanvas.Header closeButton closeVariant="white" className="border-bottom border-secondary">
        <Offcanvas.Title className="text-white">
          <div className="d-flex align-items-center">
            <div className="bg-accent-orange rounded d-flex align-items-center justify-content-center me-2" 
                 style={{width: '24px', height: '24px'}}>
              <span className="text-white fw-bold" style={{fontSize: '12px'}}>⚙️</span>
            </div>
            Controle de Widgets
          </div>
        </Offcanvas.Title>
      </Offcanvas.Header>
      
      <Offcanvas.Body className="p-0">
        {/* Search Bar */}
        <div className="p-3 border-bottom border-secondary">
          <Form.Control
            type="text"
            placeholder="Buscar widgets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-secondary text-white border-0"
            style={{ backgroundColor: '#2d3748 !important' }}
          />
        </div>

        {/* Stats */}
        <div className="p-3 border-bottom border-secondary">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="text-light-gray small">Widgets Visíveis:</span>
            <Badge bg="success">{getVisibleCardsCount()}/{getTotalCardsCount()}</Badge>
          </div>
          
          <div className="d-flex gap-2">
            <Button 
              size="sm" 
              variant="outline-success" 
              onClick={() => handleToggleAll(true)}
              className="flex-fill"
            >
              Mostrar Todos
            </Button>
            <Button 
              size="sm" 
              variant="outline-danger" 
              onClick={() => handleToggleAll(false)}
              className="flex-fill"
            >
              Ocultar Todos
            </Button>
          </div>
        </div>

        {/* Categories and Cards */}
        <div className="flex-grow-1 overflow-auto">
          {filteredCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="border-bottom border-secondary">
              <div className="p-3 pb-2">
                <h6 className="text-white mb-3 fw-bold small">{category.title}</h6>
                
                {category.cards.map((card, cardIndex) => (
                  <div 
                    key={cardIndex}
                    className="d-flex align-items-center justify-content-between py-2 px-2 rounded mb-2 hover-bg-secondary"
                    style={{ cursor: 'pointer', transition: 'background-color 0.2s' }}
                    onClick={() => onToggleCard(card.id, !cardVisibility[card.id])}
                  >
                    <div className="d-flex align-items-center">
                      <span className="me-2" style={{ fontSize: '16px' }}>{card.icon}</span>
                      <span className="text-light-gray small">{card.name}</span>
                    </div>
                    
                    <Form.Check
                      type="switch"
                      id={`card-${card.id}`}
                      checked={cardVisibility[card.id] || false}
                      onChange={(e) => onToggleCard(card.id, e.target.checked)}
                      onClick={(e) => e.stopPropagation()}
                      className="text-accent-orange"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-top border-secondary">
          <div className="text-center">
            <small className="text-muted">
              Finance Hub - Dashboard Personalizado
            </small>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default EnhancedSidebar; 