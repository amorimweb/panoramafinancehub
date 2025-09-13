import React, { useState, useEffect, useMemo } from 'react';
import { Card, Spinner, Alert, Badge } from 'react-bootstrap';

const PolygonQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Principais ações para monitorar
  const symbols = useMemo(() => ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA'], []);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { restClient } = await import('@polygon.io/client-js');
        const apiKey = "5uPXNyhYdpJYetJR_uPgjM8mpNbTsAYg";
        const rest = restClient(apiKey, 'https://api.polygon.io');

        const quotesData = [];

        // Buscar dados para cada símbolo
        for (const symbol of symbols) {
          try {
            // Buscar dados de agregados (usar datas que sabemos que funcionam)
            const startDate = '2024-09-09';
            const endDate = '2024-09-11';
            
            console.log(`Buscando cotação para ${symbol} de ${startDate} até ${endDate}`);
            
            const aggregates = await rest.listAggs(symbol, 1, 'day', startDate, endDate);
            
            console.log(`Resultado para ${symbol}:`, aggregates);
            
            if (aggregates && aggregates.results && aggregates.results.length > 0) {
              const latest = aggregates.results[aggregates.results.length - 1];
              const change = latest.c - latest.o; // close - open
              const changePercent = latest.o !== 0 ? ((change / latest.o) * 100) : 0;

              quotesData.push({
                symbol: symbol,
                price: latest.c,
                change: change,
                changePercent: changePercent,
                volume: latest.v,
                high: latest.h,
                low: latest.l,
                open: latest.o
              });
            }
          } catch (symbolError) {
            console.warn(`Erro ao buscar dados para ${symbol}:`, symbolError);
          }
        }

        console.log('Dados das cotações carregados:', quotesData);
        setQuotes(quotesData);
      } catch (err) {
        console.error('Erro ao buscar cotações:', err);
        setError('Erro ao carregar cotações');
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
    
    // Atualizar a cada 30 segundos
    const interval = setInterval(fetchQuotes, 30000);
    
    return () => clearInterval(interval);
  }, [symbols]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatVolume = (volume) => {
    if (volume >= 1000000) {
      return (volume / 1000000).toFixed(1) + 'M';
    } else if (volume >= 1000) {
      return (volume / 1000).toFixed(1) + 'K';
    }
    return volume.toString();
  };

  if (loading) {
    return (
      <Card className="card-dark h-100">
        <Card.Header className="bg-dark-700 border-dark-700">
          <h6 className="text-white mb-0">📈 Cotações em Tempo Real</h6>
        </Card.Header>
        <Card.Body className="d-flex align-items-center justify-content-center">
          <div className="text-center">
            <Spinner animation="border" variant="warning" />
            <p className="text-gray-400 mt-2 mb-0">Carregando cotações...</p>
          </div>
        </Card.Body>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="card-dark h-100">
        <Card.Header className="bg-dark-700 border-dark-700">
          <h6 className="text-white mb-0">📈 Cotações em Tempo Real</h6>
        </Card.Header>
        <Card.Body>
          <Alert variant="danger" className="mb-0">
            {error}
          </Alert>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="card-dark h-100">
      <Card.Header className="bg-dark-700 border-dark-700 d-flex justify-content-between align-items-center">
        <h6 className="text-white mb-0">📈 Cotações (Polygon.io)</h6>
        <Badge bg="success" className="small">
          Tempo Real
        </Badge>
      </Card.Header>
      <Card.Body>
        <div className="d-flex flex-column gap-3" style={{maxHeight: '400px', overflowY: 'auto'}}>
          {quotes.map((quote, index) => (
            <div key={quote.symbol} className="d-flex justify-content-between align-items-center py-2 border-bottom border-dark">
              <div className="d-flex align-items-center">
                <div>
                  <span className="text-white fw-bold">{quote.symbol}</span>
                  <div className="text-muted small">
                    Vol: {formatVolume(quote.volume)}
                  </div>
                </div>
              </div>
              <div className="text-end">
                <div className="text-white fw-bold">
                  {formatPrice(quote.price)}
                </div>
                <div className={`small fw-medium ${
                  quote.change >= 0 ? 'stat-positive' : 'stat-negative'
                }`}>
                  {quote.change >= 0 ? '+' : ''}{formatPrice(quote.change)} 
                  ({quote.changePercent >= 0 ? '+' : ''}{quote.changePercent.toFixed(2)}%)
                </div>
                <div className="text-muted small">
                  H: {formatPrice(quote.high)} L: {formatPrice(quote.low)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-3">
          <small className="text-muted">
            Atualização automática a cada 30s
          </small>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PolygonQuotes; 