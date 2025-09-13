import React, { useEffect, useRef, memo } from 'react';

const Ticker = () => {
  const containerRef = useRef(null);
  const scriptLoaded = useRef(false);

  const loadWidget = () => {
    if (!containerRef.current) {
      return;
    }

    try {
      // Limpar container antes de adicionar novo script
      containerRef.current.innerHTML = '';
      scriptLoaded.current = false;
      
      const widgetContainer = document.createElement('div');
      widgetContainer.className = 'tradingview-widget-container__widget';
      containerRef.current.appendChild(widgetContainer);

      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-tickers.js";
      script.type = "text/javascript";
      script.async = true;
      
      script.onload = () => {
        console.log('Ticker widget carregado com sucesso');
        scriptLoaded.current = true;
      };
      
      script.onerror = (error) => {
        console.warn('Erro ao carregar widget ticker:', error);
      };
      
      script.innerHTML = JSON.stringify({
        "symbols": [
          {
            "proName": "FOREXCOM:SPXUSD",
            "title": "S&P 500 Index"
          },
          {
            "proName": "BITSTAMP:BTCUSD",
            "title": "Bitcoin"
          },
          {
            "proName": "BITSTAMP:ETHUSD",
            "title": "Ethereum"
          },
          {
            "proName": "CAPITALCOM:VIX",
            "title": "VIX"
          }
        ],
        "colorTheme": "dark",
        "locale": "br",
        "largeChartUrl": "",
        "isTransparent": true,
        "showSymbolLogo": true
      });
      
      containerRef.current.appendChild(script);
      
      // Adicionar copyright
    //   const copyrightDiv = document.createElement('div');
    //   copyrightDiv.className = 'tradingview-widget-copyright';
    // //   copyrightDiv.innerHTML = '<a href="https://br.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text">Track all markets on TradingView</span></a>';
    //   containerRef.current.appendChild(copyrightDiv);
      
    } catch (error) {
      console.warn('Erro ao criar widget ticker:', error);
    }
  };

  const handleReload = () => {
    console.log('Recarregando ticker...');
    loadWidget();
  };

  useEffect(() => {
    // Delay para evitar conflitos com outros widgets
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
    <div 
      className="ticker-container mb-4"
      style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)',
        backdropFilter: 'blur(25px)',
        border: '1px solid rgba(249, 115, 22, 0.2)',
        borderRadius: '20px',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(249, 115, 22, 0.1)',
        padding: '1rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Header do Ticker */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center">
          <div 
            className="me-3 d-flex align-items-center justify-content-center"
            style={{
              width: '12px',
              height: '12px',
              backgroundColor: '#f97316',
              borderRadius: '50%',
              boxShadow: '0 0 15px rgba(249, 115, 22, 0.6)',
              animation: 'pulse 2s ease-in-out infinite'
            }}
          >
            <div 
              style={{
                width: '6px',
                height: '6px',
                backgroundColor: 'white',
                borderRadius: '50%',
                opacity: 0.9
              }}
            ></div>
          </div>
          <h6 
            className="text-white mb-0 fw-bold" 
            style={{ 
              fontSize: '14px',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              textShadow: '0 0 10px rgba(249, 115, 22, 0.3)'
            }}
          >
            Mercado
          </h6>
        </div>
        <div className="d-flex align-items-center">
          {/* Botão de Reload */}
          <button
            onClick={handleReload}
            className="btn btn-sm me-2 p-2 d-flex align-items-center justify-content-center"
            style={{
              background: 'rgba(249, 115, 22, 0.1)',
              border: '1px solid rgba(249, 115, 22, 0.3)',
              borderRadius: '8px',
              width: '32px',
              height: '32px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(249, 115, 22, 0.2)';
              e.target.style.borderColor = 'rgba(249, 115, 22, 0.5)';
              e.target.style.transform = 'scale(1.1) rotate(180deg)';
              e.target.style.boxShadow = '0 4px 15px rgba(249, 115, 22, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(249, 115, 22, 0.1)';
              e.target.style.borderColor = 'rgba(249, 115, 22, 0.3)';
              e.target.style.transform = 'scale(1) rotate(0deg)';
              e.target.style.boxShadow = 'none';
            }}
            title="Recarregar Ticker"
          >
            <span 
              style={{ 
                fontSize: '14px',
                color: '#f97316',
                textShadow: '0 0 10px rgba(249, 115, 22, 0.5)'
              }}
            >
              🔄
            </span>
          </button>
          
          {/* <div 
            className="badge px-2 py-1"
            style={{
              background: 'rgba(16, 185, 129, 0.2)',
              color: '#10b981',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '8px',
              fontSize: '10px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            LIVE
          </div> */}
        </div>
      </div>

      {/* Widget Container */}
      <div 
        className="tradingview-widget-container"
        ref={containerRef}
        style={{ 
          minHeight: '80px', 
          width: '100%',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="d-flex align-items-center justify-content-center h-100">
          <div className="text-center">
            <div className="spinner-border text-warning mb-2" role="status" style={{width: '1rem', height: '1rem'}}>
              <span className="visually-hidden">Carregando...</span>
            </div>
            <p className="text-muted small">Carregando Ticker...</p>
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
          background: 'linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.5), transparent)',
          zIndex: 10
        }}
      ></div>
    </div>
  );
};

export default memo(Ticker); 