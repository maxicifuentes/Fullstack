import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { useStore } from '../store/StoreContext';

const icons = { Acción: 'crosshair', Indie: 'gem', Carreras: 'speedometer2', RPG: 'shield-shaded', Aventura: 'compass', Deportes: 'trophy', Terror: 'moon-stars', Estrategia: 'diagram-3' };

export default function CategoriesPage() {
  const { state } = useStore();
  const categories = [...new Set(state.products.map((product) => product.categoria))];
  return <><PageHero eyebrow="Explora a tu manera" title="Categorías" description="Cada partida cuenta una historia distinta. Elige el género que define tu próximo desafío." />
    <section className="container pb-5"><div className="row g-4">{categories.map((category, index) => {
      const count = state.products.filter((product) => product.categoria === category).length;
      return <div className="col-sm-6 col-lg-4" key={category}><Link className="category-card" to={`/catalogo?categoria=${encodeURIComponent(category)}`} style={{ '--category-accent': `hsl(${250 + index * 24} 85% 65%)` }}><i className={`bi bi-${icons[category] || 'controller'}`} /><div><h2>{category}</h2><p>{count} {count === 1 ? 'título disponible' : 'títulos disponibles'}</p></div><i className="bi bi-arrow-up-right" /></Link></div>;
    })}</div></section></>;
}
