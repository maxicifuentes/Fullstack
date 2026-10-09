import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useStore } from '../store/StoreContext';
import { discountPercent, money } from '../utils/appUtils';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { state, dispatch } = useStore();
  const product = state.products.find((item) => item.id === Number(id));
  const [quantity, setQuantity] = useState(1);
  if (!product) return <div className="container py-5 empty-state"><h1>Producto no encontrado</h1><Link to="/catalogo" className="btn btn-primary">Volver al catálogo</Link></div>;
  return <>
    <section className="container py-5"><nav aria-label="migas de pan"><ol className="breadcrumb"><li className="breadcrumb-item"><Link to="/catalogo">Catálogo</Link></li><li className="breadcrumb-item active">{product.nombre}</li></ol></nav>
      <div className="row g-4 g-lg-5 align-items-center"><div className="col-lg-6"><div className="detail-art" style={{ '--cover': product.color }}><span>{product.codigo}</span><i className="bi bi-controller" />{product.precioAnterior && <b>-{discountPercent(product)}%</b>}</div></div>
        <div className="col-lg-6"><span className="eyebrow">{product.categoria} · {product.plataforma}</span><h1 className="display-4 fw-bold mt-2">{product.nombre}</h1><div className="d-flex gap-3 align-items-center my-3"><span><i className="bi bi-star-fill text-warning" /> {product.rating}</span><span className="text-secondary">Código {product.codigo}</span></div><p className="lead text-secondary">{product.descripcion}</p><div className="my-4">{product.precioAnterior && <span className="old-price fs-5 me-3">{money(product.precioAnterior)}</span>}<strong className="display-6 price">{money(product.precio)}</strong></div><p className={product.stock <= product.stockCritico ? 'text-warning' : 'text-success'}><i className="bi bi-box-seam" /> {product.stock} unidades disponibles</p><div className="d-flex flex-wrap gap-3 mt-4"><div className="quantity-control"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Disminuir cantidad">−</button><strong>{quantity}</strong><button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} aria-label="Aumentar cantidad" disabled={quantity >= product.stock}>+</button></div><button className="btn btn-primary btn-lg flex-grow-1" disabled={!product.stock} onClick={() => dispatch({ type: 'ADD_CART', payload: { id: product.id, quantity } })}><i className="bi bi-bag-plus" /> Añadir al carrito</button></div></div>
      </div>
    </section>
    <section className="container py-5"><div className="section-heading"><div><span className="eyebrow">También te puede gustar</span><h2>Más aventuras</h2></div></div><div className="row g-4">{state.products.filter((item) => item.id !== product.id).slice(0, 3).map((item) => <div className="col-md-4" key={item.id}><ProductCard product={item} compact /></div>)}</div></section>
  </>;
}

