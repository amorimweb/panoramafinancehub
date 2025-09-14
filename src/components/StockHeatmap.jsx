import React, { useEffect, useRef, memo, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useTheme } from '../contexts/ThemeContext';

const StockHeatmap = () => {
  const containerRef = useRef(null);
  const scriptLoaded = useRef(false);
  const { colorTheme, isDarkMode, colors } = useTheme();
  const [widgetHeight, setWidgetHeight] = useState(600);

  // Altura responsiva baseada no viewport
  useEffect(() => {
    const computeHeight = () => {
      const w = window.innerWidth;
      if (w <= 480) return 360;
      if (w <= 576) return 420;
      if (w <= 768) return 520;
      return 600;
    };
    const apply = () => setWidgetHeight(computeHeight());
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
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js";
        script.type = "text/javascript";
        script.async = true;
        
        script.onload = () => {
          console.log('Heatmap widget carregado com sucesso');
          scriptLoaded.current = true;
        };
        
        script.onerror = (error) => {
          console.warn('Erro ao carregar widget de heatmap:', error);
        };
        
        script.innerHTML = JSON.stringify({
          "dataSource": "SPX500",
          "blockSize": "market_cap_basic",
          "blockColor": "change|60",
          "grouping": "sector",
          "locale": "br",
          "symbolUrl": "",
          "colorTheme": colorTheme,
          "exchanges": [
            "NASDAQ"
          ],
          "hasTopBar": false,
          "isDataSetEnabled": false,
          "isZoomEnabled": true,
          "hasSymbolTooltip": true,
          "isMonoSize": false,
          "width": "100%",
          "height": widgetHeight
        });
        
        containerRef.current.appendChild(script);
        
      } catch (error) {
        console.warn('Erro ao criar widget de heatmap:', error);
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
  }, [colorTheme, widgetHeight]); // Recarregar quando o tema ou altura mudar

  return (
    <Card className="h-100" style={{ 
      backgroundColor: colors.cardBg,
      border: `1px solid ${colors.border}`,
      transition: 'all 0.3s ease'
    }}>
      <Card.Header style={{
        background: isDarkMode 
          ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)'
          : 'linear-gradient(135deg, rgba(241, 245, 249, 0.9) 0%, rgba(226, 232, 240, 0.9) 100%)',
        borderBottom: `1px solid ${colors.border}`,
        transition: 'all 0.3s ease'
      }}>
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="bg-accent-orange rounded d-flex align-items-center justify-content-center me-2" 
                 style={{width: '24px', height: '24px'}}>
              <span className="text-white fw-bold" style={{fontSize: '12px'}}>🔥</span>
            </div>
            <h6 className="mb-0 fw-bold" style={{ 
              color: colors.text,
              textShadow: isDarkMode 
                ? '0 0 5px rgba(249, 115, 22, 0.2)' 
                : '0 1px 2px rgba(0, 0, 0, 0.1)'
            }}>
              Mapa de Calor - S&P 500 (NASDAQ)
            </h6>
          </div>
          <div className="d-flex align-items-center">
            <small className="me-2" style={{ color: colors.textMuted }}>
              Agrupado por Setor
            </small>
            <div className="bg-success rounded-circle" style={{width: '8px', height: '8px'}}></div>
          </div>
        </div>
      </Card.Header>
      
      <Card.Body className="p-3">
        <div 
          className="tradingview-widget-container"
          ref={containerRef}
          style={{ minHeight: `${widgetHeight}px`, height: `${widgetHeight}px` }}
        >
          <div className="d-flex align-items-center justify-content-center h-100">
            <div className="text-center">
              <div className="spinner-border text-warning mb-2" role="status" style={{width: '1.5rem', height: '1.5rem'}}>
                <span className="visually-hidden">Carregando...</span>
              </div>
              <p className="small" style={{ color: colors.textMuted }}>
                Carregando Mapa de Calor...
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-3 pt-2" style={{ 
          borderTop: `1px solid ${colors.border}`,
          transition: 'all 0.3s ease'
        }}>
          <div className="row text-center g-2">
            <div className="col-3">
              <small className="d-block" style={{fontSize: '0.7rem', color: colors.textMuted}}>
                Exchange
              </small>
              <small className="fw-bold" style={{fontSize: '0.75rem', color: colors.text}}>
                NASDAQ
              </small>
            </div>
            <div className="col-3">
              <small className="d-block" style={{fontSize: '0.7rem', color: colors.textMuted}}>
                Agrupamento
              </small>
              <small className="fw-bold" style={{fontSize: '0.75rem', color: colors.text}}>
                Setor
              </small>
            </div>
            <div className="col-3">
              <small className="d-block" style={{fontSize: '0.7rem', color: colors.textMuted}}>
                Cores
              </small>
              <small className="fw-bold" style={{fontSize: '0.75rem', color: colors.text}}>
                Variação 60min
              </small>
            </div>
            <div className="col-3">
              <small className="text-success fw-bold" style={{fontSize: '0.75rem'}}>● Live</small>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default memo(StockHeatmap); 