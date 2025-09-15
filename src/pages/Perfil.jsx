import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useTheme } from '../contexts/ThemeContext';

const Perfil = () => {
  const { isDarkMode, colors } = useTheme();
  const [loading, setLoading] = useState(true);
  const [perfil, setPerfil] = useState({
    nome: 'Usuário',
    email: 'usuario@email.com',
    telefone: '',
    bio: '',
    avatar: '👤',
  });
  const [edit, setEdit] = useState(perfil);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdit((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setPerfil(edit);
  };

  if (loading) {
    return (
      <Container fluid className="px-0" style={{ position: 'relative', zIndex: 1 }}>
        <div className="p-5 main-container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
          <div className="text-center">
            <div className="spinner-border text-warning mb-3" role="status" style={{width: '3rem', height: '3rem'}}>
              <span className="visually-hidden">Carregando...</span>
            </div>
            <p className="small" style={{ color: colors.textMuted }}>Carregando perfil...</p>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="px-0" style={{ position: 'relative', zIndex: 1 }}>
      <div className="p-5 main-container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
        <Row className="g-4">
          {/* Card de informações básicas */}
          <Col lg={4} md={5} sm={12}>
            <Card className="h-100" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.border}` }}>
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: '72px',
                      height: '72px',
                      background: isDarkMode ? 'rgba(100,116,139,0.2)' : 'rgba(100,116,139,0.12)',
                      fontSize: '32px'
                    }}
                  >
                    {perfil.avatar}
                  </div>
                  <div>
                    <h5 className="mb-1" style={{ color: colors.text }}>{perfil.nome}</h5>
                    <small style={{ color: colors.textMuted }}>{perfil.email}</small>
                  </div>
                </div>
                {perfil.telefone && (
                  <p className="mb-1" style={{ color: colors.text }}>
                    📞 {perfil.telefone}
                  </p>
                )}
                {perfil.bio && (
                  <p className="mb-0" style={{ color: colors.textMuted }}>
                    {perfil.bio}
                  </p>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* Card de edição */}
          <Col lg={8} md={7} sm={12}>
            <Card className="h-100" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.border}` }}>
              <Card.Body className="p-4">
                <h5 className="mb-3" style={{ color: colors.text }}>Editar Perfil</h5>
                <Form onSubmit={handleSave}>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Label style={{ color: colors.textMuted }}>Nome</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="nome" 
                        value={edit.nome} 
                        onChange={handleChange}
                        style={{ backgroundColor: 'transparent', color: colors.text, borderColor: colors.border }}
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Label style={{ color: colors.textMuted }}>Email</Form.Label>
                      <Form.Control 
                        type="email" 
                        name="email" 
                        value={edit.email} 
                        onChange={handleChange}
                        style={{ backgroundColor: 'transparent', color: colors.text, borderColor: colors.border }}
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Label style={{ color: colors.textMuted }}>Telefone</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="telefone" 
                        value={edit.telefone} 
                        onChange={handleChange}
                        placeholder="(00) 00000-0000"
                        style={{ backgroundColor: 'transparent', color: colors.text, borderColor: colors.border }}
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Label style={{ color: colors.textMuted }}>Avatar (emoji)</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="avatar" 
                        value={edit.avatar} 
                        onChange={handleChange}
                        maxLength={2}
                        style={{ backgroundColor: 'transparent', color: colors.text, borderColor: colors.border }}
                      />
                    </Col>
                    <Col md={12}>
                      <Form.Label style={{ color: colors.textMuted }}>Bio</Form.Label>
                      <Form.Control 
                        as="textarea" rows={4}
                        name="bio" 
                        value={edit.bio} 
                        onChange={handleChange}
                        placeholder="Fale um pouco sobre você..."
                        style={{ backgroundColor: 'transparent', color: colors.text, borderColor: colors.border }}
                      />
                    </Col>
                  </Row>
                  <div className="mt-3 d-flex justify-content-end">
                    <Button 
                      type="submit" 
                      className="px-4"
                      style={{
                        background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.9), rgba(234, 88, 12, 0.8))',
                        border: `1px solid ${colors.border}`,
                        borderRadius: '10px',
                        letterSpacing: '0.5px'
                      }}
                    >
                      Salvar
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Perfil;