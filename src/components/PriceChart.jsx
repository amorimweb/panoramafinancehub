import React from 'react';
import { Card } from 'react-bootstrap';

const PriceChart = () => {
  return (
    <Card className="card-dark h-100">
      <Card.Header className="bg-dark-700 border-dark-700">
        <h6 className="text-white mb-0">📈 Gráfico de Preços</h6>
      </Card.Header>
      <Card.Body className="p-0">
        <div className="position-relative" style={{ minHeight: '400px' }}>
          <iframe 
            height="400" 
            width="100%" 
            src="https://ssltvc.investing.com/?pair_ID=6395&height=400&width=650&interval=1800&plotStyle=candles&domain_ID=30&lang_ID=12&timezone_ID=10"
            frameBorder="0"
            allowTransparency="true"
            marginWidth="0"
            marginHeight="0"
            title="Gráfico de Preços"
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default PriceChart; 