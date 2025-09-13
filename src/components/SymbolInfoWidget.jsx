import React, { useEffect, useRef, memo, useMemo } from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const SymbolInfoWidget = () => {
  // Definir todos os símbolos usando useMemo para evitar re-criação desnecessária
  const symbols = useMemo(() => [
    { 
      symbol: 'NASDAQ:AAPL', 
      name: 'Apple Inc.', 
      ticker: 'AAPL', 
      icon: '🍎',
      url: 'https://www.tradingview.com/symbols/NASDAQ-AAPL/?exchange=NASDAQ'
    },
    { 
      symbol: 'NASDAQ:NVDA', 
      name: 'NVIDIA Corporation', 
      ticker: 'NVDA', 
      icon: '🎮',
      url: 'https://br.tradingview.com/symbols/NASDAQ-NVDA/?exchange=NASDAQ'
    },
    { 
      symbol: 'NASDAQ:AVGO', 
      name: 'Broadcom Inc.', 
      ticker: 'AVGO', 
      icon: '🔧',
      url: 'https://br.tradingview.com/symbols/NASDAQ-AVGO/?exchange=NASDAQ'
    },
    { 
      symbol: 'NASDAQ:MSFT', 
      name: 'Microsoft Corporation', 
      ticker: 'MSFT', 
      icon: '💻',
      url: 'https://br.tradingview.com/symbols/NASDAQ-MSFT/?exchange=NASDAQ'
    },
    { 
      symbol: 'NASDAQ:GOOGL', 
      name: 'Alphabet Inc.', 
      ticker: 'GOOGL', 
      icon: '🔍',
      url: 'https://br.tradingview.com/symbols/NASDAQ-GOOGL/?exchange=NASDAQ'
    },
    { 
      symbol: 'NASDAQ:META', 
      name: 'Meta Platforms Inc.', 
      ticker: 'META', 
      icon: '📘',
      url: 'https://br.tradingview.com/symbols/NASDAQ-META/?exchange=NASDAQ'
    },
    { 
      symbol: 'NASDAQ:NFLX', 
      name: 'Netflix Inc.', 
      ticker: 'NFLX', 
      icon: '🎬',
      url: 'https://br.tradingview.com/symbols/NASDAQ-NFLX/?exchange=NASDAQ'
    },
    { 
      symbol: 'NASDAQ:AMZN', 
      name: 'Amazon.com Inc.', 
      ticker: 'AMZN', 
      icon: '📦',
      url: 'https://br.tradingview.com/symbols/NASDAQ-AMZN/?exchange=NASDAQ'
    },
    { 
      symbol: 'NASDAQ:TSLA', 
      name: 'Tesla Inc.', 
      ticker: 'TSLA', 
      icon: '🚗',
      url: 'https://br.tradingview.com/symbols/NASDAQ-TSLA/?exchange=NASDAQ'
    },
    { 
      symbol: 'NASDAQ:PLTR', 
      name: 'Palantir Technologies Inc.', 
      ticker: 'PLTR', 
      icon: '🛡️',
      url: 'https://br.tradingview.com/symbols/NASDAQ-PLTR/?exchange=NASDAQ'
    }
  ], []);

  const containerRefs = useRef({});

  useEffect(() => {
    symbols.forEach((symbolData) => {
      const containerRef = containerRefs.current[symbolData.ticker];
      if (containerRef) {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = JSON.stringify({
          "symbol": symbolData.symbol,
          "colorTheme": "dark",
          "isTransparent": false,
          "locale": "br",
          "width": "100%"
        });
        
        // Limpar container antes de adicionar novo script
        containerRef.innerHTML = '';
        const widgetContainer = document.createElement('div');
        widgetContainer.className = 'tradingview-widget-container__widget';
        containerRef.appendChild(widgetContainer);
        containerRef.appendChild(script);
      }
    });
  }, [symbols]);

  return (
    <Card className="card-dark h-100">
      <Card.Header className="bg-primary-dark border-0">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="bg-accent-orange rounded d-flex align-items-center justify-content-center me-2" 
                 style={{width: '24px', height: '24px'}}>
              <span className="text-white fw-bold" style={{fontSize: '12px'}}>📊</span>
            </div>
            <h6 className="text-white mb-0 fw-bold">Principais Ações NASDAQ</h6>
          </div>
          <div className="d-flex align-items-center">
            <small className="text-muted me-2">Total: {symbols.length} símbolos</small>
            <div className="bg-success rounded-circle" style={{width: '8px', height: '8px'}}></div>
          </div>
        </div>
      </Card.Header>
      
      <Card.Body className="p-3">
        <Row className="g-3">
          {symbols.map((symbolData, index) => (
            <Col key={symbolData.ticker} xl={3} lg={4} md={6} sm={12}>
              <div className="symbol-widget-wrapper">
                <div className="mb-2">
                  <h6 className="text-white small mb-1">
                    <span className="me-2">{symbolData.icon}</span>
                    {symbolData.name} ({symbolData.ticker})
                  </h6>
                  <small className="text-muted">NASDAQ</small>
                </div>
                
                <div 
                  className="tradingview-widget-container"
                  ref={(el) => {
                    if (el) containerRefs.current[symbolData.ticker] = el;
                  }}
                  style={{ minHeight: '180px' }}
                >
                  <div className="d-flex align-items-center justify-content-center h-100">
                    <div className="text-center">
                      <div className="spinner-border text-warning mb-2" role="status" style={{width: '1.5rem', height: '1.5rem'}}>
                        <span className="visually-hidden">Carregando...</span>
                      </div>
                      <p className="text-muted small">Carregando {symbolData.ticker}...</p>
                    </div>
                  </div>
                </div>
                
                <div className="tradingview-widget-copyright mt-2">
                  <small>
                    <a 
                      href={symbolData.url} 
                      rel="noopener noreferrer" 
                      target="_blank"
                      className="text-decoration-none"
                      style={{ color: '#2196F3' }}
                    >
                      Track all markets on TradingView
                    </a>
                  </small>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* Market Summary */}
        <div className="mt-4 pt-3 border-top border-secondary">
          <Row className="text-center g-3">
            <Col xs={6} md={3}>
              <div className="text-center">
                <small className="text-muted d-block">Setor Principal</small>
                <small className="text-white fw-bold">Tecnologia</small>
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div className="text-center">
                <small className="text-muted d-block">Mercado</small>
                <small className="text-white fw-bold">NASDAQ</small>
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div className="text-center">
                <small className="text-muted d-block">Símbolos</small>
                <small className="text-white fw-bold">{symbols.length} Ações</small>
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div className="text-center">
                <small className="text-muted d-block">Atualização</small>
                <small className="text-success fw-bold">Tempo Real</small>
              </div>
            </Col>
          </Row>
        </div>
      </Card.Body>
    </Card>
  );
};

export default memo(SymbolInfoWidget); 