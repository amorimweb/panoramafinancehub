import React, { useEffect, useRef, memo } from 'react';
import ContainerIndices from './ContainerIndices';
import { useTheme } from '../../contexts/ThemeContext';

const IndiceFuturos = () => {
  const containerRef = useRef(null);
  const scriptLoaded = useRef(false);
  const { colorTheme } = useTheme();

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
          "width": "100%",
          "height": "100%",
          "symbolsGroups": [
            {
              "name": "Futuros",
              "originalName": "Futuros",
              "symbols": [
                { "name": "CME_MINI:ES1!", "displayName": "S&P 500 Fut" },
                { "name": "CME_MINI:NQ1!", "displayName": "NASDAQ Fut" },
                { "name": "CBOT_MINI:YM1!", "displayName": "Dow Jones Fut" },
                { "name": "EUREX:FDAX1!", "displayName": "DAX Fut" },
                { "name": "CME:6E1!", "displayName": "Euro Fut" },
                { "name": "NYMEX:GC1!", "displayName": "Ouro Fut" }
              ]
            }
          ],
          "showSymbolLogo": true,
          "isTransparent": false,
          "colorTheme": colorTheme,
          "locale": "br"
        });
        
        containerRef.current.appendChild(script);
        
      } catch (error) {
        console.warn('Erro ao criar widget de contratos futuros:', error);
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
  }, [colorTheme]); // Recarregar quando o tema mudar

  return (
    <ContainerIndices title="Futuros">
      <div 
        className="tradingview-widget-container"
        ref={containerRef}
        style={{ 
          minHeight: '250px', 
          width: '100%',
          position: 'relative'
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