import React from 'react';
import { Card } from 'react-bootstrap';
import { useTheme } from '../../contexts/ThemeContext';

const ContainerIndices = ({ title = "América", children, isActive = true }) => {
  const { isDarkMode, colors } = useTheme();
  
  return (
    <Card className="h-100" style={{ 
      backgroundColor: colors.cardBg,
      border: `1px solid ${colors.border}`,
      transition: 'all 0.3s ease'
    }}>
      <Card.Header 
        className="border-0 px-4 py-3" 
        style={{ 
          background: isDarkMode 
            ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.8))'
            : 'linear-gradient(135deg, rgba(241, 245, 249, 0.9), rgba(226, 232, 240, 0.8))',
          borderBottom: `1px solid ${colors.border}`,
          transition: 'all 0.3s ease'
        }}
      >
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div 
              className="me-3 d-flex align-items-center justify-content-center"
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: isActive ? '#f97316' : '#ef4444',
                borderRadius: '50%',
                boxShadow: `0 0 15px ${isActive ? 'rgba(249, 115, 22, 0.6)' : 'rgba(239, 68, 68, 0.6)'}`,
                animation: isActive ? 'pulse 2s ease-in-out infinite' : 'none'
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
              {title}
            </h6>
          </div>
          <div 
            className="badge px-2 py-1"
            style={{
              background: isActive 
                ? (isDarkMode ? 'rgba(249, 115, 22, 0.2)' : 'rgba(249, 115, 22, 0.15)') 
                : (isDarkMode ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.15)'),
              color: isActive ? '#f97316' : '#ef4444',
              border: `1px solid ${isActive ? 'rgba(249, 115, 22, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
              borderRadius: '8px',
              fontSize: '10px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            {isActive ? 'LIVE' : 'OFFLINE'}
          </div>
        </div>
      </Card.Header>
      
      <Card.Body className="p-0" style={{ position: 'relative', overflow: 'hidden' }}>
        {children}
        {/* Overlay sutil para melhor integração */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${isActive ? 'rgba(249, 115, 22, 0.5)' : 'rgba(239, 68, 68, 0.5)'}, transparent)`,
            zIndex: 10
          }}
        ></div>
      </Card.Body>
    </Card>
  );
};

export default ContainerIndices; 