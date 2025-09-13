import React, { useState, useEffect } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';

const PolygonTest = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testAPI = async () => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);
      
      console.log('Testando API da Polygon.io...');
      
      const { restClient } = await import('@polygon.io/client-js');
      const apiKey = "5uPXNyhYdpJYetJR_uPgjM8mpNbTsAYg";
      const rest = restClient(apiKey, 'https://api.polygon.io');

      // Teste simples: buscar dados da AAPL
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      const todayStr = today.toISOString().split('T')[0];
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      console.log(`Buscando AAPL de ${yesterdayStr} até ${todayStr}`);
      
      const aggregates = await rest.listAggs('AAPL', 1, 'day', yesterdayStr, todayStr);
      
      console.log('Resultado da API:', aggregates);
      
      setResult(aggregates);
    } catch (err) {
      console.error('Erro no teste da API:', err);
      setError(err.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testAPI();
  }, []);

  return (
    <Card className="card-dark">
      <Card.Header className="bg-dark-700 border-dark-700">
        <h6 className="text-white mb-0">🧪 Teste da API Polygon.io</h6>
      </Card.Header>
      <Card.Body>
        <Button 
          onClick={testAPI} 
          disabled={loading}
          variant="warning"
          className="mb-3"
        >
          {loading ? 'Testando...' : 'Testar API'}
        </Button>
        
        {error && (
          <Alert variant="danger">
            <strong>Erro:</strong> {error}
          </Alert>
        )}
        
        {result && (
          <div>
            <Alert variant="success">
              <strong>API funcionando!</strong>
            </Alert>
            <div className="bg-dark-700 rounded p-3">
              <pre className="text-white small mb-0" style={{fontSize: '0.8rem'}}>
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default PolygonTest; 