import React, { useEffect, useRef, memo } from 'react';

const Grafico = () => {
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
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
        script.type = "text/javascript";
        script.async = true;
        
        script.onload = () => {
          console.log('Gráfico widget carregado com sucesso');
          scriptLoaded.current = true;
        };
        
        script.onerror = (error) => {
          console.warn('Erro ao carregar widget de gráfico:', error);
        };
        
        script.innerHTML = JSON.stringify({
          "lineWidth": 2,
          "lineType": 0,
          "chartType": "area",
          "fontColor": "rgb(106, 109, 120)",
          "gridLineColor": "rgba(242, 242, 242, 0.06)",
          "volumeUpColor": "rgba(34, 171, 148, 0.5)",
          "volumeDownColor": "rgba(247, 82, 95, 0.5)",
          "backgroundColor": "#0F0F0F",
          "widgetFontColor": "#DBDBDB",
          "upColor": "#22ab94",
          "downColor": "#f7525f",
          "borderUpColor": "#22ab94",
          "borderDownColor": "#f7525f",
          "wickUpColor": "#22ab94",
          "wickDownColor": "#f7525f",
          "colorTheme": "dark",
          "isTransparent": false,
          "locale": "br",
          "chartOnly": false,
          "scalePosition": "right",
          "scaleMode": "Normal",
          "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
          "valuesTracking": "1",
          "changeMode": "price-and-percent",
          "symbols": [
            [
              "NASDAQ:NVDA|1D"
            ]
          ],
          "dateRanges": [
            "1d|1",
            "1m|30",
            "3m|60",
            "12m|1D",
            "60m|1W",
            "all|1M"
          ],
          "fontSize": "10",
          "headerFontSize": "medium",
          "autosize": false,
          "width": "100%",
          "height": "500",
          "noTimeScale": false,
          "hideDateRanges": false,
          "hideMarketStatus": false,
          "hideSymbolLogo": false
        });
        
        containerRef.current.appendChild(script);
        
        // Adicionar copyright
        // const copyrightDiv = document.createElement('div');
        // copyrightDiv.className = 'tradingview-widget-copyright';
        // copyrightDiv.innerHTML = '<a href="https://br.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text">Track all markets on TradingView</span></a>';
        // containerRef.current.appendChild(copyrightDiv);
        
      } catch (error) {
        console.warn('Erro ao criar widget de gráfico:', error);
      }
    };

    // Delay para evitar conflitos com outros widgets
    const timeoutId = setTimeout(loadWidget, 1800);

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
    <div 
      className="chart-container"
      style={{
        background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)',
        backdropFilter: 'blur(25px)',
        border: '1px solid rgba(249, 115, 22, 0.2)',
        borderRadius: '20px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(249, 115, 22, 0.1)',
        padding: '1.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Header do Gráfico */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center">
          <div 
            className="me-4 rounded-4 d-flex align-items-center justify-content-center"
            style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.9), rgba(234, 88, 12, 0.8))',
              boxShadow: '0 8px 25px rgba(249, 115, 22, 0.4), 0 0 30px rgba(249, 115, 22, 0.2)',
              border: '2px solid rgba(249, 115, 22, 0.3)',
              fontSize: '20px'
            }}
          >
            ▲
          </div>
                     <div>
             <div style={{ fontSize: '1.8rem', letterSpacing: '-0.5px' }} className="text-white fw-bold">
               NVIDIA Analysis
             </div>
             <small 
               className="fw-medium d-block text-white" 
               style={{ 
                 fontSize: '12px', 
                 letterSpacing: '1px',
                 marginTop: '2px',
                 color: 'rgba(156, 163, 175, 0.8)'
               }}
             >
               Análise técnica completa da NVDA
             </small>
           </div>
         </div>
         <div 
           className="badge px-2 py-1"
           style={{
             background: 'rgba(249, 115, 22, 0.2)',
             color: '#f97316',
             border: '1px solid rgba(249, 115, 22, 0.3)',
             borderRadius: '8px',
             fontSize: '10px',
             fontWeight: '600',
             textTransform: 'uppercase',
             letterSpacing: '0.5px'
           }}
         >
           NVDA
         </div>
      </div>

      {/* Widget Container */}
      <div 
        className="tradingview-widget-container"
        ref={containerRef}
        style={{ 
          height: '500px',
          minHeight: '500px', 
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '12px'
        }}
      >
        <div className="d-flex align-items-center justify-content-center h-100">
          <div className="text-center">
            <div className="spinner-border text-warning mb-2" role="status" style={{width: '1.5rem', height: '1.5rem'}}>
              <span className="visually-hidden">Carregando...</span>
            </div>
            <p className="text-muted small">Carregando Gráficos...</p>
          </div>
        </div>
      </div>

      {/* Overlay sutil */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(249, 115, 22, 0.5), transparent)',
          zIndex: 10
        }}
      ></div>
    </div>
  );
};

export default memo(Grafico); 