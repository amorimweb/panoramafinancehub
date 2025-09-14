import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, ProgressBar, Tab, Tabs } from 'react-bootstrap';

const Perfil = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Dados aleatórios do usuário
  const userDataTemplate = {
    nome: "Roberto Silva",
    email: "roberto.silva@email.com",
    nivel: "Intermediário",
    experiencia: 18,
    avatar: "👨‍💼",
    corPerfil: "#f97316",
    dataInscricao: "15/03/2023",
    ultimoAcesso: "Hoje, 14:30",
    totalCursos: 6,
    cursosCompletos: 3,
    progressoMedio: 67,
    pontos: 2840,
    ranking: 156,
    totalAlunos: 15970,
    certificados: [
      { nome: "Análise Técnica Básica", data: "15/04/2023", status: "Completo" },
      { nome: "Fundamentos do Mercado", data: "22/05/2023", status: "Completo" },
      { nome: "Gestão de Risco", data: "10/08/2023", status: "Completo" }
    ],
    cursosAtivos: [
      { nome: "Day Trading Profissional", progresso: 45, aulasCompletas: 20, totalAulas: 45 },
      { nome: "Análise Fundamentalista", progresso: 78, aulasCompletas: 22, totalAulas: 28 },
      { nome: "Criptomoedas e DeFi", progresso: 12, aulasCompletas: 3, totalAulas: 26 }
    ],
    estatisticas: {
      tempoEstudo: "127 horas",
      diasSequencia: 23,
      melhorSequencia: 45,
      aulasHoje: 3,
      metaSemanal: 10,
      aulasSemana: 7
    },
    conquistas: [
      { nome: "Primeiro Curso", descricao: "Complete seu primeiro curso", icone: "🎯", status: true },
      { nome: "Estudante Dedicado", descricao: "7 dias seguidos estudando", icone: "📚", status: true },
      { nome: "Analista Técnico", descricao: "Complete análise técnica", icone: "📈", status: true },
      { nome: "Maratonista", descricao: "30 dias seguidos estudando", icone: "🏃‍♂️", status: false },
      { nome: "Expert", descricao: "Complete 5 cursos", icone: "🏆", status: false },
      { nome: "Social", descricao: "Compartilhe 10 conquistas", icone: "📢", status: false }
    ],
    portfolio: [
      { ativo: "AAPL", quantidade: 10, valorAtual: 175.43, variacao: "+2.15", variacaoPercent: "+1.24%" },
      { ativo: "MSFT", quantidade: 5, valorAtual: 378.85, variacao: "+3.45", variacaoPercent: "+0.92%" },
      { ativo: "NVDA", quantidade: 3, valorAtual: 461.30, variacao: "+12.67", variacaoPercent: "+2.83%" },
      { ativo: "BTC", quantidade: 0.5, valorAtual: 43250.00, variacao: "+1250.00", variacaoPercent: "+2.98%" }
    ]
  };

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      setUserData(userDataTemplate);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const getNivelBadge = (nivel) => {
    const cores = {
      'Iniciante': '#22c55e',
      'Intermediário': '#3b82f6',
      'Avançado': '#ef4444'
    };
    return cores[nivel] || '#6b7280';
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (loading) {
    return (
      <Container fluid className="px-0" style={{ position: 'relative', zIndex: 1 }}>
        <div className="p-5 main-container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
          <div className="text-center">
            <div className="spinner-border text-warning mb-3" role="status" style={{width: '3rem', height: '3rem'}}>
              <span className="visually-hidden">Carregando...</span>
            </div>
            <p className="text-muted">Carregando perfil...</p>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="px-0" style={{ position: 'relative', zIndex: 1 }}>
      <div className="p-5 main-container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
        
        {/* Header do Perfil */}
        <Row className="mb-4">
          <Col>
            <Card className="card-dark">
              <Card.Body className="p-4">
                <Row className="align-items-center">
                  <Col md="auto">
                    <div 
                      className="d-flex align-items-center justify-content-center rounded-circle"
                      style={{
                        width: '100px',
                        height: '100px',
                        background: `linear-gradient(135deg, ${userData.corPerfil}, ${userData.corPerfil}CC)`,
                        fontSize: '40px',
                        boxShadow: `0 8px 25px ${userData.corPerfil}40`
                      }}
                    >
                      {userData.avatar}
                    </div>
                  </Col>
                  <Col md>
                    <div className="ms-3">
                      <h2 className="text-white fw-bold mb-1">{userData.nome}</h2>
                      <p className="text-muted mb-2">{userData.email}</p>
                      <div className="d-flex align-items-center gap-3 mb-2">
                        <Badge 
                          style={{
                            background: getNivelBadge(userData.nivel),
                            fontSize: '12px',
                            fontWeight: '600',
                            padding: '6px 12px'
                          }}
                        >
                          {userData.nivel}
                        </Badge>
                        <small className="text-muted">
                          📅 Membro desde {userData.dataInscricao}
                        </small>
                      </div>
                      <small className="text-muted">
                        🕒 Último acesso: {userData.ultimoAcesso}
                      </small>
                    </div>
                  </Col>
                  <Col md="auto">
                    <div className="text-end">
                      <div className="mb-2">
                        <div 
                          className="fw-bold"
                          style={{ 
                            fontSize: '28px',
                            color: '#f97316',
                            textShadow: '0 0 10px rgba(249, 115, 22, 0.3)'
                          }}
                        >
                          {userData.pontos.toLocaleString()}
                        </div>
                        <small className="text-muted">Pontos</small>
                      </div>
                      <div className="text-center">
                        <div 
                          className="fw-bold"
                          style={{ 
                            fontSize: '18px',
                            color: '#22c55e'
                          }}
                        >
                          #{userData.ranking}
                        </div>
                        <small className="text-muted">Ranking</small>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Estatísticas Rápidas */}
        <Row className="mb-4">
          <Col md={3} sm={6}>
            <Card className="card-dark text-center">
              <Card.Body className="py-3">
                <div 
                  className="fw-bold mb-1"
                  style={{ 
                    fontSize: '24px',
                    color: '#3b82f6',
                    textShadow: '0 0 10px rgba(59, 130, 246, 0.3)'
                  }}
                >
                  {userData.estatisticas.tempoEstudo}
                </div>
                <small className="text-muted">Tempo de Estudo</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6}>
            <Card className="card-dark text-center">
              <Card.Body className="py-3">
                <div 
                  className="fw-bold mb-1"
                  style={{ 
                    fontSize: '24px',
                    color: '#22c55e',
                    textShadow: '0 0 10px rgba(34, 197, 94, 0.3)'
                  }}
                >
                  {userData.estatisticas.diasSequencia}
                </div>
                <small className="text-muted">Dias Seguidos</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6}>
            <Card className="card-dark text-center">
              <Card.Body className="py-3">
                <div 
                  className="fw-bold mb-1"
                  style={{ 
                    fontSize: '24px',
                    color: '#f97316',
                    textShadow: '0 0 10px rgba(249, 115, 22, 0.3)'
                  }}
                >
                  {userData.cursosCompletos}/{userData.totalCursos}
                </div>
                <small className="text-muted">Cursos Completos</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6}>
            <Card className="card-dark text-center">
              <Card.Body className="py-3">
                <div 
                  className="fw-bold mb-1"
                  style={{ 
                    fontSize: '24px',
                    color: '#8b5cf6',
                    textShadow: '0 0 10px rgba(139, 92, 246, 0.3)'
                  }}
                >
                  {userData.progressoMedio}%
                </div>
                <small className="text-muted">Progresso Médio</small>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Tabs de Conteúdo */}
        <Card className="card-dark">
          <Card.Body className="p-0">
            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="border-0"
              style={{
                '--bs-nav-tabs-border-color': 'rgba(249, 115, 22, 0.2)',
                '--bs-nav-tabs-link-active-bg': 'rgba(249, 115, 22, 0.1)',
                '--bs-nav-tabs-link-active-color': '#f97316'
              }}
            >
              <Tab eventKey="dashboard" title="📊 Dashboard" className="border-0">
                <div className="p-4">
                  {/* Progresso Semanal */}
                  <Row className="mb-4">
                    <Col>
                      <h5 className="text-white mb-3">📈 Progresso Semanal</h5>
                      <Card className="card-dark">
                        <Card.Body>
                          <div className="d-flex justify-content-between mb-2">
                            <span className="text-white">Meta: {userData.estatisticas.metaSemanal} aulas</span>
                            <span className="text-muted">{userData.estatisticas.aulasSemana}/{userData.estatisticas.metaSemanal}</span>
                          </div>
                          <ProgressBar 
                            now={(userData.estatisticas.aulasSemana / userData.estatisticas.metaSemanal) * 100}
                            style={{
                              height: '10px',
                              backgroundColor: 'rgba(249, 115, 22, 0.2)',
                              borderRadius: '5px'
                            }}
                          />
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>

                  {/* Cursos Ativos */}
                  <Row>
                    <Col>
                      <h5 className="text-white mb-3">📚 Cursos em Andamento</h5>
                      {userData.cursosAtivos.map((curso, index) => (
                        <Card key={index} className="card-dark mb-3">
                          <Card.Body>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <h6 className="text-white mb-0">{curso.nome}</h6>
                              <Badge 
                                style={{
                                  background: 'rgba(34, 197, 94, 0.2)',
                                  color: '#22c55e',
                                  border: '1px solid rgba(34, 197, 94, 0.3)'
                                }}
                              >
                                {curso.progresso}%
                              </Badge>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                              <small className="text-muted">
                                {curso.aulasCompletas}/{curso.totalAulas} aulas
                              </small>
                              <small className="text-muted">
                                {curso.progresso}% completo
                              </small>
                            </div>
                            <ProgressBar 
                              now={curso.progresso}
                              style={{
                                height: '8px',
                                backgroundColor: 'rgba(249, 115, 22, 0.2)',
                                borderRadius: '4px'
                              }}
                            />
                          </Card.Body>
                        </Card>
                      ))}
                    </Col>
                  </Row>
                </div>
              </Tab>

              <Tab eventKey="portfolio" title="💼 Portfolio" className="border-0">
                <div className="p-4">
                  <h5 className="text-white mb-3">📊 Meus Investimentos</h5>
                  <Row>
                    {userData.portfolio.map((ativo, index) => (
                      <Col md={6} lg={3} key={index} className="mb-3">
                        <Card className="card-dark h-100">
                          <Card.Body className="text-center">
                            <div className="mb-2">
                              <div 
                                className="fw-bold"
                                style={{ fontSize: '20px', color: '#f97316' }}
                              >
                                {ativo.ativo}
                              </div>
                              <small className="text-muted">{ativo.quantidade} unidades</small>
                            </div>
                            <div className="mb-2">
                              <div className="text-white fw-bold">
                                {formatCurrency(ativo.valorAtual * ativo.quantidade)}
                              </div>
                              <small className="text-muted">Valor total</small>
                            </div>
                            <div>
                              <span 
                                className="fw-bold"
                                style={{ 
                                  color: ativo.variacao.startsWith('+') ? '#22c55e' : '#ef4444'
                                }}
                              >
                                {ativo.variacao} ({ativo.variacaoPercent})
                              </span>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              </Tab>

              <Tab eventKey="certificados" title="🏆 Certificados" className="border-0">
                <div className="p-4">
                  <h5 className="text-white mb-3">🎓 Meus Certificados</h5>
                  <Row>
                    {userData.certificados.map((cert, index) => (
                      <Col md={4} key={index} className="mb-3">
                        <Card className="card-dark h-100">
                          <Card.Body className="text-center">
                            <div 
                              className="mb-3"
                              style={{ fontSize: '40px' }}
                            >
                              🏅
                            </div>
                            <h6 className="text-white mb-2">{cert.nome}</h6>
                            <small className="text-muted mb-3 d-block">Concluído em {cert.data}</small>
                            <Badge 
                              style={{
                                background: 'rgba(34, 197, 94, 0.2)',
                                color: '#22c55e',
                                border: '1px solid rgba(34, 197, 94, 0.3)'
                              }}
                            >
                              {cert.status}
                            </Badge>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              </Tab>

              <Tab eventKey="conquistas" title="🎯 Conquistas" className="border-0">
                <div className="p-4">
                  <h5 className="text-white mb-3">🏆 Minhas Conquistas</h5>
                  <Row>
                    {userData.conquistas.map((conquista, index) => (
                      <Col md={4} key={index} className="mb-3">
                        <Card 
                          className="card-dark h-100"
                          style={{
                            opacity: conquista.status ? 1 : 0.6,
                            border: conquista.status ? '1px solid rgba(249, 115, 22, 0.3)' : '1px solid rgba(156, 163, 175, 0.2)'
                          }}
                        >
                          <Card.Body className="text-center">
                            <div 
                              className="mb-3"
                              style={{ 
                                fontSize: '40px',
                                filter: conquista.status ? 'none' : 'grayscale(100%)'
                              }}
                            >
                              {conquista.icone}
                            </div>
                            <h6 className="text-white mb-2">{conquista.nome}</h6>
                            <small className="text-muted mb-3 d-block">{conquista.descricao}</small>
                            <Badge 
                              style={{
                                background: conquista.status ? 'rgba(34, 197, 94, 0.2)' : 'rgba(156, 163, 175, 0.2)',
                                color: conquista.status ? '#22c55e' : '#9ca3af',
                                border: conquista.status ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(156, 163, 175, 0.3)'
                              }}
                            >
                              {conquista.status ? 'Desbloqueado' : 'Bloqueado'}
                            </Badge>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default Perfil;