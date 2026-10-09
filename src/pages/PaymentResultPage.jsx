import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { money } from '../utils/appUtils';

export default function PaymentResultPage({ success }) {
  const { state } = useLocation();
  const order = state?.order;
  return <section className="container py-5"><div className={`result-card ${success ? 'success' : 'error'}`}><div className="result-icon"><i className={`bi bi-${success ? 'check-lg' : 'x-lg'}`} /></div><span className="eyebrow">{success ? 'Operación completada' : 'Pago rechazado'}</span><h1>{success ? '¡Compra realizada con éxito!' : 'No pudimos procesar el pago'}</h1><p className="text-secondary">{success ? 'Tu pedido fue registrado y ya puedes prepararte para la próxima aventura.' : 'Revisa los datos o intenta con una tarjeta de prueba diferente.'}</p>{success && order && <div className="order-receipt"><div><span>N.º de orden</span><strong>#{order.id}</strong></div><div><span>Fecha</span><strong>{order.fecha}</strong></div><div><span>Total</span><strong>{money(order.total)}</strong></div></div>}<div className="d-flex flex-wrap justify-content-center gap-3"><Link className="btn btn-primary" to={success ? '/catalogo' : '/checkout'} state={success ? undefined : { customer: state?.customer }}>{success ? 'Seguir explorando' : 'Intentar nuevamente'}</Link><Link className="btn btn-outline-light" to="/">Volver al inicio</Link></div></div></section>;
}
