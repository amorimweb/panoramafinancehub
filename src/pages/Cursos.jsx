import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useTheme } from '../contexts/ThemeContext';

const Cursos = () => {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDarkMode, colors } = useTheme();

  // Dados aleatórios de cursos
  const cursosData = [
    {
      id: 1,
      titulo: "Análise Técnica Avançada",
      instrutor: "Dr. Carlos Silva",
      categoria: "Análise",
      nivel: "Avançado",
      duracao: "8 semanas",
      preco: "R$ 497",
      precoOriginal: "R$ 997",
      rating: 4.9,
      alunos: 2847,
      descricao: "Domine as principais ferramentas de análise técnica e identifique oportunidades de trading com precisão.",
      imagem: "▲",
      cor: "#64748b",
      destaque: true,
      aulas: 32,
      certificado: true,
      acessoVitalicio: true
    },
    {
      id: 2,
      titulo: "Fundamentos do Mercado Financeiro",
      instrutor: "Prof. Ana Santos",
      categoria: "Básico",
      nivel: "Iniciante",
      duracao: "6 semanas",
      preco: "R$ 297",
      precoOriginal: "R$ 597",
      rating: 4.8,
      alunos: 4521,
      descricao: "Aprenda os conceitos fundamentais do mercado financeiro e comece sua jornada no trading.",
      imagem: "●",
      cor: "#6b7280",
      destaque: false,
      aulas: 24,
      certificado: true,
      acessoVitalicio: true
    },
    {
      id: 3,
      titulo: "Day Trading Profissional",
      instrutor: "Marco Oliveira",
      categoria: "Trading",
      nivel: "Avançado",
      duracao: "10 semanas",
      preco: "R$ 797",
      precoOriginal: "R$ 1597",
      rating: 4.9,
      alunos: 1923,
      descricao: "Estratégias profissionais para day trading com foco em resultados consistentes e gestão de risco.",
      imagem: "⚡",
      cor: "#71717a",
      destaque: true,
      aulas: 45,
      certificado: true,
      acessoVitalicio: true
    },
    {
      id: 4,
      titulo: "Análise Fundamentalista",
      instrutor: "Dr. Patricia Costa",
      categoria: "Análise",
      nivel: "Intermediário",
      duracao: "7 semanas",
      preco: "R$ 397",
      precoOriginal: "R$ 797",
      rating: 4.7,
      alunos: 3156,
      descricao: "Avalie empresas através de análise fundamentalista e tome decisões de investimento sólidas.",
      imagem: "◢",
      cor: "#71717a",
      destaque: false,
      aulas: 28,
      certificado: true,
      acessoVitalicio: true
    },
    {
      id: 5,
      titulo: "Gestão de Risco e Psicologia",
      instrutor: "Dr. Roberto Lima",
      categoria: "Psicologia",
      nivel: "Intermediário",
      duracao: "5 semanas",
      preco: "R$ 347",
      precoOriginal: "R$ 697",
      rating: 4.8,
      alunos: 2689,
      descricao: "Desenvolva disciplina mental e aprenda a gerenciar riscos como um trader profissional.",
      imagem: "◐",
      cor: "#78716c",
      destaque: false,
      aulas: 20,
      certificado: true,
      acessoVitalicio: true
    },
    {
      id: 6,
      titulo: "Criptomoedas e DeFi",
      instrutor: "Lucas Ferreira",
      categoria: "Crypto",
      nivel: "Intermediário",
      duracao: "6 semanas",
      preco: "R$ 447",
      precoOriginal: "R$ 897",
      rating: 4.9,
      alunos: 1834,
      descricao: "Explore o universo das criptomoedas e finanças descentralizadas com estratégias práticas.",
      imagem: "◈",
      cor: "#6b7280",
      destaque: true,
      aulas: 26,
      certificado: true,
      acessoVitalicio: true
    },
    {
      id: 7,
      titulo: "Opções e Derivativos",
      instrutor: "Prof. Maria Fernandes",
      categoria: "Derivativos",
      nivel: "Avançado",
      duracao: "9 semanas",
      preco: "R$ 697",
      precoOriginal: "R$ 1397",
      rating: 4.8,
      alunos: 1456,
      descricao: "Domine estratégias avançadas com opções e outros derivativos para maximizar seus retornos.",
      imagem: "◇",
      cor: "#64748b",
      destaque: false,
      aulas: 38,
      certificado: true,
      acessoVitalicio: true
    },
    {
      id: 8,
      titulo: "Trading Algorítmico",
      instrutor: "Eng. João Alves",
      categoria: "Algoritmos",
      nivel: "Avançado",
      duracao: "12 semanas",
      preco: "R$ 997",
      precoOriginal: "R$ 1997",
      rating: 4.9,
      alunos: 892,
      descricao: "Desenvolva e implemente estratégias de trading automatizado com Python e machine learning.",
      imagem: "◎",
      cor: "#6b7280",
      destaque: true,
      aulas: 52,
      certificado: true,
      acessoVitalicio: true
    },
    {
      id: 9,
      titulo: "Mercado de Commodities",
      instrutor: "Dr. Paulo Rocha",
      categoria: "Commodities",
      nivel: "Intermediário",
      duracao: "6 semanas",
      preco: "R$ 397",
      precoOriginal: "R$ 797",
      rating: 4.7,
      alunos: 2134,
      descricao: "Aprenda a negociar commodities como ouro, petróleo, soja e outros ativos físicos.",
      imagem: "◆",
      cor: "#78716c",
      destaque: false,
      aulas: 24,
      certificado: true,
      acessoVitalicio: true
    }
  ];

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      setCursos(cursosData);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const getNivelBadge = (nivel) => {
    const cores = {
      'Iniciante': '#64748b',
      'Intermediário': '#6b7280',
      'Avançado': '#71717a'
    };
    return cores[nivel] || '#6b7280';
  };

  const getCategoriaIcon = (categoria) => {
    const icons = {
      'Análise': '',
      'Básico': '',
      'Trading': '',
      'Psicologia': '',
      'Crypto': '',
      'Derivativos': '',
      'Algoritmos': '',
      'Commodities': ''
    };
    return icons[categoria] || '';
  };

  if (loading) {
    return (
      <Container fluid className="px-0" style={{ position: 'relative', zIndex: 1 }}>
        <div className="p-5 main-container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
          {/* Header da seção */}
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 className="fw-bold mb-0 d-flex align-items-center" style={{ color: colors.text }}>
              <span 
                className="me-4 rounded-4 d-flex align-items-center justify-content-center"
                style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.9), rgba(234, 88, 12, 0.8))',
                  boxShadow: isDarkMode 
                    ? '0 8px 25px rgba(249, 115, 22, 0.3), 0 0 20px rgba(249, 115, 22, 0.1)'
                    : '0 4px 15px rgba(249, 115, 22, 0.2)',
                  border: `2px solid ${colors.border}`,
                  fontSize: '20px'
                }}
              >
                ◉
              </span>
              <div>
                <div style={{ fontSize: '1.8rem', letterSpacing: '-0.5px' }}>
                  Cursos Premium
                </div>
                <small 
                  className="fw-medium d-block" 
                  style={{ 
                    fontSize: '12px', 
                    letterSpacing: '1px',
                    marginTop: '2px',
                    color: colors.textMuted
                  }}
                >
                  Desenvolva suas habilidades em trading
                </small>
              </div>
            </h2>
          </div>
          
          <Row className="g-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <Col lg={4} md={6} sm={12} key={i}>
                <Card className="h-100" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.border}` }}>
                  <Card.Body className="d-flex align-items-center justify-content-center" style={{ minHeight: '300px' }}>
                    <div className="text-center">
                      <div className="spinner-border text-warning mb-2" role="status" style={{width: '2rem', height: '2rem'}}>
                        <span className="visualmente-hidden">Carregando...</span>
                      </div>
                      <p className="small" style={{ color: colors.textMuted }}>Carregando cursos...</p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="px-0" style={{ position: 'relative', zIndex: 1 }}>
      <div className="p-5 main-container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
        {/* Header da seção */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h2 className="fw-bold mb-0 d-flex align-items-center" style={{ color: colors.text }}>
            <span 
              className="me-4 rounded-4 d-flex align-items-center justify-content-center"
              style={{
                width: '50px',
                height: '50px',
                background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.9), rgba(234, 88, 12, 0.8))',
                boxShadow: isDarkMode 
                  ? '0 8px 25px rgba(249, 115, 22, 0.3), 0 0 20px rgba(249, 115, 22, 0.1)'
                  : '0 4px 15px rgba(249, 115, 22, 0.2)',
                border: `2px solid ${colors.border}`,
                fontSize: '20px'
              }}
            >
              📚
            </span>
            <div>
              <div style={{ fontSize: '1.8rem', letterSpacing: '-0.5px' }}>
                Cursos Premium
              </div>
              <small 
                className="fw-medium d-block" 
                style={{ 
                  fontSize: '12px', 
                  letterSpacing: '1px',
                  marginTop: '2px',
                  color: colors.textMuted
                }}
              >
                Desenvolva suas habilidades em trading
              </small>
            </div>
          </h2>
          
          <div className="d-none d-md-block">
            <Badge 
              bg="warning" 
              className="px-3 py-2 fw-bold"
              style={{
                fontSize: '12px',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.9), rgba(234, 88, 12, 0.8)) !important',
                border: `1px solid ${colors.border}`,
                boxShadow: isDarkMode ? '0 4px 15px rgba(249, 115, 22, 0.3)' : '0 2px 10px rgba(249, 115, 22, 0.2)'
              }}
            >
              ◉ {cursos.length} CURSOS DISPONÍVEIS
            </Badge>
          </div>
        </div>

        {/* Grid de cursos */}
        <Row className="g-4">
          {cursos.map((curso) => (
            <Col lg={4} md={6} sm={12} key={curso.id}>
              <Card 
                className="h-100 position-relative"
                style={{
                  backgroundColor: colors.cardBg,
                  border: curso.destaque ? `2px solid ${colors.border}` : `1px solid ${colors.border}`,
                  boxShadow: isDarkMode
                    ? (curso.destaque 
                        ? '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(249, 115, 22, 0.2), 0 0 30px rgba(249, 115, 22, 0.15)'
                        : '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(249, 115, 22, 0.1)')
                    : (curso.destaque
                        ? '0 10px 30px -10px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(249, 115, 22, 0.15)'
                        : '0 8px 20px -8px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(249, 115, 22, 0.1)')
                }}
              >
                {/* Badge de destaque */}
                {curso.destaque && (
                  <div 
                    className="position-absolute top-0 end-0 m-3"
                    style={{ zIndex: 10 }}
                  >
                    <Badge 
                      style={{
                        background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.9), rgba(234, 88, 12, 0.8))',
                        border: `1px solid ${colors.border}`,
                        fontSize: '10px',
                        fontWeight: '700',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                        padding: '6px 12px'
                      }}
                    >
                      ◆ DESTAQUE
                    </Badge>
                  </div>
                )}

                {/* Header do card */}
                <Card.Header 
                  className="border-0 px-4 py-3"
                  style={{ 
                    background: `linear-gradient(135deg, ${curso.cor}20, ${curso.cor}10)`,
                    borderBottom: `1px solid ${colors.border}`
                  }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <div 
                        className="me-3 d-flex align-items-center justify-content-center rounded-3"
                        style={{
                          width: '45px',
                          height: '45px',
                          background: `linear-gradient(135deg, ${curso.cor}, ${curso.cor}CC)`,
                          fontSize: '20px',
                          color: 'white',
                          boxShadow: `0 4px 15px ${curso.cor}40`
                        }}
                      >
                        {curso.imagem}
                      </div>
                      <div>
                        <h6 className="mb-0 fw-bold" style={{ fontSize: '14px', color: colors.text }}>
                          {curso.titulo}
                        </h6>
                        <small className="d-block" style={{ fontSize: '11px', color: colors.textMuted }}>
                          por {curso.instrutor}
                        </small>
                      </div>
                    </div>
                    <Badge 
                      style={{
                        background: getNivelBadge(curso.nivel),
                        fontSize: '9px',
                        fontWeight: '600',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                        padding: '4px 8px'
                      }}
                    >
                      {curso.nivel}
                    </Badge>
                  </div>
                </Card.Header>

                <Card.Body className="px-4 py-3">
                  {/* Descrição */}
                  <p 
                    className="mb-3"
                    style={{ 
                      fontSize: '13px', 
                      lineHeight: '1.4',
                      minHeight: '40px',
                      color: colors.textMuted
                    }}
                  >
                    {curso.descricao}
                  </p>

                  {/* Informações do curso */}
                  <div className="mb-3">
                    <Row className="g-2">
                      <Col xs={6}>
                        <div className="d-flex align-items-center">
                          <span className="me-2" style={{ fontSize: '12px' }}>◷</span>
                          <small className="d-block" style={{ fontSize: '11px', color: colors.textMuted }}>
                            {curso.duracao}
                          </small>
                        </div>
                      </Col>
                      <Col xs={6}>
                        <div className="d-flex align-items-center">
                          <span className="me-2" style={{ fontSize: '12px' }}>◉</span>
                          <small className="d-block" style={{ fontSize: '11px', color: colors.textMuted }}>
                            {curso.aulas} aulas
                          </small>
                        </div>
                      </Col>
                      <Col xs={6}>
                        <div className="d-flex align-items-center">
                          <span className="me-2" style={{ fontSize: '12px' }}>◐</span>
                          <small className="d-block" style={{ fontSize: '11px', color: colors.textMuted }}>
                            {curso.rating} ({curso.alunos} alunos)
                          </small>
                        </div>
                      </Col>
                      <Col xs={6}>
                        <div className="d-flex align-items-center">
                          <span className="me-2" style={{ fontSize: '12px' }}>◇</span>
                          <small className="d-block" style={{ fontSize: '11px', color: colors.textMuted }}>
                            {getCategoriaIcon(curso.categoria)} {curso.categoria}
                          </small>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  {/* Benefícios */}
                  <div className="mb-3">
                    <div className="d-flex flex-wrap gap-1">
                      {curso.certificado && (
                        <Badge 
                          bg="success" 
                          style={{ 
                            fontSize: '9px', 
                            padding: '2px 6px',
                            background: isDarkMode ? 'rgba(100, 116, 139, 0.2) !important' : 'rgba(100, 116, 139, 0.12) !important',
                            color: colors.text,
                            border: `1px solid ${colors.border}`
                          }}
                        >
                          ◎ CERTIFICADO
                        </Badge>
                      )}
                      {curso.acessoVitalicio && (
                        <Badge 
                          bg="info" 
                          style={{ 
                            fontSize: '9px', 
                            padding: '2px 6px',
                            background: isDarkMode ? 'rgba(71, 85, 105, 0.2) !important' : 'rgba(71, 85, 105, 0.12) !important',
                            color: colors.text,
                            border: `1px solid ${colors.border}`
                          }}
                        >
                          ◈ VITALÍCIO
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Preço */}
                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <span 
                          className="fw-bold"
                          style={{ 
                            fontSize: '18px',
                            color: colors.text,
                            textShadow: isDarkMode ? '0 0 10px rgba(226, 232, 240, 0.2)' : '0 1px 2px rgba(0, 0, 0, 0.08)'
                          }}
                        >
                          {curso.preco}
                        </span>
                        <span 
                          className="text-decoration-line-through ms-2"
                          style={{ fontSize: '12px', color: colors.textMuted }}
                        >
                          {curso.precoOriginal}
                        </span>
                      </div>
                      <div className="text-end">
                        <small 
                          className="fw-bold"
                          style={{ fontSize: '11px', color: colors.textMuted }}
                        >
                          {Math.round((1 - parseFloat(curso.preco.replace('R$ ', '').replace('.', '')) / parseFloat(curso.precoOriginal.replace('R$ ', '').replace('.', ''))) * 100)}% OFF
                        </small>
                      </div>
                    </div>
                  </div>

                  {/* Botão de ação */}
                  <Button
                    className="w-100 py-2 fw-bold"
                    style={{
                      background: `linear-gradient(135deg, ${curso.cor}, ${curso.cor}CC)`,
                      border: `1px solid ${curso.cor}`,
                      borderRadius: '10px',
                      fontSize: '13px',
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      boxShadow: `0 4px 15px ${curso.cor}40`,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = `0 8px 25px ${curso.cor}60`;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = `0 4px 15px ${curso.cor}40`;
                    }}
                  >
                    ▶ COMEÇAR AGORA
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Seção de estatísticas */}
        <Row className="mt-5">
          <Col>
            <Card className="h-100" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.border}` }}>
              <Card.Body className="text-center py-4">
                <h5 className="mb-3" style={{ color: colors.text }}>◆ TRANSFORME SUA CARREIRA FINANCEIRA</h5>
                <Row className="g-3">
                  <Col md={3} sm={6}>
                    <div className="text-center">
                      <div 
                        className="fw-bold mb-1"
                        style={{ 
                          fontSize: '24px',
                          color: colors.text
                        }}
                      >
                        15.970+
                      </div>
                      <small className="d-block" style={{ color: colors.textMuted }}>Alunos Formados</small>
                    </div>
                  </Col>
                  <Col md={3} sm={6}>
                    <div className="text-center">
                      <div 
                        className="fw-bold mb-1"
                        style={{ 
                          fontSize: '24px',
                          color: colors.text
                        }}
                      >
                        98%
                      </div>
                      <small className="d-block" style={{ color: colors.textMuted }}>Taxa de Satisfação</small>
                    </div>
                  </Col>
                  <Col md={3} sm={6}>
                    <div className="text-center">
                      <div 
                        className="fw-bold mb-1"
                        style={{ 
                          fontSize: '24px',
                          color: colors.text
                        }}
                      >
                        175+
                      </div>
                      <small className="d-block" style={{ color: colors.textMuted }}>Aulas Disponíveis</small>
                    </div>
                  </Col>
                  <Col md={3} sm={6}>
                    <div className="text-center">
                      <div 
                        className="fw-bold mb-1"
                        style={{ 
                          fontSize: '24px',
                          color: colors.text
                        }}
                      >
                        24/7
                      </div>
                      <small className="d-block" style={{ color: colors.textMuted }}>Suporte Online</small>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Cursos;