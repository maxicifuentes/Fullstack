import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/StoreContext';
import { discountPercent, money } from '../utils/appUtils';

export default function ProductCard({ product, compact = false }) {
  const { dispatch } = useStore();
  const discount = discountPercent(product);
  return (
    <article className={`product-card h-100 ${compact ? 'product-card-compact' : ''}`}>
      <Link to={`/producto/${product.id}`} className="product-art" style={{ '--cover': product.color }} aria-label={`Ver ${product.nombre}`}>
        <span className="game-code">{product.codigo}</span>
        <i className="bi bi-controller art-controller" />
        <span className="platform-pill">{product.plataforma}</span>
        {discount > 0 && <span className="discount-pill">-{discount}%</span>}
      </Link>
      <div className="p-3 p-lg-4 d-flex flex-column flex-grow-1">
        <span className="eyebrow mb-2">{product.categoria}</span>
        <h3 className="h5 mb-2">{product.nombre}</h3>
        {!compact && <p className="text-secondary small line-clamp-2">{product.descripcion}</p>}
        <div className="d-flex align-items-end justify-content-between gap-2 mt-auto">
          <div>{product.precioAnterior && <div className="old-price">{money(product.precioAnterior)}</div>}<strong className="price">{money(product.precio)}</strong></div>
          <span className="small text-secondary"><i className="bi bi-star-fill text-warning" /> {product.rating}</span>
        </div>
        <div className="d-grid grid-2 mt-3">
          <Link className="btn btn-outline-light" to={`/producto/${product.id}`}>Ver detalle</Link>
          <button className="btn btn-primary" disabled={!product.stock} onClick={() => dispatch({ type: 'ADD_CART', payload: { id: product.id, quantity: 1 } })}>Añadir</button>
        </div>
      </div>
    </article>
  );
}
