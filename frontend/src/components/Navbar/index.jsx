import React from 'react';

function Navbar() {
  return (
    <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <strong>Mi Proyecto</strong>
        </a>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item">Inicio</a>
          <a className="navbar-item">Acerca de</a>
        </div>
        <div className="navbar-end">
          <a className="navbar-item">Contacto</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;