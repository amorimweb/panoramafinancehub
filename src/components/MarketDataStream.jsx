import React, { useEffect, useState } from 'react';

const MarketDataStream = () => {
  const [dataPoints, setDataPoints] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [canShowNew, setCanShowNew] = useState(true);

  const marketData = [
    { symbol: 'AAPL', price: '175.43', change: '+2.15' },
    { symbol: 'GOOGL', price: '138.21', change: '-1.23' },
    { symbol: 'MSFT', price: '378.85', change: '+3.45' },
    { symbol: 'NVDA', price: '461.30', change: '+12.67' },
    { symbol: 'TSLA', price: '248.50', change: '-5.21' },
    { symbol: 'AMZN', price: '145.86', change: '+1.89' },
    { symbol: 'META', price: '331.05', change: '+4.32' },
    { symbol: 'NFLX', price: '445.03', change: '-2.11' }
  ];

  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      if (!canShowNew) return;
      
      setCanShowNew(false); // Bloquear novos elementos
      
      const randomData = marketData[Math.floor(Math.random() * marketData.length)];
      
      // Gerar posição aleatória evitando áreas importantes
      const getRandomPosition = () => {
        let position;
        let attempts = 0;
        
        do {
          position = {
            top: Math.random() * 60 + 20, // Entre 20% e 80% da altura
            left: Math.random() * 70 + 15, // Entre 15% e 85% da largura
          };
          attempts++;
        } while (attempts < 10 && (
          // Evitar área do header (primeiros 15%)
          position.top < 15 ||
          // Evitar área dos botões laterais (últimos 15% da largura)
          position.left > 85
        ));
        
        return position;
      };
      
      const randomPosition = getRandomPosition();
      
      const newDataPoint = {
        id: Date.now(),
        ...randomData,
        change: (Math.random() > 0.5 ? '+' : '-') + (Math.random() * 10).toFixed(2),
        position: randomPosition
      };

      setDataPoints(prev => [...prev, newDataPoint].slice(-1)); // Manter apenas 1 ponto por vez
      
      // Remover o ponto após 2.5 segundos
      setTimeout(() => {
        setDataPoints(prev => prev.filter(item => item.id !== newDataPoint.id));
        
        // Aguardar mais 10 segundos antes de permitir novo elemento
        setTimeout(() => {
          setCanShowNew(true);
        }, 10000);
      }, 2500);
      
    }, 100); // Verificar rapidamente, mas controlado pelo canShowNew

    return () => clearInterval(interval);
  }, [isVisible, canShowNew]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 0,
      overflow: 'hidden',
      display: isVisible ? 'block' : 'none'
    }}>
      {dataPoints.map((data) => (
        <div
          key={data.id}
          style={{
            position: 'absolute',
            top: `${data.position.top}%`,
            left: `${data.position.left}%`,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(15, 23, 42, 0.6)',
            padding: '8px 14px',
            borderRadius: '18px',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(249, 115, 22, 0.15)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2), 0 0 5px rgba(249, 115, 22, 0.05)',
            animation: 'fadeInOut 2.5s ease-in-out',
            fontSize: '11px',
            fontFamily: 'monospace',
            fontWeight: '500',
            transform: 'translate(-50%, -50%)', // Centralizar no ponto
            zIndex: 100
          }}
        >
          <span style={{ color: '#f97316' }}>{data.symbol}</span>
          <span style={{ color: '#ffffff' }}>${data.price}</span>
          <span style={{ 
            color: data.change.startsWith('+') ? '#22c55e' : '#ef4444' 
          }}>
            {data.change}%
          </span>
        </div>
      ))}
    </div>
  );
};

export default MarketDataStream; 