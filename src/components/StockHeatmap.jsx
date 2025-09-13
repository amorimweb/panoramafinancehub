import React, { useEffect, useRef, memo } from 'react';
import { Card } from 'react-bootstrap';

const StockHeatmap = () => {
  const containerRef = useRef(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    const loadWidget = () => {
      if (!containerRef.current || scriptLoaded.current) {
        return;
      }

      try {
        // Limpar container antes de adicionar novo script
        containerRef.current.innerHTML = '';
        
        const widgetContainer = document.createElement('div');
        widgetContainer.className = 'tradingview-widget-container__widget';
        containerRef.current.appendChild(widgetContainer);

        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js";
        script.type = "text/javascript";
        script.async = true;
        
        script.onload = () => {
          console.log('Heatmap widget carregado com sucesso');
          scriptLoaded.current = true;
        };
        
        script.onerror = (error) => {
          console.warn('Erro ao carregar widget de heatmap:', error);
        };
        
        script.innerHTML = JSON.stringify({
          "dataSource": "SPX500",
          "blockSize": "market_cap_basic",
          "blockColor": "change|60",
          "grouping": "sector",
          "locale": "br",
          "symbolUrl": "",
          "colorTheme": "dark",
          "exchanges": [
            "NASDAQ"
          ],
          "hasTopBar": false,
          "isDataSetEnabled": false,
          "isZoomEnabled": true,
          "hasSymbolTooltip": true,
          "isMonoSize": false,
          "width": "100%",
          "height": "100%"
        });
        
        containerRef.current.appendChild(script);
        
        // Adicionar copyright
        const copyrightDiv = document.createElement('div');
        copyrightDiv.className = 'tradingview-widget-copyright';
        copyrightDiv.innerHTML = '<a href="https://br.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text">Track all markets on TradingView</span></a>';
        containerRef.current.appendChild(copyrightDiv);
        
      } catch (error) {
        console.warn('Erro ao criar widget de heatmap:', error);
      }
    };

    // Delay para evitar conflitos
    const timeoutId = setTimeout(loadWidget, 100);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      scriptLoaded.current = false;
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <Card className="card-dark h-100">
      <Card.Header className="bg-primary-dark border-0">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="bg-accent-orange rounded d-flex align-items-center justify-content-center me-2" 
                 style={{width: '24px', height: '24px'}}>
              <span className="text-white fw-bold" style={{fontSize: '12px'}}>🔥</span>
            </div>
            <h6 className="text-white mb-0 fw-bold">Mapa de Calor - S&P 500 (NASDAQ)</h6>
          </div>
          <div className="d-flex align-items-center">
            <small className="text-muted me-2">Agrupado por Setor</small>
            <div className="bg-success rounded-circle" style={{width: '8px', height: '8px'}}></div>
          </div>
        </div>
      </Card.Header>
      
      <Card.Body className="p-3">
        <div 
          className="tradingview-widget-container"
          ref={containerRef}
          style={{ minHeight: '500px', height: '70vh' }}
        >
          <div className="d-flex align-items-center justify-content-center h-100">
            <div className="text-center">
              <div className="spinner-border text-warning mb-2" role="status" style={{width: '1.5rem', height: '1.5rem'}}>
                <span className="visually-hidden">Carregando...</span>
              </div>
              <p className="text-muted small">Carregando Mapa de Calor...</p>
            </div>
          </div>
        </div>
        
        <div className="mt-3 pt-2 border-top border-secondary">
          <div className="row text-center g-2">
            <div className="col-3">
              <small className="text-muted d-block" style={{fontSize: '0.7rem'}}>Exchange</small>
              <small className="text-white fw-bold" style={{fontSize: '0.75rem'}}>NASDAQ</small>
            </div>
            <div className="col-3">
              <small className="text-muted d-block" style={{fontSize: '0.7rem'}}>Agrupamento</small>
              <small className="text-white fw-bold" style={{fontSize: '0.75rem'}}>Setor</small>
            </div>
            <div className="col-3">
              <small className="text-muted d-block" style={{fontSize: '0.7rem'}}>Cores</small>
              <small className="text-white fw-bold" style={{fontSize: '0.75rem'}}>Variação 60min</small>
            </div>
            <div className="col-3">
              <small className="text-success fw-bold" style={{fontSize: '0.75rem'}}>● Live</small>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default memo(StockHeatmap); 