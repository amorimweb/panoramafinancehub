import React from 'react';
import { Nav, Form, InputGroup } from 'react-bootstrap';

const Sidebar = () => {
  const menuItems = [
    { name: 'Home', active: false },
    { name: 'Favoritos', active: false },
    { name: 'Carteira', active: false },
    { name: 'Ações Nacionais', active: true },
    { name: 'Ações Internacionais', active: false },
    { name: 'FIIs', active: false },
    { name: 'Fundos', active: false },
    { name: 'BDRs', active: false },
    { name: 'ETFs', active: false },
    { name: 'Cripto', active: false },
    { name: 'Renda Fixa', active: false },
    { name: 'Opções', active: false },
    { name: 'Futuros', active: false },
    { name: 'Forex', active: false },
  ];

  return (
    <aside className="sidebar p-4">
      {/* Search Bar */}
      <div className="mb-4">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Buscar ativo..."
            className="form-control-dark"
          />
          <InputGroup.Text className="bg-dark-700 border-dark-600">
            <svg width="16" height="16" fill="currentColor" className="text-gray-400" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </InputGroup.Text>
        </InputGroup>
      </div>

      {/* Menu Items */}
      <Nav className="flex-column">
        {menuItems.map((item, index) => (
          <Nav.Link
            key={index}
            href="#"
            className={`d-flex align-items-center px-3 py-2 rounded mb-1 text-decoration-none ${
              item.active
                ? 'menu-item-active'
                : 'text-light-gray hover-bg-dark-700 hover-text-accent-orange'
            }`}
          >
            <span className="rounded-circle me-3" 
                  style={{
                    width: '8px', 
                    height: '8px', 
                    backgroundColor: 'currentColor', 
                    opacity: '0.6'
                  }}>
            </span>
            <small>{item.name}</small>
          </Nav.Link>
        ))}
      </Nav>

      {/* Additional Actions */}
      <div className="mt-4 pt-4 border-top border-dark-700">
        <Nav className="flex-column">
          <Nav.Link
            href="#"
            className="d-flex align-items-center px-3 py-2 text-light-gray hover-text-accent-orange text-decoration-none"
          >
            <svg width="16" height="16" fill="currentColor" className="me-3" viewBox="0 0 16 16">
              <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
              <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319z"/>
            </svg>
            <small>Configurações</small>
          </Nav.Link>
          <Nav.Link
            href="#"
            className="d-flex align-items-center px-3 py-2 text-light-gray hover-text-accent-orange text-decoration-none"
          >
            <svg width="16" height="16" fill="currentColor" className="me-3" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
            </svg>
            <small>Ajuda</small>
          </Nav.Link>
        </Nav>
      </div>
    </aside>
  );
};

export default Sidebar; 