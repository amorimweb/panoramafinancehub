import React, { useState, useEffect } from 'react';
import { Card, Spinner, Alert } from 'react-bootstrap';

const PolygonNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { restClient } = await import('@polygon.io/client-js');
        const apiKey = "5uPXNyhYdpJYetJR_uPgjM8mpNbTsAYg";
        const rest = restClient(apiKey, 'https://api.polygon.io');

        const response = await rest.listNews({
          order: "desc",
          limit: "5",
          sort: "published_utc"
        });

        if (response && response.results) {
          setNews(response.results);
        }
      } catch (err) {
        console.error('Erro ao buscar notícias:', err);
        setError('Erro ao carregar notícias financeiras');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <Card className="card-dark h-100">
        <Card.Header className="bg-dark-700 border-dark-700">
          <h6 className="text-white mb-0">📰 Notícias Financeiras</h6>
        </Card.Header>
        <Card.Body className="d-flex align-items-center justify-content-center">
          <div className="text-center">
            <Spinner animation="border" variant="warning" />
            <p className="text-gray-400 mt-2 mb-0">Carregando notícias...</p>
          </div>
        </Card.Body>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="card-dark h-100">
        <Card.Header className="bg-dark-700 border-dark-700">
          <h6 className="text-white mb-0">📰 Notícias Financeiras</h6>
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
      <Card.Header className="bg-dark-700 border-dark-700">
        <h6 className="text-white mb-0">📰 Notícias Financeiras (Polygon.io)</h6>
      </Card.Header>
      <Card.Body>
        <div className="d-flex flex-column gap-3" style={{maxHeight: '400px', overflowY: 'auto'}}>
          {news.map((article, index) => (
            <div key={article.id || index} className="border-start border-3 border-warning ps-3 py-2">
              <h6 className="text-white fw-medium small mb-1">
                <a 
                  href={article.article_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white text-decoration-none"
                  style={{fontSize: '0.9rem'}}
                >
                  {truncateText(article.title, 80)}
                </a>
              </h6>
              <p className="text-gray-400 small mb-1">
                {truncateText(article.description, 120)}
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted small">
                  {article.author || article.publisher?.name}
                </span>
                <span className="text-muted small">
                  {formatDate(article.published_utc)}
                </span>
              </div>
              {article.tickers && article.tickers.length > 0 && (
                <div className="mt-1">
                  {article.tickers.slice(0, 3).map((ticker, idx) => (
                    <span 
                      key={idx}
                      className="badge bg-warning text-dark me-1"
                      style={{fontSize: '0.7rem'}}
                    >
                      {ticker}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default PolygonNews; 