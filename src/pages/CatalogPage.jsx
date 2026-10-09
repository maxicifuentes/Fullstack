import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import ProductCard from '../components/ProductCard';
import { useStore } from '../store/StoreContext';
import { filterProducts } from '../utils/appUtils';

export default function CatalogPage({ offersOnly = false }) {
  const { state } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(searchParams.get('categoria') || '');
  const categories = [...new Set(state.products.map((product) => product.categoria))];
  const filtered = useMemo(() => filterProducts(state.products, search, category, offersOnly), [state.products, search, category, offersOnly]);

  useEffect(() => {
    setCategory(searchParams.get('categoria') || '');
  }, [searchParams]);

  const updateCategory = (value) => {
    setCategory(value);
    setSearchParams(value ? { categoria: value } : {});
  };

  const clearFilters = () => {
    setSearch('');
    updateCategory('');
  };

  return <>
    <PageHero eyebrow={offersOnly ? 'Precios especiales' : 'Catálogo'} title={offersOnly ? 'Ofertas que suben de nivel' : 'Encuentra tu próximo juego'} description={offersOnly ? 'Descuentos por tiempo limitado en aventuras seleccionadas.' : 'Filtra por nombre o categoría y encuentra una experiencia hecha para ti.'} />
    <section className="container pb-5">
      <div className="filter-panel mb-4"><div className="row g-3"><div className="col-lg-8"><label className="form-label" htmlFor="search">Buscar</label><div className="input-icon"><i className="bi bi-search" /><input id="search" className="form-control" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Nombre, código o plataforma..." /></div></div><div className="col-lg-4"><label className="form-label" htmlFor="category">Categoría</label><select id="category" className="form-select" value={category} onChange={(event) => updateCategory(event.target.value)}><option value="">Todas las categorías</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></div></div></div>
      <div className="d-flex justify-content-between align-items-center mb-3"><p className="text-secondary mb-0">{filtered.length} resultados</p>{(search || category) && <button className="btn btn-sm btn-link" onClick={clearFilters}>Limpiar filtros</button>}</div>
      {filtered.length ? <div className="row g-4">{filtered.map((product) => <div className="col-md-6 col-xl-4" key={product.id}><ProductCard product={product} /></div>)}</div> : <div className="empty-state"><i className="bi bi-search" /><h2>No encontramos coincidencias</h2><p>Prueba con otra categoría o término de búsqueda.</p></div>}
    </section>
  </>;
}
