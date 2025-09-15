import React, { useEffect, useRef, memo } from 'react';
import ContainerIndices from './ContainerIndices';
import { useTheme } from '../../contexts/ThemeContext';

const IndiceComparativo = () => {
  const containerRef = useRef(null);
  const scriptLoaded = useRef(false);
  const { colorTheme } = useTheme();

  useEffect(() => {
    const loadWidget = () => {
      if (!containerRef.current || scriptLoaded.current) return;

      try {
        containerRef.current.innerHTML = '';

        const widgetContainer = document.createElement('div');
        widgetContainer.className = 'tradingview-widget-container__widget';
        containerRef.current.appendChild(widgetContainer);

        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js';
        script.type = 'text/javascript';
        script.async = true;

        script.onload = () => {
          scriptLoaded.current = true;
        };
        script.onerror = (err) => console.warn('Erro ao carregar widget comparativo:', err);

        const config = {
          width: '100%',
          height: '100%',
          symbolsGroups: [
            {
              name: 'Comparativo',
              symbols: [
                { name: 'FRED:NIKKEI225', displayName: 'Nikkei 225' },
                { name: 'BITSTAMP:ETHUSD', displayName: 'Ethereum' },
                { name: 'BITSTAMP:BTCUSD', displayName: 'Bitcoin' },
                { name: 'TICKMILL:DXY', displayName: 'Dolar DXY' },
                { name: 'FOREXCOM:XAUUSD', displayName: 'Ouro' }
              ]
            }
          ],
          showSymbolLogo: true,
          isTransparent: false,
          colorTheme: colorTheme,
          locale: 'br'
        };

        script.innerHTML = JSON.stringify(config);
        containerRef.current.appendChild(script);
      } catch (e) {
        console.warn('Erro ao criar widget comparativo:', e);
      }
    };

    const id = setTimeout(loadWidget, 100);
    return () => {
      clearTimeout(id);
      scriptLoaded.current = false;
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, [colorTheme]);

  return (
    <ContainerIndices title="Comparativo">
      <div
        className="tradingview-widget-container"
        ref={containerRef}
        style={{ minHeight: '400px', width: '100%', position: 'relative', overflow: 'hidden' }}
      >
        <div className="d-flex align-items-center justify-content-center h-100">
          <div className="text-center">
            <div className="spinner-border text-warning mb-2" role="status" style={{ width: '1.5rem', height: '1.5rem' }}>
              <span className="visually-hidden">Carregando...</span>
            </div>
            <p className="text-muted small">Carregando Comparativo...</p>
          </div>
        </div>
      </div>
    </ContainerIndices>
  );
};

export default memo(IndiceComparativo); 