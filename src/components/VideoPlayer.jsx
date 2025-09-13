import React, { useState } from 'react';
import { Card, Button, Row, Col, Badge } from 'react-bootstrap';

const VideoPlayer = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const videos = [
    {
      id: 1,
      title: 'Análise Técnica - S&P 500',
      description: 'Análise completa dos principais índices americanos',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      duration: '15:30',
      category: 'Análise Técnica',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 2,
      title: 'Mercado Brasileiro - Perspectivas 2024',
      description: 'Visão geral do mercado de ações brasileiro',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      duration: '12:45',
      category: 'Mercado Nacional',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 3,
      title: 'Criptomoedas - Bitcoin e Ethereum',
      description: 'Análise das principais criptomoedas do mercado',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      duration: '18:20',
      category: 'Criptomoedas',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 4,
      title: 'Forex - Principais Pares de Moedas',
      description: 'Estratégias para o mercado de câmbio',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      duration: '14:15',
      category: 'Forex',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  ];

  const categories = ['Todos', 'Análise Técnica', 'Mercado Nacional', 'Criptomoedas', 'Forex'];
  const [activeCategory, setActiveCategory] = useState('Todos');

  const filteredVideos = activeCategory === 'Todos' 
    ? videos 
    : videos.filter(video => video.category === activeCategory);

  const getCategoryColor = (category) => {
    const colors = {
      'Análise Técnica': 'primary',
      'Mercado Nacional': 'success',
      'Criptomoedas': 'warning',
      'Forex': 'info'
    };
    return colors[category] || 'secondary';
  };

  return (
    <Card className="card-dark h-100">
      <Card.Header className="bg-primary-dark border-0">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="bg-accent-orange rounded d-flex align-items-center justify-content-center me-2" 
                 style={{width: '24px', height: '24px'}}>
              <span className="text-white fw-bold" style={{fontSize: '12px'}}>🎥</span>
            </div>
            <h6 className="text-white mb-0 fw-bold">Vídeos de Análise</h6>
          </div>
          {selectedVideo && (
            <Button 
              variant="outline-light" 
              size="sm"
              onClick={() => setSelectedVideo(null)}
            >
              ← Voltar
            </Button>
          )}
        </div>
      </Card.Header>
      
      <Card.Body className="p-0">
        {selectedVideo ? (
          // Video Player View
          <div>
            <div className="position-relative" style={{ paddingBottom: '56.25%', height: 0 }}>
              <iframe
                src={selectedVideo.url}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%'
                }}
              />
            </div>
            
            <div className="p-3">
              <div className="d-flex align-items-start justify-content-between mb-2">
                <h6 className="text-white mb-1">{selectedVideo.title}</h6>
                <Badge bg={getCategoryColor(selectedVideo.category)}>
                  {selectedVideo.category}
                </Badge>
              </div>
              <p className="text-light-gray small mb-3">{selectedVideo.description}</p>
              
              <div className="d-flex align-items-center text-muted small">
                <span className="me-3">⏱️ {selectedVideo.duration}</span>
                <span>👁️ Visualizações: 1.2k</span>
              </div>
            </div>
          </div>
        ) : (
          // Video List View
          <div>
            {/* Category Filter */}
            <div className="p-3 border-bottom border-secondary">
              <div className="d-flex flex-wrap gap-2">
                {categories.map((category, index) => (
                  <Button
                    key={index}
                    size="sm"
                    variant={activeCategory === category ? 'warning' : 'outline-secondary'}
                    onClick={() => setActiveCategory(category)}
                    className="text-nowrap"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Video Grid */}
            <div className="p-3">
              <Row className="g-3">
                {filteredVideos.map((video) => (
                  <Col xs={12} sm={6} key={video.id}>
                    <div 
                      className="video-item border border-secondary rounded overflow-hidden hover-border-accent-orange"
                      style={{ cursor: 'pointer', transition: 'border-color 0.2s' }}
                      onClick={() => setSelectedVideo(video)}
                    >
                      {/* Thumbnail */}
                      <div className="position-relative">
                        <div 
                          className="video-thumbnail bg-secondary d-flex align-items-center justify-content-center"
                          style={{ height: '120px', backgroundColor: '#2d3748' }}
                        >
                          <div className="text-center">
                            <div className="bg-accent-orange rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2"
                                 style={{ width: '40px', height: '40px' }}>
                              <span className="text-white" style={{ fontSize: '18px' }}>▶️</span>
                            </div>
                            <small className="text-light-gray">Clique para assistir</small>
                          </div>
                        </div>
                        
                        {/* Duration Badge */}
                        <div className="position-absolute bottom-0 end-0 m-2">
                          <Badge bg="dark" className="opacity-75">
                            {video.duration}
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Video Info */}
                      <div className="p-2">
                        <div className="d-flex align-items-start justify-content-between mb-1">
                          <h6 className="text-white small mb-0 flex-grow-1" style={{ fontSize: '13px' }}>
                            {video.title}
                          </h6>
                          <Badge bg={getCategoryColor(video.category)} className="ms-2 small">
                            {video.category}
                          </Badge>
                        </div>
                        <p className="text-muted small mb-0" style={{ fontSize: '11px' }}>
                          {video.description}
                        </p>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
              
              {filteredVideos.length === 0 && (
                <div className="text-center py-4">
                  <div className="text-muted">
                    <span style={{ fontSize: '48px' }}>🎬</span>
                    <p className="mt-2">Nenhum vídeo encontrado para esta categoria</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default VideoPlayer; 