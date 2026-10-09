import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer mt-5">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-5">
            <div className="brand mb-3"><span className="brand-mark"><i className="bi bi-controller" /></span><span>CHECKPOINT <b>GAMES</b></span></div>
            <p className="text-secondary mw-35">Tu siguiente aventura comienza aquí. Videojuegos seleccionados para PC y consolas.</p>
          </div>
          <div className="col-6 col-lg-2"><h2 className="h6">Explorar</h2><Link to="/catalogo">Catálogo</Link><Link to="/categorias">Categorías</Link><Link to="/ofertas">Ofertas</Link></div>
          <div className="col-6 col-lg-2"><h2 className="h6">Ayuda</h2><Link to="/contacto">Contacto</Link><Link to="/nosotros">Nosotros</Link><Link to="/carrito">Carrito</Link></div>
          <div className="col-lg-3"><h2 className="h6">Compra segura</h2><p className="text-secondary small"><i className="bi bi-shield-check text-success me-2" />Demostración académica, sin cobros reales.</p></div>
        </div>
        <hr /><div className="d-flex flex-wrap justify-content-between gap-2 small text-secondary"><span>© 2026 Checkpoint Games</span><span>Proyecto DSY1104 · React + Bootstrap</span></div>
      </div>
    </footer>
  );
}
