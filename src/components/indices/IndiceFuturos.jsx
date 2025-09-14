import React, { useEffect, useRef, memo } from 'react';
import ContainerIndices from './ContainerIndices';

const IndiceFuturos = () => {
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
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js";
        script.type = "text/javascript";
        script.async = true;
        
        script.onload = () => {
          console.log('IndiceFuturos widget carregado com sucesso');
          scriptLoaded.current = true;
        };
        
        script.onerror = (error) => {
          console.warn('Erro ao carregar widget de contratos futuros:', error);
        };
        
        script.innerHTML = JSON.stringify({
          "colorTheme": "dark",
          "locale": "br",
          "largeChartUrl": "",
          "isTransparent": false,
          "showSymbolLogo": true,
          "backgroundColor": "#0F0F0F",
          "support_host": "https://www.tradingview.com",
          "width": "100%",
          "height": 250,
          "gridLineColor": "#2A2E39",
          "fontColor": "#787B86",
          "underLineColor": "#E3F2FD",
          "trendLineColor": "#4CAF50",
          "activeTickerBackgroundColor": "#131722",
          "columns": ["name", "change_percent", "last", "change"],
          "symbolsGroups": [
            {
              "name": "Futuros",
              "symbols": [
                {
                  "name": "BMFBOVESPA:IBOV",
                  "displayName": "Ibovespa"
                },
                {
                  "name": "BLUEBERRY:SP500",
                  "displayName": "S&P 500"
                },
                {
                  "name": "IG:NASDAQ",
                  "displayName": "Nasdaq"
                },
                {
                  "name": "ACTIVTRADES:EURO50",
                  "displayName": "Euro Stoxx 50"
                },
                {
                  "name": "IG:FTSE",
                  "displayName": "FTSE 100"
                },
                {
                  "name": "IG:DAX",
                  "displayName": "DAX"
                },
                {
                  "name": "VANTAGE:NIKKEI225",
                  "displayName": "Nikkei 225"
                },
                {
                  "name": "FOREXCOM:CHINA50",
                  "displayName": "ChinaA50"
                },
                {
                  "name": "IG:ASX",
                  "displayName": "S&P ASX 200"
                }
              ]
            }
          ]
        });
        
        containerRef.current.appendChild(script);
        
        // Adicionar copyright
        // const copyrightDiv = document.createElement('div');
        // copyrightDiv.className = 'tradingview-widget-copyright';
        // copyrightDiv.innerHTML = '<a href="https://br.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text">Track all markets on TradingView</span></a>';
        // containerRef.current.appendChild(copyrightDiv);
        
      } catch (error) {
        console.warn('Erro ao criar widget de contratos futuros:', error);
      }
    };

    // Delay para evitar conflitos com outros widgets
    const timeoutId = setTimeout(loadWidget, 1300);

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
    <ContainerIndices title="Futuros">
      <div 
        className="tradingview-widget-container"
        ref={containerRef}
        style={{ 
          minHeight: '400px', 
          width: '100%',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="d-flex align-items-center justify-content-center h-100">
          <div className="text-center">
            <div className="spinner-border text-warning mb-2" role="status" style={{width: '1.5rem', height: '1.5rem'}}>
              <span className="visually-hidden">Carregando...</span>
            </div>
            <p className="text-muted small">Carregando Contratos Futuros...</p>
          </div>
        </div>
      </div>
    </ContainerIndices>
  );
};

export default memo(IndiceFuturos); 