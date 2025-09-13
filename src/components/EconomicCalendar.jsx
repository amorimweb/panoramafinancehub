import React from 'react';
import { Card } from 'react-bootstrap';

const EconomicCalendar = () => {
  return (
    <Card className="card-dark h-100">
      <Card.Header className="bg-dark-700 border-dark-700">
        <h6 className="text-white mb-0">📅 Calendário Econômico</h6>
      </Card.Header>
      <Card.Body className="p-0">
        <div className="position-relative" style={{ minHeight: '400px' }}>
          <iframe 
            src="https://sslecal2.investing.com?columns=exc_flags,exc_currency,exc_importance,exc_actual,exc_previous&features=datepicker,timezone&countries=110,17,29,25,32,6,37,26,5,22,39,14,48,10,35,7,43,38,4,36,12,72&calType=day&timeZone=12&lang=12" 
            width="100%" 
            height="400" 
            frameBorder="0" 
            allowTransparency="true" 
            marginWidth="0" 
            marginHeight="0"
            title="Calendário Econômico"
          />
        </div>
        <div className="p-2 text-center border-top border-dark-700">
          <small className="text-gray-400">
            Calendário fornecido por{' '}
            <a 
              href="https://br.investing.com/" 
              rel="nofollow noreferrer" 
              target="_blank" 
              className="text-accent-orange text-decoration-none"
            >
              Investing.com Brasil
            </a>
          </small>
        </div>
      </Card.Body>
    </Card>
  );
};

export default EconomicCalendar; 