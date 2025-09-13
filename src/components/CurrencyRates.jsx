import React from 'react';
import { Card } from 'react-bootstrap';

const CurrencyRates = () => {
  return (
    <Card className="card-dark h-100">
      <Card.Header className="bg-dark-700 border-dark-700">
        <h6 className="text-white mb-0">💱 Taxas de Câmbio</h6>
      </Card.Header>
      <Card.Body className="p-0">
        <div className="position-relative" style={{ minHeight: '300px' }}>
          <iframe 
            src="https://br.widgets.investing.com/live-currency-cross-rates?theme=darkTheme" 
            width="100%" 
            height="300" 
            frameBorder="0" 
            allowTransparency="true" 
            marginWidth="0" 
            marginHeight="0"
            title="Taxas de Câmbio"
          />
        </div>
        <div className="p-2 text-center border-top border-dark-700">
          <small className="text-gray-400">
            Desenvolvido por{' '}
            <a 
              href="https://br.investing.com?utm_source=WMT&utm_medium=referral&utm_campaign=LIVE_CURRENCY_X_RATES&utm_content=Footer%20Link" 
              target="_blank" 
              rel="nofollow noreferrer"
              className="text-accent-orange text-decoration-none"
            >
              Investing.com
            </a>
          </small>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CurrencyRates; 