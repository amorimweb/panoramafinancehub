import React from 'react';
import { Card } from 'react-bootstrap';

const CryptoRates = () => {
  return (
    <Card className="card-dark h-100">
      <Card.Header className="bg-dark-700 border-dark-700">
        <h6 className="text-white mb-0">₿ Criptomoedas</h6>
      </Card.Header>
      <Card.Body className="p-0">
        <div className="position-relative" style={{ minHeight: '300px' }}>
          <iframe 
            src="https://br.widgets.investing.com/crypto-currency-rates?theme=darkTheme&pairs=945629,997650,1001803,1010773,1010776" 
            width="100%" 
            height="300" 
            frameBorder="0" 
            allowTransparency="true" 
            marginWidth="0" 
            marginHeight="0"
            title="Cotações de Criptomoedas"
          />
        </div>
        <div className="p-2 text-center border-top border-dark-700">
          <small className="text-gray-400">
            Desenvolvido por{' '}
            <a 
              href="https://br.investing.com?utm_source=WMT&utm_medium=referral&utm_campaign=CRYPTO_CURRENCY_RATES&utm_content=Footer%20Link" 
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

export default CryptoRates; 