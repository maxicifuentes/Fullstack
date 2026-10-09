import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useStore } from '../store/StoreContext';

export default function HomePage() {
  const { state } = useStore();
  return (
    <>
      <section className="hero-section overflow-hidden">
        <div className="container py-5"><div className="row align-items-center g-5 py-lg-5">
          <div className="col-lg-7 py-4">
            <div className="hero-kicker"><span className="live-dot" /> Temporada de descuentos activa</div>
            <h1 className="hero-title mt-3">Tu próxima <span>aventura</span> comienza aquí.</h1>
            <p className="lead text-secondary mw-40 mt-4">Descubre mundos inolvidables, compite sin límites y encuentra tu nuevo juego favorito para PC y consolas.</p>
            <div className="d-flex flex-wrap gap-3 mt-4"><Link className="btn btn-primary btn-lg" to="/catalogo">Explorar catálogo <i className="bi bi-arrow-right" /></Link><Link className="btn btn-outline-light btn-lg" to="/ofertas">Ver ofertas</Link></div>
            <div className="hero-stats mt-5"><div><strong>8+</strong><span>Títulos</span></div><div><strong>7</strong><span>Categorías</span></div><div><strong>24/7</strong><span>Acceso</span></div></div>
          </div>
          <div className="col-lg-5"><div className="hero-console" aria-label="Control de videojuegos estilizado"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><i className="bi bi-controller" /><span>READY<br />PLAYER</span></div></div>
        </div></div>
      </section>
      <section className="container py-5">
        <div className="section-heading"><div><span className="eyebrow">Selección destacada</span><h2>Listos para jugar</h2></div><Link to="/catalogo">Ver catálogo <i className="bi bi-arrow-right" /></Link></div>
        <div className="row g-4">{state.products.slice(0, 4).map((product) => <div className="col-sm-6 col-xl-3" key={product.id}><ProductCard product={product} compact /></div>)}</div>
      </section>
      <section className="container py-5"><div className="feature-strip row g-0">
        {[['lightning-charge','Entrega digital','Acceso inmediato a tus aventuras.'],['shield-check','Compra protegida','Flujo seguro de demostración.'],['headset','Soporte cercano','Te acompañamos en cada nivel.']].map(([icon,title,text])=><div className="col-md-4 feature-item" key={title}><i className={`bi bi-${icon}`} /><div><h3>{title}</h3><p>{text}</p></div></div>)}
      </div></section>
    </>
  );
}
