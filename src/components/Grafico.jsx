import React, { useEffect, useRef, memo, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useTheme } from '../contexts/ThemeContext';

const Grafico = () => {
  const containerRef = useRef(null);
  const scriptLoaded = useRef(false);
  const { colorTheme, isDarkMode, colors } = useTheme();
  const [chartHeight, setChartHeight] = useState(500);

  // Altura responsiva
  useEffect(() => {
    const computeHeight = () => {
      const w = window.innerWidth;
      if (w <= 480) return 380;
      if (w <= 576) return 420;
      if (w <= 768) return 480;
      return 520;
    };
    const apply = () => setChartHeight(computeHeight());
    apply();
    window.addEventListener('resize', apply);
    return () => window.removeEventListener('resize', apply);
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
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;
        
        script.onload = () => {
          console.log('Gráfico widget carregado com sucesso');
          scriptLoaded.current = true;
        };
        
        script.onerror = (error) => {
          console.warn('Erro ao carregar widget de gráfico:', error);
        };

        const chartConfig = {
          "autosize": true,
          "symbol": "NASDAQ:NVDA",
          "interval": "D",
          "timezone": "America/Sao_Paulo",
          "theme": colorTheme,
          "style": "1",
          "gridLineColor": isDarkMode ? "rgba(242, 242, 242, 0.06)" : "rgba(42, 46, 57, 0.06)",
          "volumeUpColor": "rgba(34, 171, 148, 0.5)",
          "volumeDownColor": "rgba(247, 82, 95, 0.5)",
          "backgroundColor": isDarkMode ? "#0F0F0F" : "#FFFFFF",
          "widgetFontColor": isDarkMode ? "#DBDBDB" : "#363A45",
          "upColor": "#22ab94",
          "downColor": "#f7525f",
          "borderUpColor": "#22ab94",
          "borderDownColor": "#f7525f",
          "wickUpColor": "#22ab94",
          "wickDownColor": "#f7525f",
          "colorTheme": colorTheme,
          "isTransparent": false,
          "locale": "br",
          "chartOnly": false,
          "scalePosition": "right",
          "scaleMode": "Normal",
          "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
          "valuesTracking": "1",
          "changeMode": "price-and-percent",
          "width": "100%",
          "height": chartHeight,
          "container_id": "tradingview_chart"
        };
        
        script.innerHTML = JSON.stringify(chartConfig);
        
        containerRef.current.appendChild(script);
        
      } catch (error) {
        console.warn('Erro ao criar widget de gráfico:', error);
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
  }, [colorTheme, isDarkMode, chartHeight]); // Recarregar quando o tema ou altura mudar

  return (
    <div 
      className="chart-container"
      style={{
        background: colors.cardBg,
        backdropFilter: 'blur(25px)',
        border: `1px solid ${colors.border}`,
        borderRadius: '20px',
        boxShadow: isDarkMode 
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(249, 115, 22, 0.1)'
          : '0 8px 25px -8px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(249, 115, 22, 0.1)',
        padding: '1.5rem',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease'
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
              boxShadow: isDarkMode 
                ? '0 8px 25px rgba(249, 115, 22, 0.4), 0 0 30px rgba(249, 115, 22, 0.2)'
                : '0 4px 15px rgba(249, 115, 22, 0.3)',
              border: `2px solid ${colors.border}`,
              fontSize: '20px'
            }}
          >
            📈
          </div>
          <div>
            <div style={{ 
              fontSize: '1.8rem', 
              letterSpacing: '-0.5px',
              color: colors.text,
              textShadow: isDarkMode 
                ? '0 0 5px rgba(249, 115, 22, 0.2)' 
                : '0 1px 2px rgba(0, 0, 0, 0.1)'
            }} className="fw-bold">
              NVIDIA Analysis
            </div>
            <small 
              className="fw-medium d-block" 
              style={{ 
                fontSize: '12px', 
                letterSpacing: '1px',
                marginTop: '2px',
                color: colors.textMuted
              }}
            >
              Análise técnica completa da NVDA
            </small>
          </div>
        </div>
        <div 
          className="badge px-2 py-1"
          style={{
            background: isDarkMode 
              ? 'rgba(249, 115, 22, 0.2)'
              : 'rgba(249, 115, 22, 0.15)',
            color: '#f97316',
            border: `1px solid ${colors.border}`,
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
          height: `${chartHeight}px`,
          minHeight: `${chartHeight}px`, 
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
            <p className="small" style={{ color: colors.textMuted }}>
              Carregando Gráficos...
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

export default memo(Grafico); 