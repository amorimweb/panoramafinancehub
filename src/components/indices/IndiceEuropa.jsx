import React, { useEffect, useRef, memo } from 'react';
import ContainerIndices from './ContainerIndices';

const IndiceEuropa = () => {
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
          console.log('IndiceEuropa widget carregado com sucesso');
          scriptLoaded.current = true;
        };
        
        script.onerror = (error) => {
          console.warn('Erro ao carregar widget de índices europeus:', error);
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
          "columns": ["name", "last", "change", "changePct"],
          "symbolsGroups": [
            {
              "name": "Europa",
              "symbols": [
                {
                  "name": "ACTIVTRADES:EURO50",
                  "displayName": "Euro Stoxx 50"
                },
                {
                  "name": "IG:FTSE",
                  "displayName": "FTSE 100"
                },
                {
                  "name": "BOATS:DAX",
                  "displayName": "DAX"
                },
                {
                  "name": "INDEX:CAC40",
                  "displayName": "CAC40"
                },
                {
                  "name": "PHILLIPNOVA:IBEX35",
                  "displayName": "IBEX35"
                },
                {
                  "name": "INDEX:FTSEMIB",
                  "displayName": "FTSE MIB"
                }
              ]
            }
          ]
        });
        
        containerRef.current.appendChild(script);
        
        // Adicionar copyright
        const copyrightDiv = document.createElement('div');
        copyrightDiv.className = 'tradingview-widget-copyright';
        copyrightDiv.innerHTML = '<a href="https://br.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text">Track all markets on TradingView</span></a>';
        containerRef.current.appendChild(copyrightDiv);
        
      } catch (error) {
        console.warn('Erro ao criar widget de índices europeus:', error);
      }
    };

    // Delay para evitar conflitos com outros widgets
    const timeoutId = setTimeout(loadWidget, 500);

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
    <ContainerIndices title="Europa">
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
            <p className="text-muted small">Carregando Índices Europeus...</p>
          </div>
        </div>
      </div>
    </ContainerIndices>
  );
};

export default memo(IndiceEuropa); 