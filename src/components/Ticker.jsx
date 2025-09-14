import React, { useEffect, useRef, memo, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Ticker = () => {
  const containerRef = useRef(null);
  const scriptLoaded = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const { colorTheme, isDarkMode, colors } = useTheme();

  // Detectar se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
        script.type = "text/javascript";
        script.async = true;
        
        script.onload = () => {
          console.log('Ticker widget carregado com sucesso');
          scriptLoaded.current = true;
        };
        
        script.onerror = (error) => {
          console.warn('Erro ao carregar widget de ticker:', error);
        };

        const baseConfig = {
          "symbols": [
            {
              "proName": "FOREXCOM:SPXUSD",
              "title": "S&P 500 Index"
            },
            {
              "proName": "FOREXCOM:NSXUSD",
              "title": "US 100 Cash CFD"
            },
            {
              "proName": "FOREXCOM:DJI",
              "title": "Dow Jones Industrial Average Index"
            },
            {
              "proName": "INDEX:BTCUSD",
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
          "colorTheme": colorTheme,
          "locale": "br",
          "largeChartUrl": "",
          "isTransparent": false,
          "showSymbolLogo": true,
          "width": "100%",
          "height": isMobile ? 46 : 46
        };

        // Configurações específicas para desktop
        if (!isMobile) {
          baseConfig.displayMode = "regular";
        } else {
          baseConfig.displayMode = "adaptive";
        }

        script.innerHTML = JSON.stringify(baseConfig);
        
        containerRef.current.appendChild(script);
        
      } catch (error) {
        console.warn('Erro ao criar widget de ticker:', error);
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
  }, [isMobile, colorTheme]); // Recarregar quando tema ou mobile mudar

  const handleReload = () => {
    console.log('Recarregando ticker...');
    scriptLoaded.current = false;
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }
    // Recarregar o widget
    const timeoutId = setTimeout(() => {
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
          script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
          script.type = "text/javascript";
          script.async = true;
          
          script.onload = () => {
            console.log('Ticker widget carregado com sucesso');
            scriptLoaded.current = true;
          };
          
          script.onerror = (error) => {
            console.warn('Erro ao carregar widget de ticker:', error);
          };

          const baseConfig = {
            "symbols": [
              {
                "proName": "FOREXCOM:SPXUSD",
                "title": "S&P 500 Index"
              },
              {
                "proName": "FOREXCOM:NSXUSD",
                "title": "US 100 Cash CFD"
              },
              {
                "proName": "FOREXCOM:DJI",
                "title": "Dow Jones Industrial Average Index"
              },
              {
                "proName": "INDEX:BTCUSD",
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
            "colorTheme": colorTheme,
            "locale": "br",
            "largeChartUrl": "",
            "isTransparent": false,
            "showSymbolLogo": true,
            "width": "100%",
            "height": isMobile ? 46 : 46
          };

          // Configurações específicas para desktop
          if (!isMobile) {
            baseConfig.displayMode = "regular";
          } else {
            baseConfig.displayMode = "adaptive";
          }

          script.innerHTML = JSON.stringify(baseConfig);
          
          containerRef.current.appendChild(script);
          
        } catch (error) {
          console.warn('Erro ao criar widget de ticker:', error);
        }
      };
      loadWidget();
    }, 100);
    
    return () => clearTimeout(timeoutId);
  };

  return (
    <div 
      className="ticker-container mb-4"
      style={{
        background: colors.cardBg,
        backdropFilter: 'blur(25px)',
        border: `1px solid ${colors.border}`,
        borderRadius: '20px',
        boxShadow: isDarkMode 
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(249, 115, 22, 0.1)'
          : '0 8px 25px -8px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(249, 115, 22, 0.1)',
        padding: '1rem',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease'
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
            className="mb-0 fw-bold" 
            style={{ 
              fontSize: '14px',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              textShadow: isDarkMode 
                ? '0 0 10px rgba(249, 115, 22, 0.3)' 
                : '0 1px 2px rgba(0, 0, 0, 0.1)',
              color: colors.text
            }}
          >
            {isMobile ? 'Ticker Tape' : 'Mercado ao Vivo'}
          </h6>
        </div>
        <div className="d-flex align-items-center">
          {/* Botão de Reload */}
          <button
            onClick={handleReload}
            className="btn btn-sm me-2 p-2 d-flex align-items-center justify-content-center"
            style={{
              background: isDarkMode 
                ? 'rgba(249, 115, 22, 0.1)'
                : 'rgba(249, 115, 22, 0.08)',
              border: `1px solid ${colors.border}`,
              borderRadius: '8px',
              width: '32px',
              height: '32px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = isDarkMode 
                ? 'rgba(249, 115, 22, 0.2)'
                : 'rgba(249, 115, 22, 0.15)';
              e.target.style.borderColor = 'rgba(249, 115, 22, 0.5)';
              e.target.style.transform = 'scale(1.1) rotate(180deg)';
              e.target.style.boxShadow = '0 4px 15px rgba(249, 115, 22, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = isDarkMode 
                ? 'rgba(249, 115, 22, 0.1)'
                : 'rgba(249, 115, 22, 0.08)';
              e.target.style.borderColor = colors.border;
              e.target.style.transform = 'scale(1) rotate(0deg)';
              e.target.style.boxShadow = 'none';
            }}
            title="Recarregar Ticker"
          >
            <span 
              style={{ 
                fontSize: '14px',
                color: '#f97316',
                textShadow: isDarkMode 
                  ? '0 0 10px rgba(249, 115, 22, 0.5)'
                  : '0 1px 2px rgba(249, 115, 22, 0.3)'
              }}
            >
              🔄
            </span>
          </button>
          
          <div 
            className="badge px-2 py-1"
            style={{
              background: isDarkMode 
                ? 'rgba(16, 185, 129, 0.2)'
                : 'rgba(16, 185, 129, 0.15)',
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
          </div>
        </div>
      </div>

      {/* Widget Container */}
      <div 
        className="tradingview-widget-container"
        ref={containerRef}
        style={{ 
          minHeight: isMobile ? '60px' : '60px', 
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
            <p className="small" style={{ color: colors.textMuted }}>
              Carregando Ticker...
            </p>
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

export default memo(Ticker); 