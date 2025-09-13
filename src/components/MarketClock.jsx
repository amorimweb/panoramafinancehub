import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';

const MarketClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const markets = [
    {
      name: 'NYSE',
      timezone: 'America/New_York',
      openTime: { hours: 9, minutes: 30 },
      closeTime: { hours: 16, minutes: 0 },
      flag: '🇺🇸'
    },
    {
      name: 'NASDAQ',
      timezone: 'America/New_York',
      openTime: { hours: 9, minutes: 30 },
      closeTime: { hours: 16, minutes: 0 },
      flag: '🇺🇸'
    },
    {
      name: 'LSE',
      timezone: 'Europe/London',
      openTime: { hours: 8, minutes: 0 },
      closeTime: { hours: 16, minutes: 30 },
      flag: '🇬🇧'
    },
    {
      name: 'TSE',
      timezone: 'Asia/Tokyo',
      openTime: { hours: 9, minutes: 0 },
      closeTime: { hours: 15, minutes: 0 },
      flag: '🇯🇵'
    },
    {
      name: 'B3',
      timezone: 'America/Sao_Paulo',
      openTime: { hours: 10, minutes: 0 },
      closeTime: { hours: 17, minutes: 0 },
      flag: '🇧🇷'
    },
    {
      name: 'HKEX',
      timezone: 'Asia/Hong_Kong',
      openTime: { hours: 9, minutes: 30 },
      closeTime: { hours: 16, minutes: 0 },
      flag: '🇭🇰'
    }
  ];

  const getMarketTime = (timezone) => {
    return new Date().toLocaleTimeString('pt-BR', {
      timeZone: timezone,
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const isMarketOpen = (market) => {
    const now = new Date();
    const marketTime = new Date(now.toLocaleString('en-US', { timeZone: market.timezone }));
    const currentHour = marketTime.getHours();
    const currentMinute = marketTime.getMinutes();
    const currentDay = marketTime.getDay(); // 0 = Sunday, 6 = Saturday
    
    // Check if it's weekend
    if (currentDay === 0 || currentDay === 6) return false;
    
    const openMinutes = market.openTime.hours * 60 + market.openTime.minutes;
    const closeMinutes = market.closeTime.hours * 60 + market.closeTime.minutes;
    const currentMinutes = currentHour * 60 + currentMinute;
    
    return currentMinutes >= openMinutes && currentMinutes <= closeMinutes;
  };

  const getMarketStatus = (market) => {
    const isOpen = isMarketOpen(market);
    const now = new Date();
    const currentDay = now.getDay();
    
    if (currentDay === 0 || currentDay === 6) {
      return { status: 'Fechado', variant: 'secondary', text: 'Fim de semana' };
    }
    
    if (isOpen) {
      return { status: 'Aberto', variant: 'success', text: 'Negociando' };
    } else {
      return { status: 'Fechado', variant: 'danger', text: 'Fora do horário' };
    }
  };

  return (
    <Card className="card-dark h-100">
      <Card.Header className="bg-primary-dark border-0">
        <div className="d-flex align-items-center">
          <div className="bg-accent-orange rounded d-flex align-items-center justify-content-center me-2" 
               style={{width: '24px', height: '24px'}}>
            <span className="text-white fw-bold" style={{fontSize: '12px'}}>🕒</span>
          </div>
          <h6 className="text-white mb-0 fw-bold">Relógio de Mercados</h6>
        </div>
      </Card.Header>
      <Card.Body className="p-3">
        <Row className="g-2">
          {markets.map((market, index) => {
            const marketStatus = getMarketStatus(market);
            return (
              <Col xs={6} lg={4} key={index}>
                <div className="market-item p-2 rounded border border-secondary">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <div className="d-flex align-items-center">
                      <span className="me-2">{market.flag}</span>
                      <strong className="text-white small">{market.name}</strong>
                    </div>
                    <Badge bg={marketStatus.variant} className="small">
                      {marketStatus.status}
                    </Badge>
                  </div>
                  <div className="text-light-gray small mb-1">
                    {getMarketTime(market.timezone)}
                  </div>
                  <div className="text-muted" style={{fontSize: '11px'}}>
                    {market.openTime.hours.toString().padStart(2, '0')}:
                    {market.openTime.minutes.toString().padStart(2, '0')} - 
                    {market.closeTime.hours.toString().padStart(2, '0')}:
                    {market.closeTime.minutes.toString().padStart(2, '0')}
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
        
        <div className="text-center mt-3 pt-3 border-top border-secondary">
          <div className="text-light-gray small">
            Horário Local: {currentTime.toLocaleTimeString('pt-BR')}
          </div>
          <div className="text-muted" style={{fontSize: '11px'}}>
            {currentTime.toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MarketClock; 