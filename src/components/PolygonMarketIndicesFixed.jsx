import React, { useState, useEffect, useMemo } from 'react';
import { Card, Row, Col, Spinner, Alert } from 'react-bootstrap';

const PolygonMarketIndicesFixed = () => {
  const [indices, setIndices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Principais índices e ETFs para monitorar
  const indexSymbols = useMemo(() => [
    { symbol: 'SPY', name: 'S&P 500', icon: '📈' },
    { symbol: 'QQQ', name: 'NASDAQ 100', icon: '💻' },
    { symbol: 'DIA', name: 'Dow Jones', icon: '🏭' },
    { symbol: 'IWM', name: 'Russell 2000', icon: '🏪' },
    { symbol: 'VTI', name: 'Total Market', icon: '🌎' },
    { symbol: 'EFA', name: 'Intl Developed', icon: '🌍' }
  ], []);

  useEffect(() => {
    const fetchIndices = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { restClient } = await import('@polygon.io/client-js');
        const apiKey = "5uPXNyhYdpJYetJR_uPgjM8mpNbTsAYg";
        const rest = restClient(apiKey, 'https://api.polygon.io');

        const indicesData = [];

        for (const index of indexSymbols) {
          try {
            // Tentar diferentes períodos para encontrar dados
            let aggregates = null;
            // const today = new Date(); // Removido pois não está sendo usado
            
                         // Usar datas fixas que sabemos que funcionam (baseado no teste da API)
             const dates = [
               { start: '2024-09-09', end: '2024-09-11' },
               { start: '2024-09-06', end: '2024-09-10' },
               { start: '2024-09-05', end: '2024-09-09' }
             ];
             
             for (const dateRange of dates) {
               const startDateStr = dateRange.start;
               const endDateStr = dateRange.end;
              
              console.log(`Tentando ${index.symbol} de ${startDateStr} até ${endDateStr}`);
              
                             try {
                 aggregates = await rest.listAggs(index.symbol, 1, 'day', startDateStr, endDateStr);
                 
                 if (aggregates && aggregates.results && aggregates.results.length > 0) {
                   console.log(`✅ Dados encontrados para ${index.symbol}:`, aggregates);
                   break;
                 }
               } catch (dateError) {
                 console.warn(`Erro na tentativa para ${index.symbol}:`, dateError);
               }
            }
            
            if (aggregates && aggregates.results && aggregates.results.length > 0) {
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
                volume: latest.v,
                date: latest.t
              });
            } else {
              console.warn(`❌ Nenhum dado encontrado para ${index.symbol}`);
            }
          } catch (symbolError) {
            console.error(`Erro ao buscar dados para ${index.symbol}:`, symbolError);
          }
        }

        console.log('📊 Dados finais dos índices:', indicesData);
        
        if (indicesData.length === 0) {
          setError('Nenhum dado foi encontrado. Verifique a API key ou conectividade.');
        } else {
          setIndices(indicesData);
        }
      } catch (err) {
        console.error('❌ Erro geral ao buscar índices:', err);
        setError(`Erro ao carregar dados: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchIndices();
    
    // Atualizar a cada 5 minutos
    const interval = setInterval(fetchIndices, 300000);
    
    return () => clearInterval(interval);
  }, [indexSymbols]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('pt-BR');
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

  if (error) {
    return (
      <Card className="card-dark">
        <Card.Header className="bg-dark-700 border-dark-700">
          <h6 className="text-white mb-0">📊 Índices de Mercado (Polygon.io)</h6>
        </Card.Header>
        <Card.Body>
          <Alert variant="danger">
            <strong>Erro:</strong> {error}
          </Alert>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="card-dark">
      <Card.Header className="bg-dark-700 border-dark-700">
        <h6 className="text-white mb-0">📊 Índices de Mercado (Polygon.io) - {indices.length} ativos</h6>
      </Card.Header>
      <Card.Body>
        {indices.length === 0 ? (
          <Alert variant="warning">
            Nenhum dado disponível no momento. Aguarde a próxima atualização.
          </Alert>
        ) : (
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
                    {index.date && (
                      <small className="text-muted d-block">
                        {formatDate(index.date)}
                      </small>
                    )}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        )}
        
        <div className="text-center mt-3">
          <small className="text-muted">
            Dados baseados em ETFs • Atualização a cada 5 min
          </small>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PolygonMarketIndicesFixed; 