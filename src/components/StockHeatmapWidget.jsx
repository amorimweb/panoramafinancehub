import React, { useEffect, useRef, memo } from 'react';
import { Card } from 'react-bootstrap';

function StockHeatmapWidget() {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "dataSource": "NASDAQ100",
        "blockSize": "market_cap_basic",
        "blockColor": "change|60",
        "grouping": "sector",
        "locale": "br",
        "symbolUrl": "",
        "colorTheme": "dark",
        "exchanges": [],
        "hasTopBar": false,
        "isDataSetEnabled": false,
        "isZoomEnabled": true,
        "hasSymbolTooltip": true,
        "isMonoSize": false,
        "width": "100%",
        "height": "400"
      }`;
    
    if (container.current) {
      container.current.appendChild(script);
    }
  }, []);

  return (
    <Card className="card-dark h-100">
      <Card.Header className="bg-dark-700 border-dark-700">
        <h6 className="text-white mb-0">🔥 Heatmap de Ações</h6>
      </Card.Header>
      <Card.Body className="p-0">
        <div className="tradingview-widget-container" ref={container} style={{ minHeight: '400px' }}>
          <div className="tradingview-widget-container__widget"></div>
        </div>
        <div className="p-2 text-center border-top border-dark-700">
          <small className="text-gray-400">
            <a 
              href="https://br.tradingview.com/" 
              rel="noopener nofollow noreferrer" 
              target="_blank"
              className="text-accent-orange text-decoration-none"
            >
              Acompanhe todos os mercados no TradingView
            </a>
          </small>
        </div>
      </Card.Body>
    </Card>
  );
}

export default memo(StockHeatmapWidget); 