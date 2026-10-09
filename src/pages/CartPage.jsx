import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { useStore } from '../store/StoreContext';
import { cartTotals, money } from '../utils/appUtils';

export default function CartPage() {
  const { state, dispatch } = useStore();
  const totals = cartTotals(state.cart, state.products);
  return <><PageHero eyebrow="Tu selección" title="Carrito de compra" description="Revisa cantidades y confirma tu selección antes de continuar." />
    <section className="container pb-5"><div className="row g-4"><div className="col-lg-8">
      <div className="surface-card overflow-hidden">{totals.lines.length ? totals.lines.map(({ id, quantity, product }) => <article className="cart-line" key={id}><div className="cart-thumb" style={{ '--cover': product.color }}>{product.codigo}</div><div className="flex-grow-1"><span className="eyebrow">{product.categoria}</span><h2 className="h5 mb-1">{product.nombre}</h2><span className="text-secondary small">{product.plataforma}</span><div className="quantity-control mt-3"><button aria-label="Disminuir cantidad" onClick={() => dispatch({ type: 'SET_CART_QUANTITY', payload: { id, quantity: quantity - 1 } })}>−</button><strong>{quantity}</strong><button aria-label="Aumentar cantidad" disabled={quantity >= product.stock} onClick={() => dispatch({ type: 'SET_CART_QUANTITY', payload: { id, quantity: quantity + 1 } })}>+</button></div></div><div className="text-end"><strong className="price">{money(product.precio * quantity)}</strong><button className="btn btn-link text-danger d-block ms-auto mt-3" onClick={() => dispatch({ type: 'REMOVE_CART', payload: id })}><i className="bi bi-trash" /> Quitar</button></div></article>) : <div className="empty-state"><i className="bi bi-bag" /><h2>Tu carrito está vacío</h2><p>Hay muchas aventuras esperando por ti.</p><Link className="btn btn-primary" to="/catalogo">Explorar catálogo</Link></div>}</div>
    </div><div className="col-lg-4"><aside className="surface-card summary-card"><h2 className="h4">Resumen</h2><div className="summary-row"><span>Productos ({totals.units})</span><span>{money(totals.subtotal)}</span></div><div className="summary-row"><span>Envío</span><span>{totals.shipping ? money(totals.shipping) : 'Gratis'}</span></div><div className="summary-row total"><span>Total</span><strong>{money(totals.total)}</strong></div><Link className={`btn btn-primary btn-lg w-100 ${!totals.lines.length ? 'disabled' : ''}`} to="/checkout">Continuar al checkout</Link><p className="text-secondary small mt-3 mb-0"><i className="bi bi-shield-lock" /> Compra académica segura. No procesa pagos reales.</p></aside></div></div></section>
  </>;
}
