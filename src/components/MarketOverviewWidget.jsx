import React, { useEffect, useRef, memo } from 'react';
import { Card } from 'react-bootstrap';

function MarketOverviewWidget() {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "colorTheme": "dark",
        "dateRange": "12M",
        "locale": "br",
        "largeChartUrl": "",
        "isTransparent": false,
        "showFloatingTooltip": false,
        "plotLineColorGrowing": "rgba(249, 115, 22, 1)",
        "plotLineColorFalling": "rgba(248, 113, 113, 1)",
        "gridLineColor": "rgba(52, 65, 85, 0.5)",
        "scaleFontColor": "#e2e8f0",
        "belowLineFillColorGrowing": "rgba(249, 115, 22, 0.12)",
        "belowLineFillColorFalling": "rgba(248, 113, 113, 0.12)",
        "belowLineFillColorGrowingBottom": "rgba(249, 115, 22, 0)",
        "belowLineFillColorFallingBottom": "rgba(248, 113, 113, 0)",
        "symbolActiveColor": "rgba(249, 115, 22, 0.12)",
        "tabs": [
          {
            "title": "Indices",
            "symbols": [
              {
                "s": "BMFBOVESPA:IBOV",
                "d": "IBOVESPA"
              },
              {
                "s": "FOREXCOM:SPXUSD",
                "d": "S&P 500"
              },
              {
                "s": "FOREXCOM:NSXUSD",
                "d": "NASDAQ 100"
              },
              {
                "s": "FOREXCOM:DJI",
                "d": "Dow Jones"
              },
              {
                "s": "INDEX:DEU40",
                "d": "DAX"
              }
            ],
            "originalTitle": "Indices"
          },
          {
            "title": "Forex",
            "symbols": [
              {
                "s": "FX:USDBRL",
                "d": "USD/BRL"
              },
              {
                "s": "FX:EURUSD",
                "d": "EUR/USD"
              },
              {
                "s": "FX:GBPUSD",
                "d": "GBP/USD"
              },
              {
                "s": "FX:USDJPY",
                "d": "USD/JPY"
              }
            ],
            "originalTitle": "Forex"
          },
          {
            "title": "Crypto",
            "symbols": [
              {
                "s": "BINANCE:BTCUSDT",
                "d": "Bitcoin"
              },
              {
                "s": "BINANCE:ETHUSDT",
                "d": "Ethereum"
              },
              {
                "s": "BINANCE:ADAUSDT",
                "d": "Cardano"
              },
              {
                "s": "BINANCE:DOTUSDT",
                "d": "Polkadot"
              }
            ],
            "originalTitle": "Crypto"
          }
        ],
        "width": "100%",
        "height": "400",
        "showSymbolLogo": true,
        "showChart": true
      }`;
    
    if (container.current) {
      container.current.appendChild(script);
    }
  }, []);

  return (
    <Card className="card-dark h-100">
      <Card.Header className="bg-dark-700 border-dark-700">
        <h6 className="text-white mb-0">📊 Visão Geral do Mercado</h6>
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

export default memo(MarketOverviewWidget); 