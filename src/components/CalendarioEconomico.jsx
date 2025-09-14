import React, { useEffect, useRef, memo } from 'react';
import { Card } from 'react-bootstrap';
import { useTheme } from '../contexts/ThemeContext';

const CalendarioEconomico = () => {
  const containerRef = useRef(null);
  const scriptLoaded = useRef(false);
  const { colorTheme, isDarkMode, colors } = useTheme();

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
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
        script.type = "text/javascript";
        script.async = true;
        
        script.onload = () => {
          console.log('Calendário Econômico widget carregado com sucesso');
          scriptLoaded.current = true;
        };
        
        script.onerror = (error) => {
          console.warn('Erro ao carregar widget de calendário econômico:', error);
        };
        
        script.innerHTML = JSON.stringify({
          "colorTheme": colorTheme,
          "isTransparent": false,
          "width": "100%",
          "height": 550,
          "locale": "br",
          "importanceFilter": "-1,0,1",
          "countryFilter": "us"
        });
        
        containerRef.current.appendChild(script);
        
      } catch (error) {
        console.warn('Erro ao criar widget de calendário econômico:', error);
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
              <span className="text-white fw-bold" style={{fontSize: '12px'}}>📅</span>
            </div>
            <h6 className="mb-0 fw-bold" style={{ 
              color: colors.text,
              textShadow: isDarkMode 
                ? '0 0 5px rgba(249, 115, 22, 0.2)' 
                : '0 1px 2px rgba(0, 0, 0, 0.1)'
            }}>
              Calendário Econômico
            </h6>
          </div>
          <div className="d-flex align-items-center">
            <small className="me-2" style={{ color: colors.textMuted }}>
              Eventos Globais
            </small>
            <div className="bg-success rounded-circle" style={{width: '8px', height: '8px'}}></div>
          </div>
        </div>
      </Card.Header>
      
      <Card.Body className="p-3">
        <div 
          className="tradingview-widget-container"
          ref={containerRef}
          style={{ minHeight: '500px', height: '70vh' }}
        >
          <div className="d-flex align-items-center justify-content-center h-100">
            <div className="text-center">
              <div className="spinner-border text-warning mb-2" role="status" style={{width: '1.5rem', height: '1.5rem'}}>
                <span className="visually-hidden">Carregando...</span>
              </div>
              <p className="small" style={{ color: colors.textMuted }}>
                Carregando Calendário...
              </p>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default memo(CalendarioEconomico); 