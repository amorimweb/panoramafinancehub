import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spinner } from 'react-bootstrap';

const PolygonMarketIndices = () => {
  const [indices, setIndices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Principais índices e ETFs para monitorar
  const indexSymbols = [
    { symbol: 'SPY', name: 'S&P 500', icon: '📈' },
    { symbol: 'QQQ', name: 'NASDAQ 100', icon: '💻' },
    { symbol: 'DIA', name: 'Dow Jones', icon: '🏭' },
    { symbol: 'IWM', name: 'Russell 2000', icon: '🏪' },
    { symbol: 'VTI', name: 'Total Market', icon: '🌎' },
    { symbol: 'EFA', name: 'Intl Developed', icon: '🌍' }
  ];

  useEffect(() => {
    const fetchIndices = async () => {
      try {
        setLoading(true);
        
        const { restClient } = await import('@polygon.io/client-js');
        const apiKey = "5uPXNyhYdpJYetJR_uPgjM8mpNbTsAYg";
        const rest = restClient(apiKey, 'https://api.polygon.io');

        const indicesData = [];

        for (const index of indexSymbols) {
          try {
            // Buscar dados dos últimos 2 dias para calcular variação
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            
            const todayStr = today.toISOString().split('T')[0];
            const yesterdayStr = yesterday.toISOString().split('T')[0];
            
            console.log(`Buscando dados para ${index.symbol} de ${yesterdayStr} até ${todayStr}`);
            
            const aggregates = await rest.listAggs(index.symbol, 1, 'day', yesterdayStr, todayStr);
            
            console.log(`Resultado para ${index.symbol}:`, aggregates);
            
            if (aggregates && aggregates.results && aggregates.results.length >= 1) {
              const latest = aggregates.results[aggregates.results.length - 1];
              const previous = aggregates.results.length >= 2 ? 
                aggregates.results[aggregates.results.length - 2] : latest;
              
              const change = latest.c - previous.c;
              const changePercent = previous.c !== 0 ? ((change / previous.c) * 100) : 0;

              indicesData.push({
                ...index,
                price: latest.c,
                change: change,
                changePercent: changePercent,
                volume: latest.v
              });
            }
          } catch (symbolError) {
            console.warn(`Erro ao buscar dados para ${index.symbol}:`, symbolError);
          }
        }

        console.log('Dados dos índices carregados:', indicesData);
        setIndices(indicesData);
      } catch (err) {
        console.error('Erro ao buscar índices:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchIndices();
    
    // Atualizar a cada 2 minutos
    const interval = setInterval(fetchIndices, 120000);
    
    return () => clearInterval(interval);
  }, [indexSymbols]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (loading) {
    return (
      <Card className="card-dark">
        <Card.Body className="text-center py-4">
          <Spinner animation="border" variant="warning" />
          <p className="text-gray-400 mt-2 mb-0">Carregando índices...</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="card-dark">
      <Card.Header className="bg-dark-700 border-dark-700">
        <h6 className="text-white mb-0">📊 Índices de Mercado (Polygon.io)</h6>
      </Card.Header>
      <Card.Body>
        <Row className="g-3">
          {indices.map((index, idx) => (
            <Col key={index.symbol} xs={12} sm={6} lg={4}>
              <div className="bg-dark-700 rounded p-3 h-100">
                <div className="d-flex align-items-center mb-2">
                  <span className="me-2" style={{fontSize: '1.2rem'}}>
                    {index.icon}
                  </span>
                  <div>
                    <h6 className="text-white mb-0 small fw-bold">
                      {index.symbol}
                    </h6>
                    <small className="text-muted">
                      {index.name}
                    </small>
                  </div>
                </div>
                
                <div className="text-end">
                  <div className="text-white fw-bold mb-1">
                    {formatPrice(index.price)}
                  </div>
                  <div className={`small fw-medium ${
                    index.change >= 0 ? 'stat-positive' : 'stat-negative'
                  }`}>
                    {index.change >= 0 ? '+' : ''}{formatPrice(index.change)}
                  </div>
                  <div className={`small fw-medium ${
                    index.changePercent >= 0 ? 'stat-positive' : 'stat-negative'
                  }`}>
                    ({index.changePercent >= 0 ? '+' : ''}{index.changePercent.toFixed(2)}%)
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        
        <div className="text-center mt-3">
          <small className="text-muted">
            Dados baseados em ETFs • Atualização a cada 2 min
          </small>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PolygonMarketIndices; 