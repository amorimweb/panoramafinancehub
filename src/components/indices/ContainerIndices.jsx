import React from 'react';
import { Card } from 'react-bootstrap';

const ContainerIndices = ({ title = "América", children, isActive = false }) => {
  return (
    <Card 
      className="card-dark h-100" 
      style={{ 
        backgroundColor: '#0F0F0F',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden'
      }}
    >
      <Card.Header className="border-0" style={{ backgroundColor: '#0F0F0F' }}>
        <div className="d-flex align-items-center">
          <div 
            className="me-2"
            style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#dc3545',
              borderRadius: '50%'
            }}
          ></div>
          <h6 className="text-white mb-0 fw-bold">
            {title}
          </h6>
        </div>
      </Card.Header>
      
      <Card.Body 
        className="p-0" 
        style={{ 
          backgroundColor: '#0F0F0F',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {children}
      </Card.Body>
    </Card>
  );
};

export default ContainerIndices; 