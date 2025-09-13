import React, { useEffect, useState } from 'react';

const MarketDataStream = () => {
  const [dataPoints, setDataPoints] = useState([]);

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
    const interval = setInterval(() => {
      const randomData = marketData[Math.floor(Math.random() * marketData.length)];
      const newDataPoint = {
        id: Date.now(),
        ...randomData,
        change: (Math.random() > 0.5 ? '+' : '-') + (Math.random() * 10).toFixed(2)
      };

      setDataPoints(prev => [...prev, newDataPoint].slice(-3)); // Manter apenas 3 pontos
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 1,
      overflow: 'hidden'
    }}>
      {dataPoints.map((data, index) => (
        <div
          key={data.id}
          style={{
            position: 'absolute',
            top: `${20 + index * 25}%`,
            left: '-200px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(15, 23, 42, 0.9)',
            padding: '8px 16px',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(249, 115, 22, 0.2)',
            animation: `dataStream 12s linear infinite`,
            animationDelay: `${index * 1}s`,
            fontSize: '12px',
            fontFamily: 'monospace',
            fontWeight: '600'
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