import React from 'react';

const TradingIndicators = () => {
  return (
    <div className="trading-indicators-container" style={{
      position: 'fixed',
      bottom: '120px',
      right: '30px',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      zIndex: 999
    }}>
      {/* Volume Bars */}
      <div style={{
        display: 'flex',
        alignItems: 'end',
        gap: '3px',
        height: '40px',
        background: 'rgba(15, 23, 42, 0.9)',
        padding: '8px',
        borderRadius: '10px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(249, 115, 22, 0.2)'
      }}>
        {[20, 45, 30, 60, 35, 80, 25, 55].map((height, index) => (
          <div
            key={index}
            className="volume-indicator"
            style={{
              width: '4px',
              height: `${height}%`,
              background: 'linear-gradient(to top, rgba(249, 115, 22, 0.8), rgba(249, 115, 22, 0.4))',
              borderRadius: '2px',
              animationDelay: `${index * 0.2}s`
            }}
          />
        ))}
        <span style={{
          fontSize: '10px',
          color: '#f97316',
          marginLeft: '8px',
          fontWeight: '600'
        }}>VOL</span>
      </div>

      {/* Market Status Indicator */}
      <div className="trading-indicator" style={{
        background: 'rgba(15, 23, 42, 0.9)',
        padding: '8px 12px',
        borderRadius: '10px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(249, 115, 22, 0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#22c55e',
          boxShadow: '0 0 10px rgba(34, 197, 94, 0.5)',
          animation: 'pulse 2s ease-in-out infinite'
        }} />
        <span style={{
          fontSize: '11px',
          color: '#ffffff',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>LIVE</span>
      </div>

      {/* Price Movement Indicator */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.9)',
        padding: '8px 12px',
        borderRadius: '10px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(249, 115, 22, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px'
      }}>
        <div style={{
          fontSize: '12px',
          color: '#22c55e',
          fontWeight: '700',
          fontFamily: 'monospace'
        }} className="price-up">
          +2.45%
        </div>
        <div style={{
          fontSize: '8px',
          color: '#9ca3af',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          S&P 500
        </div>
      </div>
    </div>
  );
};

export default TradingIndicators; 