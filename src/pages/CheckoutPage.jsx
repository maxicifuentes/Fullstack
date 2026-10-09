import React, { useMemo, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { REGIONES } from '../data/seed';
import { useStore } from '../store/StoreContext';
import { cartTotals, makeOrder, money, validateCheckout } from '../utils/appUtils';

function Field({ label, name, error, children, ...props }) {
  return <div><label className="form-label" htmlFor={name}>{label}</label>{children || <input className={`form-control ${error ? 'is-invalid' : ''}`} id={name} name={name} {...props} />}{error && <div className="invalid-feedback d-block">{error}</div>}</div>;
}

export default function CheckoutPage() {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const user = state.users.find((item) => item.id === state.session?.id);
  const [form, setForm] = useState({ nombre: user ? `${user.nombre} ${user.apellidos}` : '', correo: user?.correo || '', direccion: user?.direccion || '', region: user?.region || '', comuna: user?.comuna || '', entrega: 'Digital inmediata', ...location.state?.customer, tarjeta: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const totals = cartTotals(state.cart, state.products);
  const communes = useMemo(() => REGIONES.find((item) => item.nombre === form.region)?.comunas || [], [form.region]);
  if (!totals.lines.length && !submitted) return <Navigate to="/carrito" replace />;
  const change = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const submit = (event) => {
    event.preventDefault();
    const nextErrors = validateCheckout(form); setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    const failed = form.tarjeta.replace(/\s/g, '').endsWith('0000');
    if (failed) { const { tarjeta, ...customer } = form; navigate('/pago/error', { state: { customer, totals } }); return; }
    const order = makeOrder({ cart: state.cart, products: state.products, customer: form });
    // Evita que el carrito recién vaciado reemplace la navegación al comprobante.
    setSubmitted(true);
    dispatch({ type: 'ADD_ORDER', payload: order });
    navigate('/pago/exito', { state: { order } });
  };
  return <><PageHero eyebrow="Último paso" title="Checkout" description="Completa la entrega y utiliza una tarjeta de prueba de 16 dígitos. Las terminadas en 0000 simulan un rechazo." />
    <section className="container pb-5"><form onSubmit={submit} noValidate><div className="row g-4"><div className="col-lg-8"><div className="surface-card p-4 p-lg-5"><h2 className="h4 mb-4"><span className="step-number">1</span> Datos de entrega</h2><div className="row g-3"><div className="col-md-6"><Field label="Nombre completo" name="nombre" value={form.nombre} onChange={change} error={errors.nombre} /></div><div className="col-md-6"><Field label="Correo" name="correo" type="email" value={form.correo} onChange={change} error={errors.correo} /></div><div className="col-12"><Field label="Dirección" name="direccion" value={form.direccion} onChange={change} error={errors.direccion} /></div><div className="col-md-6"><Field label="Región" name="region" error={errors.region}><select id="region" name="region" className={`form-select ${errors.region ? 'is-invalid' : ''}`} value={form.region} onChange={(event) => setForm((current) => ({ ...current, region: event.target.value, comuna: '' }))}><option value="">Selecciona</option>{REGIONES.map((item) => <option key={item.nombre}>{item.nombre}</option>)}</select></Field></div><div className="col-md-6"><Field label="Comuna" name="comuna" error={errors.comuna}><select id="comuna" name="comuna" className={`form-select ${errors.comuna ? 'is-invalid' : ''}`} value={form.comuna} onChange={change}><option value="">Selecciona</option>{communes.map((item) => <option key={item}>{item}</option>)}</select></Field></div></div><hr className="my-4" /><h2 className="h4 mb-4"><span className="step-number">2</span> Pago de demostración</h2><Field label="Número de tarjeta" name="tarjeta" inputMode="numeric" maxLength="19" value={form.tarjeta} onChange={change} error={errors.tarjeta} placeholder="4242 4242 4242 4242" /><div className="form-text">No ingreses datos bancarios reales.</div></div></div><div className="col-lg-4"><aside className="surface-card summary-card"><h2 className="h4">Tu pedido</h2>{totals.lines.map((line) => <div className="checkout-line" key={line.id}><span>{line.quantity}× {line.product.nombre}</span><strong>{money(line.quantity * line.product.precio)}</strong></div>)}<div className="summary-row total"><span>Total</span><strong>{money(totals.total)}</strong></div><button className="btn btn-primary btn-lg w-100" type="submit">Confirmar compra</button></aside></div></div></form></section>
  </>;
}
